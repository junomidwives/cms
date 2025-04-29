import {defineStackbitConfig} from '@stackbit/types'
import {SanityContentSource} from '@stackbit/cms-sanity'
import path from 'path'

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nuxt',
  nodeVersion: '18',
  contentSources: [
    new SanityContentSource({
      rootPath: __dirname,
      studioPath: path.join(__dirname, 'studio'),
      studioUrl: 'https://juno-midwives.sanity.studio',
      projectId: process.env.SANITY_PROJECT_ID!,
      token: process.env.SANITY_ACCESS_TOKEN!,
      dataset: process.env.SANITY_DATASET || 'production',
    }),
  ],
  // @ts-expect-error
  mapModels: ({models}) => {
    return models.map((model) => {
      if (model.name === 'page') {
        return {...model, type: 'page', urlPath: '/{slug}'}
      }
      return model
    })
  },
})
