import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {table} from '@sanity/table'
import {linkField} from 'sanity-plugin-link-field'
import {dashboardTool} from '@sanity/dashboard'
import {netlifyWidget} from 'sanity-plugin-dashboard-widget-netlify'
import {googleMapsInput} from '@sanity/google-maps-input'
import {Baby} from 'lucide-react'
import {presentationTool} from 'sanity/presentation'
import {locations, mainDocuments} from './presentation/resolve'
import {WaitingToGoLiveWidget} from './components/WaitingToGoLiveWidget'

// Draft preview in Studio. Points at the QA site, which is built with
// SANITY_PREVIEW=true (see the frontend README). Left out if the URL isn't set.
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL
const preview = previewUrl
  ? [
      presentationTool({
        title: 'Preview',
        previewUrl: {initial: previewUrl, previewMode: {enable: '/preview/enable'}},
        resolve: {mainDocuments, locations},
      }),
    ]
  : []

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
    ...preview,
    table(),
    linkField({
      linkableSchemaTypes: ['page', 'blog', 'birthStory'],
    }),
    googleMapsInput({
      apiKey: process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY!,
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
              buildHookId: process.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK_ID!,
              name: 'junomidwives',
            },
          ],
        }),
        {
          name: 'waiting-to-go-live',
          component: WaitingToGoLiveWidget,
          layout: {width: 'medium'},
        },
      ],
    }),
  ],

  // Releases and scheduled drafts need a paid plan, so hide their tabs and UI.
  releases: {enabled: false},
  scheduledDrafts: {enabled: false},

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== 'siteSettings'),
  },
})
