import {Link} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {requiredLinkField} from 'sanity-plugin-link-field'

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
              name: 'link',
              title: 'Link',
              type: 'link',
              options: {
                enableText: true,
              },
              validation: (rule) => rule.custom((field) => requiredLinkField(field)),
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
              title: 'link.text',
              active: 'active',
            },
            prepare({title, active}) {
              return {
                title: active ? title : `${title} (hidden)`,
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
