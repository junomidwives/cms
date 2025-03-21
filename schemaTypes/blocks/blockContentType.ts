import {defineField, defineType} from 'sanity'

export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Free Content',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
  ],
})
