import {defineField, defineType} from 'sanity'

export const recommendationType = defineType({
  name: 'recommendation',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'service',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'url',
      type: 'url',
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'contact',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'socials',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          type: 'url',
        }),
      ],
    }),
  ],
})
