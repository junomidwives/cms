import {defineField, defineType} from 'sanity'
import {Wallpaper} from 'lucide-react'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Image',
  type: 'object',
  icon: Wallpaper,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})
