import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {table} from '@sanity/table'
import {linkField} from 'sanity-plugin-link-field'

export default defineConfig({
  name: 'default',
  title: 'juno-midwives',

  projectId: 's88cxh4b',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    table(),
    linkField({
      linkableSchemaTypes: ['page', 'blog', 'birthStory'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== 'siteSettings'),
  },
})
