import type {ReactNode} from 'react'
import {Box, Card, Heading, Stack, Text} from '@sanity/ui'

function Section({title, children}: {title: string; children: ReactNode}) {
  return (
    <Stack space={4}>
      <Heading as="h2" size={2}>
        {title}
      </Heading>
      {children}
    </Stack>
  )
}

function P({children}: {children: ReactNode}) {
  return (
    <Text size={2} as="p">
      {children}
    </Text>
  )
}

function Steps({items}: {items: ReactNode[]}) {
  return (
    <Box as="ol" paddingLeft={4} style={{margin: 0}}>
      <Stack space={3}>
        {items.map((item, i) => (
          <Text key={i} size={2} as="li">
            {item}
          </Text>
        ))}
      </Stack>
    </Box>
  )
}

function Note({tone = 'caution', children}: {tone?: 'caution' | 'primary'; children: ReactNode}) {
  return (
    <Card padding={4} radius={2} tone={tone} border>
      <Text size={2}>{children}</Text>
    </Card>
  )
}

export function HelpGuide() {
  return (
    <Box padding={5} style={{maxWidth: 720}}>
      <Stack space={6}>
        <Stack space={4}>
          <Heading as="h1" size={3}>
            Undoing changes
          </Heading>
          <P>
            How to put things back if something has been published by mistake, or a page doesn't
            look right on the website.
          </P>
        </Stack>

        <Section title="First: how changes reach the website">
          <P>
            Editing a document saves a <strong>draft</strong>. Nobody else can see a draft.
          </P>
          <P>
            Clicking <strong>Publish</strong> marks the document as ready. But the website doesn't
            change straight away. It only updates when it is rebuilt (a <strong>deploy</strong>).
          </P>
          <Note>
            A deploy sends <strong>everything</strong> that has been published since the last one to
            the website, not just the thing you were working on. If you published unfinished changes
            weeks ago, they will go live the next time anything is deployed.
          </Note>
          <P>
            So: only click Publish when a change is ready to go live. If you're still working on
            something, just leave it as a draft. Drafts are saved automatically.
          </P>
        </Section>

        <Section title="See your draft before publishing">
          <Steps
            items={[
              <>
                Click <strong>Preview</strong> in the top bar.
              </>,
              'The website appears on the right, showing your drafts exactly as they will look once published. Click around the site, or pick a page from the address bar at the top.',
              'Edit the document on the left. The preview updates as you type.',
              <>
                When you're happy, click <strong>Publish</strong>, then deploy the website.
              </>,
            ]}
          />
          <Note tone="primary">
            The preview is only visible to people logged in to this Studio. Visitors to the real
            website don't see drafts.
          </Note>
        </Section>

        <Section title="Undo a change you haven't published yet">
          <Steps
            items={[
              'Open the document.',
              <>
                Click the <strong>⋯</strong> menu next to the Publish button.
              </>,
              <>
                Choose <strong>Discard changes</strong>. The document goes back to the last
                published version.
              </>,
            ]}
          />
        </Section>

        <Section title="Undo a change that has already been published">
          <P>Every document keeps a history of its versions, so you can go back to an older one.</P>
          <Steps
            items={[
              'Open the document, for example the Home page under Pages.',
              <>
                At the top of the document, click the <strong>Published</strong> tab (next to{' '}
                <strong>Drafts</strong>). If you skip this, Sanity may say it &ldquo;couldn't find
                the document revision&rdquo;.
              </>,
              <>
                Open its <strong>History</strong>: click the clock icon in the top-right of the
                document, or the &ldquo;Published …&rdquo; time at the bottom.
              </>,
              'A list of versions appears, newest first, with dates. Click a version from before the unwanted changes. The document shows exactly how it looked at that point.',
              <>
                When you've found the right one, click <strong>Restore</strong>.
              </>,
              <>
                Click <strong>Publish</strong>.
              </>,
              <>
                Deploy the website (see <em>Updating the website</em> below) so the restored version
                goes live.
              </>,
            ]}
          />
          <Note tone="primary">
            Restoring doesn't delete anything. The newer versions stay in History, so you can go
            back to them later and carry on where you left off.
          </Note>
        </Section>

        <Section title="Take a blog post or page off the website">
          <Steps
            items={[
              'Open the document.',
              <>
                Click the <strong>⋯</strong> menu next to the Publish button and choose{' '}
                <strong>Unpublish</strong>. Your content is kept as a draft.
              </>,
              'Deploy the website.',
            ]}
          />
        </Section>

        <Section title="Updating the website">
          <Steps
            items={[
              <>
                Click <strong>Dashboard</strong> in the top bar.
              </>,
              <>
                In the <strong>Netlify Deploy</strong> panel, click <strong>Deploy</strong>.
              </>,
              'Wait a few minutes, then refresh the website to check. The panel shows when the deploy has finished.',
            ]}
          />
          <P>
            Before deploying, check the <strong>Waiting to go live</strong> panel on the Dashboard.
            It lists everything published since the last deploy, and all of it will go live
            together. If something there isn't ready, click <strong>Move back to draft</strong> next
            to it. The website version stays as it is, and your changes are kept as a draft to
            finish later.
          </P>
        </Section>

        <Section title="Emergency: put the whole website back right now">
          <P>
            If the website looks wrong and you need it fixed immediately, the site can be rolled
            back to an earlier deploy in Netlify. This takes seconds. You need a Netlify login for
            this, so get in touch with your developer if you don't have one.
          </P>
          <Steps
            items={[
              <>
                In Netlify, open the Juno Midwives site and go to <strong>Deploys</strong>.
              </>,
              'Click a deploy from before things went wrong.',
              <>
                Click <strong>Publish deploy</strong>.
              </>,
            ]}
          />
          <Note>
            This is only a quick fix. The next deploy will bring the unwanted changes back unless
            you also undo them here in the Studio, using the steps above.
          </Note>
        </Section>

        <Section title="Still stuck?">
          <P>
            Get in touch with your developer and tell them which page and roughly when the change
            was made. Nothing is lost, as every version is kept in History.
          </P>
        </Section>
      </Stack>
    </Box>
  )
}
