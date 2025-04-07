import {defineField, defineType} from 'sanity'

export const ctaType = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'CTA',
      type: 'link',
      options: {
        enableText: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'link.text',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: 'CTA',
      }
    },
  },
})
