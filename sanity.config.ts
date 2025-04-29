import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {table} from '@sanity/table'
import {linkField} from 'sanity-plugin-link-field'
import {netlifyTool} from 'sanity-plugin-netlify'

const visionDev = process.env.NODE_ENV === 'development' ? [visionTool()] : []

export default defineConfig({
  name: 'default',
  title: 'juno-midwives',

  projectId: 's88cxh4b',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    table(),
    linkField({
      linkableSchemaTypes: ['page', 'blog', 'birthStory'],
    }),
    ...visionDev,
    netlifyTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== 'siteSettings'),
  },
})
