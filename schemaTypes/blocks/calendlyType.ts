import {defineType} from 'sanity'

export const calendlyType = defineType({
  name: 'calendly',
  title: 'Calendly',
  type: 'object',
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
})
