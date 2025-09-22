import {Grid2X2} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const logoGroupType = defineType({
  name: 'logoGroup',
  title: 'Logo Group',
  type: 'object',
  icon: Grid2X2,
  fields: [
    defineField({
      name: 'title',
      description: '(optional)',
      type: 'string',
    }),
    defineField({
      name: 'logos',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        defineField({
          name: 'logo',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
            }),
            defineField({
              name: 'alt',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title ? title : 'Logo Group',
        media: Grid2X2,
      }
    },
  },
})
