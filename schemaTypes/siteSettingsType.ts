import {Settings} from 'lucide-react'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({
      name: 'homePage',
      type: 'reference',
      to: [{type: 'page'}],
    }),

    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'page'}]}],
    }),

    defineField({
      name: 'footerNav',
      title: 'Footer Links',
      description: 'Links shown in the footer, in this order.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'footerLink',
          type: 'object',
          fields: [
            defineField({
              name: 'page',
              type: 'reference',
              to: [{type: 'page'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              description: "Optional. Leave empty to use the page's title.",
              type: 'string',
            }),
          ],
          preview: {
            select: {label: 'label', pageTitle: 'page.title', slug: 'page.slug.current'},
            prepare({label, pageTitle, slug}) {
              return {title: label || pageTitle || 'No page selected', subtitle: slug && `/${slug}`}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
