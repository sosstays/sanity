import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'owyw3r12',
    dataset: 'production',
  },
  deployment: {
    appId: 'tdtrv03r8hbr7lziri4r1jcv',
  },
  typegen: {
    path: '../sosstays/src/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../sosstays/src/sanity/sanity.types.ts',
    overloadClientMethods: true,
  },
})
