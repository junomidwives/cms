import {AlignCenter, AlignLeft, AlignRight} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {TextAlign} from '../../components/TextAlignComponent'

export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Free Content',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'link',
              },
            ],
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {
                title: 'Center',
                value: 'center',
                icon: AlignCenter,
                component: (props) => TextAlign(props),
              },
            ],
          },
        },
        {type: 'image'},
      ],
    }),
  ],
})
