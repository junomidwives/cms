import {PanelsTopLeft} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: PanelsTopLeft,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'category',
      description: '(optional)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'pageBuilder',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      subtitle: 'slug.current',
    },
    prepare({title, subtitle, category}) {
      return {
        title: `${title}${category ? ` | ${category}` : ''}`,
        subtitle: subtitle,
        media: PanelsTopLeft,
      }
    },
  },
})
