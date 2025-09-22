import {defineType} from 'sanity'
import {CalendarDays} from 'lucide-react'

export const calendlyType = defineType({
  name: 'calendly',
  title: 'Calendly',
  type: 'object',
  icon: CalendarDays,
  fields: [
    {
      name: 'url',
      title: 'Calendly URL',
      type: 'url',
      description: 'Enter your Calendly scheduling link (e.g., https://calendly.com/your-username)',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).error('Please enter a valid URL starting with http or https.'),
    },
  ],
  preview: {
    select: {
      title: 'url',
    },
    prepare(selection) {
      return {
        title: 'Calendly',
        subtitle: selection.title,
      }
    },
  },
})
