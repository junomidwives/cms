import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 's88cxh4b',
    dataset: 'production',
  },
  autoUpdates: true,
  studioHost: 'juno-midwives',
})
