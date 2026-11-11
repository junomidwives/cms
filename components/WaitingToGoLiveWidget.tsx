import {useCallback, useEffect, useState} from 'react'
import {DashboardWidgetContainer} from '@sanity/dashboard'
import {Box, Card, Flex, Spinner, Stack, Text} from '@sanity/ui'
import {useClient, useSchema} from 'sanity'
import {IntentLink} from 'sanity/router'

// Lists documents published since the live site was last deployed: what will
// go live on the next deploy. The live site publishes its build start time at
// /build-info.json (see the frontend's server/routes/build-info.json.ts).

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

const QUERY = `*[_type in $types && _updatedAt > $since] | order(_updatedAt desc) {
  _id, _type, _updatedAt,
  "title": coalesce(title, source, select(_id == "siteSettings" => "Site Settings", _id == "bioLinks" => "Bio Links", _id == "staticPageSeo" => "Static Page SEO"))
}`

type Item = {_id: string; _type: string; _updatedAt: string; title?: string}
type State =
  | {status: 'loading'}
  | {status: 'error'}
  | {status: 'ready'; builtAt: string; items: Item[]}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

export function WaitingToGoLiveWidget() {
  const client = useClient({apiVersion: '2025-02-19'}).withConfig({perspective: 'published'})
  const schema = useSchema()
  const [state, setState] = useState<State>({status: 'loading'})

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${SITE_URL}/build-info.json`, {cache: 'no-store'})
      if (!res.ok) throw new Error(`build-info responded ${res.status}`)
      const {builtAt} = (await res.json()) as {builtAt?: string}
      if (!builtAt) throw new Error('build-info has no builtAt')

      const items = await client.fetch<Item[]>(QUERY, {types: DOCUMENT_TYPES, since: builtAt})
      setState({status: 'ready', builtAt, items})
    } catch (error) {
      console.warn('[Waiting to go live]', error)
      setState({status: 'error'})
    }
  }, [client])

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
              Published since the last deploy. All of these will go live on the next deploy.
            </Text>
          </Card>
          {state.items.map((item) => (
            <Card
              key={item._id}
              as={IntentLink}
              intent="edit"
              params={{id: item._id, type: item._type}}
              padding={4}
              paddingY={3}
              radius={2}
              style={{textDecoration: 'none'}}
            >
              <Flex align="center" gap={3}>
                <Stack space={2} flex={1}>
                  <Text size={1} weight="medium" textOverflow="ellipsis">
                    {item.title || 'Untitled'}
                  </Text>
                  <Text size={1} muted>
                    {schema.get(item._type)?.title ?? item._type}
                  </Text>
                </Stack>
                <Text size={1} muted>
                  {formatDate(item._updatedAt)}
                </Text>
              </Flex>
            </Card>
          ))}
        </Stack>
      )}
    </DashboardWidgetContainer>
  )
}
