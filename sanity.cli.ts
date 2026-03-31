import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 's88cxh4b',
    dataset: 'production',
  },
  studioHost: 'juno-midwives',
  deployment: {
    autoUpdates: true,
    appId: 'oky8gdo57suchbyujfrb1zet',
  },
})
