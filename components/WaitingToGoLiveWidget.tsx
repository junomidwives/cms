import {useCallback, useEffect, useMemo, useState} from 'react'
import {DashboardWidgetContainer} from '@sanity/dashboard'
import {Box, Button, Card, Flex, Spinner, Stack, Text, useToast} from '@sanity/ui'
import {useClient, useSchema, type SanityDocument} from 'sanity'
import {IntentLink} from 'sanity/router'

// Lists documents published since the live site was last deployed: what will
// go live on the next deploy. The live site publishes its build start time at
// /build-info.json (see the frontend's server/routes/build-info.json.ts).
//
// Each row can be "moved back to draft". The published document is put back
// to how it was at the last deploy (from document history), and the newer
// content is kept as a draft so nothing is lost.

const SITE_URL = process.env.SANITY_STUDIO_SITE_URL || 'https://junomidwives.co.uk'
const DOCUMENT_TYPES = [
  'page',
  'pdfPage',
  'blog',
  'birthStory',
  'redirect',
  'siteSettings',
  'bioLinks',
  'staticPageSeo',
]
const REFRESH_MS = 60_000
// Give up on slow requests so the panel shows an error instead of spinning forever.
const TIMEOUT_MS = 10_000
const API_VERSION = '2025-02-19'

const QUERY = `*[_type in $types && _updatedAt > $since] | order(_updatedAt desc)`

const SINGLETON_TITLES: Record<string, string> = {
  siteSettings: 'Site Settings',
  bioLinks: 'Bio Links',
  staticPageSeo: 'Static Page SEO',
}

type Item = {
  doc: SanityDocument
  // The document as it was at the last deploy. null = it didn't exist then.
  // undefined = unknown (older than the plan's history retention).
  live: SanityDocument | null | undefined
}
type State =
  | {status: 'loading'}
  | {status: 'error'}
  | {status: 'ready'; builtAt: string; items: Item[]}

const META_FIELDS = new Set(['_rev', '_updatedAt', '_createdAt', '_system'])

function stripMeta(doc: SanityDocument): Record<string, unknown> {
  return Object.fromEntries(Object.entries(doc).filter(([key]) => !META_FIELDS.has(key)))
}

// JSON with sorted object keys, so two documents with the same content compare equal.
function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify((value as any)[key])}`)
      .join(',')}}`
  }
  return JSON.stringify(value)
}

const sameContent = (a: SanityDocument, b: SanityDocument) =>
  stableStringify(stripMeta(a)) === stableStringify(stripMeta(b))

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

const titleOf = (doc: SanityDocument) =>
  (doc.title as string) || (doc.source as string) || SINGLETON_TITLES[doc._id] || 'Untitled'

