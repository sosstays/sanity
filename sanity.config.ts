import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { media } from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'Sos Stays',

  projectId: 'owyw3r12',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(), // lets you test GROQ queries directly in the Studio
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})
