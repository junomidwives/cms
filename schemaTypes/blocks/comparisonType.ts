import {Columns3} from 'lucide-react'
import {defineArrayMember, defineField, defineType} from 'sanity'

// Two-column comparison (e.g. typical NHS care vs care with Juno). Shown as a
// table on desktop and as one card per row on phones.
export const comparisonType = defineType({
  name: 'comparison',
  title: 'Comparison',
  type: 'object',
  icon: Columns3,
  fields: [
    defineField({
      name: 'otherLabel',
      title: 'Left column heading',
      type: 'string',
      initialValue: 'Typical NHS care',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'junoLabel',
      title: 'Right column heading (highlighted)',
      type: 'string',
      initialValue: 'Care with Juno',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rows',
      type: 'array',
      validation: (Rule) => Rule.min(1),
      of: [
        defineArrayMember({
          name: 'comparisonRow',
          type: 'object',
          fields: [
            defineField({
              name: 'topic',
              description: 'e.g. "Who you see"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'other',
              title: 'Left column',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'juno',
              title: 'Right column (highlighted)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'topic', subtitle: 'juno'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {other: 'otherLabel', juno: 'junoLabel', rows: 'rows'},
    prepare({other, juno, rows}) {
      return {
        title: `${other || '…'} vs ${juno || '…'}`,
        subtitle: `Comparison · ${rows?.length ?? 0} rows`,
      }
    },
  },
})
