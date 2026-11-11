import {Image} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const centeredImageType = defineType({
  name: 'centeredImage',
  title: 'Image',
  type: 'object',
  icon: Image,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile image (optional)',
      description:
        'Shown instead of the main image on phones, e.g. a taller version of a wide banner. Leave empty to use the main image everywhere.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'size',
      description:
        'How wide the image is on a computer screen. On phones it always fills the width.',
      type: 'string',
      options: {
        list: [
          {value: 'small', title: 'Small (one third)'},
          {value: 'medium', title: 'Medium (two thirds)'},
          {value: 'large', title: 'Large (full width, e.g. banners)'},
        ],
        layout: 'radio',
      },
      initialValue: 'small',
    }),
    defineField({
      name: 'altText',
      description: 'Describe the image for screen readers',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      description: 'Caption to be displayed below the image (optional)',
      type: 'string',
    }),
    defineField({
      name: 'objectFit',
      title: 'Crop',
      description:
        'Small images only: Cover crops to a square, Contain shows the whole image. Medium and Large always show the whole image.',
      type: 'string',
      options: {
        list: [
          {value: 'cover', title: 'Cover (crop to square)'},
          {value: 'contain', title: 'Contain (whole image)'},
        ],
      },
      initialValue: 'cover',
    }),
  ],
})
