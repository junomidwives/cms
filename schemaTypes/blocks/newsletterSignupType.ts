import {defineField, defineType} from 'sanity'
import {Mail} from 'lucide-react'

export const newsletterSignupType = defineType({
  name: 'newsletterSignup',
  title: 'Newsletter Signup',
  type: 'object',
  icon: Mail,
  fields: [
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      rows: 3,
      description: 'Short text shown above the mailing list sign up form',
      initialValue:
        'Join our mailing list and stay connected. We’ll only email when there’s something worth sharing, like a new blog post or an upcoming event.',
    }),
  ],
  preview: {
    select: {
      subtitle: 'blurb',
    },
    prepare({subtitle}) {
      return {
        title: 'Newsletter Signup',
        subtitle,
      }
    },
  },
})
