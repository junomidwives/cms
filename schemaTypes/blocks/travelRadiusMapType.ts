import {defineField, defineType} from 'sanity'
import {MapPin} from 'lucide-react'
import {GeopointWithPreview} from '../../components/GeopointWithPreview'

export const travelRadiusMapType = defineType({
  name: 'travelRadiusMap',
  title: 'Travel Radius Map',
  type: 'object',
  icon: MapPin,
  fields: [
    defineField({
      name: 'orientation',
      type: 'string',
      options: {
        list: [
          {value: 'mapLeft', title: 'Map Left'},
          {value: 'mapRight', title: 'Map Right'},
        ],
      },
      initialValue: 'mapLeft',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'center',
      title: 'Center Location',
      type: 'geopoint',
      components: {input: GeopointWithPreview},
    }),
    defineField({
      name: 'radius',
      title: 'Radius (km)',
      type: 'number',
      description: 'The travel radius in kilometres.',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'body',
      title: 'Text',
      description: 'Shown next to the map.',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'link',
              },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Travel Radius Map',
        subtitle: 'Map',
        media: MapPin,
      }
    },
  },
})
