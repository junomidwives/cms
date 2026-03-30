import {Newspaper} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const recentPostsType = defineType({
  name: 'recentPosts',
  title: 'Recent Posts',
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
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      initialValue: 'blog',
      options: {
        list: [
          {title: 'Blog Posts', value: 'blog'},
          {title: 'Birth Stories', value: 'birthStory'},
        ],
        layout: 'radio',
      },
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
      hidden: ({parent}) => parent?.postType === 'birthStory',
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: 'reference',
          to: [{type: 'blog'}],
        },
      ],
    }),
    defineField({
      name: 'birthStoryPosts',
      title: 'Birth Stories',
      type: 'array',
      description: 'Select up to 3 stories to feature. Leave empty to show the 3 most recent.',
      hidden: ({parent}) => parent?.postType !== 'birthStory',
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: 'reference',
          to: [{type: 'birthStory'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      postType: 'postType',
    },
    prepare({title, postType}) {
      const label = postType === 'birthStory' ? 'Recent Birth Stories' : 'Recent Blog Posts'
      return {
        title: label,
        subtitle: title ? `Heading: ${title}` : 'No heading',
        media: Newspaper,
      }
    },
  },
})
