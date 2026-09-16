import {ArrowRightLeft} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const redirectType = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: ArrowRightLeft,
  fields: [
    defineField({
      name: 'source',
      title: 'Old path',
      description: 'The path to redirect from, e.g. /care-packages',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          !value || value.startsWith('/') ? true : 'Must start with /',
        ),
    }),
    defineField({
      name: 'destination',
      title: 'New path',
      description: 'The path to redirect to, e.g. /independent-private-midwife-kent',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          !value || value.startsWith('/') ? true : 'Must start with /',
        ),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent redirect (301)',
      description:
        'Leave on for a permanent redirect (recommended for SEO when a page has moved). Turn off for a temporary redirect (302).',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
    },
    prepare({source, destination}) {
      return {
        title: `${source} → ${destination}`,
        media: ArrowRightLeft,
      }
    },
  },
})
