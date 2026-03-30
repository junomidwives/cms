import {Link} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const bioLinksType = defineType({
  name: 'bioLinks',
  title: 'Bio Links',
  type: 'document',
  icon: Link,
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: Link,
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Internal path (e.g. /about) or full external URL',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'active',
              title: 'Active',
              type: 'boolean',
              description: 'Show or hide this link',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
              active: 'active',
            },
            prepare({title, subtitle, active}) {
              return {
                title: active ? title : `${title} (hidden)`,
                subtitle,
                media: Link,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bio Links',
      }
    },
  },
})
