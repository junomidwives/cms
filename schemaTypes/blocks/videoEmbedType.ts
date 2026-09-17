import {defineField, defineType} from 'sanity'
import {Video} from 'lucide-react'

export const videoEmbedType = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  icon: Video,
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description:
        'A YouTube or Vimeo video URL, e.g. https://www.youtube.com/watch?v=... or https://vimeo.com/...',
      validation: (Rule) =>
        Rule.required()
          .uri({scheme: ['http', 'https']})
          .custom((value) => {
            if (!value) return true
            const isYouTube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(value)
            const isVimeo = /^(https?:\/\/)?(www\.)?vimeo\.com\//.test(value)
            return isYouTube || isVimeo || 'Please enter a valid YouTube or Vimeo URL.'
          }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description:
        'Optional caption shown below the video, also used as the accessible title for the embed',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'url',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Video Embed',
        subtitle,
      }
    },
  },
})
