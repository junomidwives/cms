import {defineField, defineType} from 'sanity'
import {AlignCenterIcon} from '../../components/AlignCenterIcon'
import {CtaIcon} from '../../components/CtaIcon'
import {TextAlign} from '../../components/TextAlignComponent'
import {CTAComponent} from '../../components/CtaComponent'

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
                icon: AlignCenterIcon,
                component: (props) => TextAlign(props),
              },
            ],
          },
        },
        {type: 'image'},
        {
          type: 'cta',
          title: 'CTA',
          icon: CtaIcon,
        },
      ],
    }),
  ],
})
