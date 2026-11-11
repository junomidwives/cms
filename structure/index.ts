import type {StructureResolver} from 'sanity/structure'
import {CircleHelp} from 'lucide-react'
import {HelpGuide} from '../components/HelpGuide'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('pdfPage').title('PDF Pages'),
      S.documentTypeListItem('birthStory').title('Birth Stories'),
      S.documentTypeListItem('blog').title('Blog'),
      S.documentTypeListItem('redirect').title('Redirects'),
      S.divider(),
      S.listItem()
        .id('siteSettings')
        .schemaType('siteSettings')
        .title('Site Settings')
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .id('bioLinks')
        .schemaType('bioLinks')
        .title('Bio Links')
        .child(
          S.editor()
            .id('bioLinks')
            .schemaType('bioLinks')
            .documentId('bioLinks'),
        ),
      S.listItem()
        .id('staticPageSeo')
        .schemaType('staticPageSeo')
        .title('Static Page SEO')
        .child(
          S.editor()
            .id('staticPageSeo')
            .schemaType('staticPageSeo')
            .documentId('staticPageSeo'),
        ),
      S.divider(),
      S.listItem()
        .id('help')
        .title('Help: Undoing changes')
        .icon(CircleHelp)
        .child(S.component(HelpGuide).id('help').title('Help: Undoing changes')),
    ])
