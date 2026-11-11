import type {ReactNode} from 'react'

// Studio editor previews for the "Large text" block styles. On the website
// they're paragraphs styled like a Heading 1, but not headings (one H1 per page).

export const LargeText = (props: {children?: ReactNode}) => (
  <div style={{fontSize: '1.75em', fontWeight: 700, lineHeight: 1.25}}>{props.children}</div>
)

export const LargeTextDivider = (props: {children?: ReactNode}) => (
  <div style={{fontSize: '1.75em', fontWeight: 700, lineHeight: 1.25}}>
    {props.children}
    <div
      style={{
        width: '4rem',
        height: 4,
        borderRadius: 2,
        marginTop: '0.5rem',
        background: 'var(--card-focus-ring-color, #48a9a6)',
      }}
    />
  </div>
)

export const largeTextStyles = [
  {title: 'Large text (not a heading)', value: 'large', component: LargeText},
  {title: 'Large text with divider', value: 'largeDivider', component: LargeTextDivider},
]
