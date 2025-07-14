import {defineField, defineType} from 'sanity'
import {AlignCenterIcon} from '../../components/AlignCenterIcon'
import {CtaIcon} from '../../components/CtaIcon'
import {TextAlign} from '../../components/TextAlignComponent'
import {UploadIcon} from '../../components/UploadIcon'
import {ImageIcon} from '../../components/ImageIcon'

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
        {
          title: 'Image',
          name: 'imageBlock',
          type: 'object',
          icon: ImageIcon,
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required().error('Image is required.'),
            }),
            defineField({
              name: 'caption',
              description: 'Caption to be displayed below the image (optional)',
              type: 'string',
            }),
            defineField({
              name: 'altText',
              description: 'Describe the image for screen readers',
              type: 'string',
            }),
          ],
        },
        {
          type: 'cta',
          title: 'CTA',
          icon: CtaIcon,
        },
        defineField({
          name: 'pdf',
          type: 'file',
          icon: UploadIcon,
          options: {
            accept: 'application/pdf',
          },
          fields: [
            defineField({
              name: 'description',
              type: 'string',
              title: 'File Description',
            }),
          ],
          preview: {
            select: {
              title: 'description',
            },
            prepare({title}) {
              return {
                title,
                subtitle: 'PDF',
              }
            },
          },
        }),
      ],
    }),
  ],
})
