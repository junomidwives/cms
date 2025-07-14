import {defineField, defineType} from 'sanity'
import {requiredLinkField} from 'sanity-plugin-link-field'

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
      validation: (rule) => rule.custom((field) => requiredLinkField(field)),
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
