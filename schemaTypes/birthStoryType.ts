import {Baby} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const birthStoryType = defineType({
  name: 'birthStory',
  title: 'Birth Story',
  type: 'document',
  icon: Baby,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      description: 'e.g. "Sarah M."',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'A short summary or teaser for the story',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'date',
      initialValue: new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: 'content',
      title: 'Full Story',
      description: 'Optional full story body for a detail page',
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoMeta',
    }),
  ],
})
