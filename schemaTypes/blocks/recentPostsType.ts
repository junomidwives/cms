import {Newspaper} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const recentPostsType = defineType({
  name: 'recentPosts',
  title: 'Recent Blog Posts',
  type: 'object',
  icon: Newspaper,
  fields: [
    defineField({
      name: 'preserve',
      type: 'boolean',
      initialValue: true,
      hidden: true,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional heading for this section',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      description: 'Select up to 3 posts to feature. Leave empty to show the 3 most recent.',
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: 'reference',
          to: [{type: 'blog'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title ? title : 'Recent Blog Posts',
        media: Newspaper,
      }
    },
  },
})
