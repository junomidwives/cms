import {defineField, defineType} from 'sanity'

export const centeredImageType = defineType({
  name: 'centeredImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'altText',
      description: 'Describe the image for screen readers',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      description: 'Caption to be displayed below the image (optional)',
      type: 'string',
    }),
    defineField({
      name: 'objectFit',
      description: '(optional)',
      type: 'string',
      options: {
        list: [
          {value: 'cover', title: 'Cover'},
          {value: 'contain', title: 'Contain'},
        ],
      },
      initialValue: 'cover',
    }),
  ],
})
