import {Settings} from 'lucide-react'
import {defineField, defineType} from 'sanity'

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
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
