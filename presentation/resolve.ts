import {map} from 'rxjs'
import {defineDocuments, type DocumentLocationResolver} from 'sanity/presentation'

// Which document to open in the editor pane when the preview shows a URL.
export const mainDocuments = defineDocuments([
  {route: '/', filter: `_id == *[_id == "siteSettings"][0].homePage._ref`},
  {route: '/blog/:slug', filter: `_type == "blog" && slug.current == $slug`},
  {route: '/birth-stories/:slug', filter: `_type == "birthStory" && slug.current == $slug`},
  {route: '/:slug', filter: `_type in ["page", "pdfPage"] && slug.current == $slug`},
])

const PREFIX: Record<string, string> = {
  page: '/',
  pdfPage: '/',
  blog: '/blog/',
  birthStory: '/birth-stories/',
}

// Where a document appears on the site, shown as "Used on N pages" in the editor.
// The page picked as the homepage in Site Settings is served at "/".
export const locations: DocumentLocationResolver = (params, {documentStore}) => {
  if (params.type === 'siteSettings') {
    return {locations: [{title: 'Home', href: '/'}]}
  }

  const prefix = PREFIX[params.type]
  if (!prefix) return null

  return documentStore
    .listenQuery(
      `{
        "doc": *[_id == $id][0]{title, "slug": slug.current},
        "homeId": *[_id == "siteSettings"][0].homePage._ref
      }`,
      {id: params.id},
      {perspective: 'drafts'},
    )
    .pipe(
      map((result: {doc?: {title?: string; slug?: string}; homeId?: string} | null) => {
        const doc = result?.doc
        if (!doc?.slug) return null

        const isHome = result?.homeId === params.id.replace(/^drafts\./, '')
        return {
          locations: [
            {title: doc.title || 'Untitled', href: isHome ? '/' : `${prefix}${doc.slug}`},
          ],
        }
      }),
    )
}
