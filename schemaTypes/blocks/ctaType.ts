import {defineType} from 'sanity'

export const ctaType = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'link',
  options: {
    enableText: true,
  },
})
