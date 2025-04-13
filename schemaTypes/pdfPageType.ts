import {PanelsTopLeft} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const pdfPageType = defineType({
  name: 'pdfPage',
  title: 'PDF Page',
  type: 'document',
  icon: PanelsTopLeft,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'pdf',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
})
