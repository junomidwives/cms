import {
  Baby,
  CalendarHeart,
  FileText,
  Heart,
  House,
  ListOrdered,
  MessageSquareText,
  Phone,
  Star,
} from 'lucide-react'
import {defineArrayMember, defineField, defineType} from 'sanity'

// Numbered steps (e.g. "How it works"). The icon values map to Material Design
// Icons on the website (frontend components/blocks/Steps.vue).
export const STEP_ICONS = [
  {value: 'chat', title: 'Chat', icon: MessageSquareText},
  {value: 'heart', title: 'Heart', icon: Heart},
  {value: 'document', title: 'Document', icon: FileText},
  {value: 'home', title: 'Home', icon: House},
  {value: 'calendar', title: 'Calendar', icon: CalendarHeart},
  {value: 'phone', title: 'Phone', icon: Phone},
  {value: 'baby', title: 'Baby', icon: Baby},
  {value: 'star', title: 'Star', icon: Star},
]

export const stepsType = defineType({
  name: 'steps',
  title: 'Steps',
  type: 'object',
  icon: ListOrdered,
  fields: [
    defineField({
      name: 'steps',
      description: 'Numbered in this order. Four fit best on one row on a computer.',
      type: 'array',
      validation: (Rule) => Rule.min(1),
      of: [
        defineArrayMember({
          name: 'step',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              type: 'string',
              options: {
                list: STEP_ICONS.map(({value, title}) => ({value, title})),
              },
              initialValue: 'heart',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'text', icon: 'icon'},
            prepare({title, subtitle, icon}) {
              return {title, subtitle, media: STEP_ICONS.find((i) => i.value === icon)?.icon}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {steps: 'steps'},
    prepare({steps}) {
      const titles = (steps || []).map((s: {title?: string}) => s.title).filter(Boolean)
      return {
        title: titles.join(' → ') || 'Steps',
        subtitle: `Steps · ${titles.length}`,
      }
    },
  },
})
