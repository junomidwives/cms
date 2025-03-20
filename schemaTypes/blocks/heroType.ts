import {defineField, defineType} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})
