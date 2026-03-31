import {defineField, defineType} from 'sanity'

export const seoMetaType = defineType({
  name: 'seoMeta',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      description: 'Recommended 50–60 characters. Defaults to the page title if left blank.',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('Keep meta titles under 60 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      description: 'Recommended 150–160 characters.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Keep meta descriptions under 160 characters'),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      description: 'Optional image override for social sharing (Open Graph). Recommended size: 1200×630px.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
