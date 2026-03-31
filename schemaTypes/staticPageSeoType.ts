import {Search} from 'lucide-react'
import {defineField, defineType} from 'sanity'

const staticPageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'seoMeta',
  })

export const staticPageSeoType = defineType({
  name: 'staticPageSeo',
  title: 'Static Page SEO',
  type: 'document',
  icon: Search,
  fields: [
    staticPageField('homepage', 'Homepage'),
    staticPageField('about', 'About / Meet the Team'),
    staticPageField('carePackages', 'Care Packages'),
    staticPageField('contact', 'Contact'),
    staticPageField('links', '404 / Links Page'),
  ],
})
