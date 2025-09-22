import {defineField, defineType} from 'sanity'
import {MessageCircleQuestion} from 'lucide-react'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: MessageCircleQuestion,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'centered',
      type: 'boolean',
      description: 'Center the content in the page, useful for displaying individually',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title,
        subtitle: 'FAQ',
        media: MessageCircleQuestion,
      }
    },
  },
})
