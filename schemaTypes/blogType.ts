import {Newspaper} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {slugify, slugValidation} from './slug'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: Newspaper,
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
        maxLength: 96,
        slugify,
      },
      validation: slugValidation,
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'date',
      initialValue: new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoMeta',
    }),
  ],
})
