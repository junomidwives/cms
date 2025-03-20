import {defineField, defineType} from 'sanity'

export const imageTextType = defineType({
  name: 'imageText',
  title: 'Image and Text',
  type: 'object',
  fields: [
    defineField({
      name: 'orientation',
      type: 'string',
      options: {
        list: [
          {value: 'imageLeft', title: 'Image Left'},
          {value: 'imageRight', title: 'Image Right'},
        ],
      },
    }),
    defineField({
      name: 'image',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'caption',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      media: 'image.image',
      blocks: 'body',
    },

    prepare({media, blocks}) {
      const block = (blocks || []).find((block: {_type: string}) => block._type === 'block')

      return {
        title: 'Text and Image',
        subtitle: block
          ? block.children
              .filter((child: {_type: string}) => child._type === 'span')
              .map((span: {text: any}) => span.text)
              .join('')
              .slice(0, 50) + '...'
          : 'No preview',
        media,
      }
    },
  },
})
