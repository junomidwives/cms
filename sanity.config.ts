import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {table} from '@sanity/table'
import {linkField} from 'sanity-plugin-link-field'
import {dashboardTool} from '@sanity/dashboard'
import {netlifyWidget} from 'sanity-plugin-dashboard-widget-netlify'
import {Baby} from 'lucide-react'

const visionDev = process.env.NODE_ENV === 'development' ? [visionTool()] : []

export default defineConfig({
  name: 'default',
  title: 'Juno Midwives',
  projectId: 's88cxh4b',
  dataset: 'production',
  icon: Baby,

  plugins: [
    structureTool({
      structure,
    }),
    table(),
    linkField({
      linkableSchemaTypes: ['page', 'blog', 'birthStory'],
    }),
    ...visionDev,

    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'Netlify Deploy',
          sites: [
            {
              title: 'Juno Midwives',
              apiId: '4aa460fd-454f-43c7-a40d-dea9c747d9a8',
              buildHookId: '67fd2e8b77ba26b0f1bd82b0',
              name: 'junomidwives',
            },
          ],
        }),
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== 'siteSettings'),
  },
})
