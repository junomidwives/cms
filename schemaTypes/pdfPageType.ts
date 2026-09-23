import {PanelsTopLeft} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {slugify, slugValidation} from './slug'

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
        slugify,
      },
      validation: slugValidation,
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
