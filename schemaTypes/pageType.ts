import {PanelsTopLeft} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {slugify, slugValidation} from './slug'

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
        slugify,
      },
      validation: slugValidation,
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
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoMeta',
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