export function WaitingToGoLiveWidget() {
  const baseClient = useClient({apiVersion: API_VERSION})
  const published = useMemo(() => baseClient.withConfig({perspective: 'published'}), [baseClient])
  const raw = useMemo(() => baseClient.withConfig({perspective: 'raw'}), [baseClient])
  const schema = useSchema()
  const toast = useToast()
  const [state, setState] = useState<State>({status: 'loading'})
  const [busyId, setBusyId] = useState<string | null>(null)

  const versionAt = useCallback(
    async (id: string, time: string) => {
      const {dataset} = raw.config()
      const res = await raw.request<{documents: SanityDocument[]}>({
        uri: `/data/history/${dataset}/documents/${id}`,
        query: {time},
        timeout: TIMEOUT_MS,
      })
      return res.documents[0]
    },
    [raw],
  )

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${SITE_URL}/build-info.json`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(TIMEOUT_MS),
      })
      if (!res.ok) throw new Error(`build-info responded ${res.status}`)
      const {builtAt} = (await res.json()) as {builtAt?: string}
      if (!builtAt) throw new Error('build-info has no builtAt')

      const docs = await published.fetch<SanityDocument[]>(QUERY, {
        types: DOCUMENT_TYPES,
        since: builtAt,
      })

      const items = await Promise.all(
        docs.map(async (doc): Promise<Item> => {
          if (doc._createdAt > builtAt) return {doc, live: null}
          const live = await versionAt(doc._id, builtAt).catch(() => undefined)
          return {doc, live}
        }),
      )

      // Hide documents that were published again without changes, or changed back.
      const changed = items.filter(({doc, live}) => !live || !sameContent(doc, live))
      setState({status: 'ready', builtAt, items: changed})
    } catch (error) {
      console.warn('[Waiting to go live]', error)
      setState({status: 'error'})
    }
  }, [published, versionAt])

  const moveBackToDraft = useCallback(
    async ({doc, live}: Item) => {
      const title = titleOf(doc)
      const message =
        live === null
          ? `"${title}" isn't on the website yet.\n\nIt will be unpublished and kept as a draft, so it won't go live on the next deploy.`
          : `"${title}" will go back to how it is on the website now.\n\nThe newer changes are kept as a draft, so you can carry on with them and publish when ready.`
      if (!window.confirm(message)) return

      setBusyId(doc._id)
      try {
        const draftId = `drafts.${doc._id}`
        const existingDraft = await raw.getDocument(draftId)
        const tx = raw.transaction()

        // Keep the newer content as a draft. An existing draft is newer still, so leave it.
        if (!existingDraft) {
          tx.create({...stripMeta(doc), _id: draftId, _type: doc._type})
        }
        if (live) {
          tx.createOrReplace({...stripMeta(live), _id: doc._id, _type: live._type})
        } else {
          tx.delete(doc._id)
        }
        await tx.commit({autoGenerateArrayKeys: false})

        toast.push({
          status: 'success',
          title: `"${title}" moved back to draft`,
          description: existingDraft
            ? 'Your existing draft was kept as it was.'
            : 'The newer changes are saved as a draft.',
        })
        await load()
      } catch (error) {
        console.error('[Waiting to go live] move back to draft failed', error)
        toast.push({
          status: 'error',
          title: `Couldn't move "${title}" back to draft`,
          description: 'Nothing was changed. Try again, or use History on the document.',
        })
      } finally {
        setBusyId(null)
      }
    },
    [raw, toast, load],
  )

  useEffect(() => {
    load()
    const timer = setInterval(load, REFRESH_MS)
    window.addEventListener('focus', load)
    return () => {
      clearInterval(timer)
      window.removeEventListener('focus', load)
    }
  }, [load])

  const count = state.status === 'ready' ? ` (${state.items.length})` : ''

  return (
    <DashboardWidgetContainer
      header={`Waiting to go live${count}`}
      footer={
        state.status === 'ready' && (
          <Box padding={3}>
            <Text size={1} muted>
              Last deploy: {formatDate(state.builtAt)}
            </Text>
          </Box>
        )
      }
    >
      {state.status === 'loading' && (
        <Flex padding={4} justify="center">
          <Spinner muted />
        </Flex>
      )}

      {state.status === 'error' && (
        <Card padding={4} tone="caution">
          <Text size={1}>Couldn't check the live website. Try refreshing in a minute.</Text>
        </Card>
      )}

      {state.status === 'ready' && state.items.length === 0 && (
        <Card padding={4} tone="positive">
          <Text size={1}>Everything published is live on the website.</Text>
        </Card>
      )}

      {state.status === 'ready' && state.items.length > 0 && (
        <Stack>
          <Card padding={4} paddingBottom={2}>
            <Text size={1} muted>
              Published since the last deploy. All of these will go live on the next deploy. If
              something isn't ready, move it back to draft.
            </Text>
          </Card>
          {state.items.map((item) => (
            <Flex key={item.doc._id} align="center" gap={2} paddingRight={3}>
              <Card
                as={IntentLink}
                intent="edit"
                params={{id: item.doc._id, type: item.doc._type}}
                flex={1}
                padding={4}
                paddingY={3}
                radius={2}
                style={{textDecoration: 'none', minWidth: 0}}
              >
                <Stack space={2}>
                  <Text size={1} weight="medium" textOverflow="ellipsis">
                    {titleOf(item.doc)}
                    {item.live === null && ' (new)'}
                  </Text>
                  <Text size={1} muted>
                    {schema.get(item.doc._type)?.title ?? item.doc._type} ·{' '}
                    {formatDate(item.doc._updatedAt)}
                  </Text>
                </Stack>
              </Card>
              {item.live === undefined ? (
                <Text size={0} muted>
                  Use History to undo
                </Text>
              ) : (
                <Button
                  text="Move back to draft"
                  mode="ghost"
                  fontSize={1}
                  padding={2}
                  loading={busyId === item.doc._id}
                  disabled={busyId !== null}
                  onClick={() => moveBackToDraft(item)}
                />
              )}
            </Flex>
          ))}
        </Stack>
      )}
    </DashboardWidgetContainer>
  )
}
