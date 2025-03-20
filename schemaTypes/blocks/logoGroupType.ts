import {defineField, defineType} from 'sanity'

export const logoGroupType = defineType({
  name: 'features',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'logos',
      type: 'array',
      of: [
        defineField({
          name: 'logo',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'media',
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
})
