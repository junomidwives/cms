import {defineType, defineArrayMember} from 'sanity'

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  type: 'array',
  of: [
    defineArrayMember({type: 'hero'}),
    defineArrayMember({type: 'imageText'}),
    defineArrayMember({type: 'faq'}),
    defineArrayMember({type: 'logoGroup'}),
    defineArrayMember({type: 'blockContent'}),
    defineArrayMember({type: 'centeredImage'}),
    defineArrayMember({type: 'cta'}),
    defineArrayMember({type: 'table'}),
    defineArrayMember({type: 'recommendation'}),
  ],
})
