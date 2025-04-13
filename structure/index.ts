import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('pdfPage').title('PDF Pages'),
      S.documentTypeListItem('birthStory').title('Birth Stories'),
      S.documentTypeListItem('blog').title('Blog'),
      S.divider(),
      S.listItem()
        .id('siteSettings')
        .schemaType('siteSettings')
        .title('Site Settings')
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
    ])
