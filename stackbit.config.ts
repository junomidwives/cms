import {defineStackbitConfig, SiteMapEntry} from '@stackbit/types'
import {SanityContentSource} from '@stackbit/cms-sanity'

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nuxt',
  nodeVersion: '18',
  contentSources: [
    new SanityContentSource({
      rootPath: __dirname,
      studioPath: __dirname,
      studioUrl: 'https://juno-midwives.sanity.studio',
      projectId: process.env.SANITY_PROJECT_ID!,
      token: process.env.SANITY_ACCESS_TOKEN!,
      dataset: process.env.SANITY_DATASET || 'production',
    }),
  ],
  modelExtensions: [
    {name: 'Page', type: 'page', urlPath: '/{slug}'},
    {name: 'Blog', type: 'page', urlPath: '/blog/{slug}'},
    {name: 'BirthStory', type: 'page', urlPath: '/birth-stories/{slug}'},
  ],
  sitemap: ({documents, models}) => {
    const pageModels = models.filter((model) => model.type === 'page')

    return documents
      .filter((d) => pageModels.some((m) => m.name === d.modelName))
      .map((document) => {
        // Map the model name to its corresponding URL
        const urlModel = (() => {
          switch (document.modelName) {
            case 'Page':
              return 'otherPage'
            case 'Blog':
              return 'otherBlog'
            default:
              return null
          }
        })()

        return {
          stableId: document.id,
          urlPath: `/${urlModel}/${document.id}`,
          document,
          isHomePage: false,
        }
      })
      .filter(Boolean) as SiteMapEntry[]
  },
})
