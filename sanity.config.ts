import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { media } from 'sanity-plugin-media'
import { table } from '@sanity/table'
import { markets, marketTypes } from './markets'

export default defineConfig({
  name: 'default',
  title: 'Sos Stays',

  projectId: 'owyw3r12',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(), // lets you test GROQ queries directly in the Studio
    media(),
    table(), // adds the `table` block type usable in any Portable Text body
  ],

  schema: {
    types: schemaTypes,
    // Replace the default "new document" templates for market-scoped types
    // so nothing can be created without a market.
    templates: (prev) => [
      ...prev.filter((t) => !marketTypes.some((m) => m.type === t.schemaType)),
      ...markets.flatMap((m) =>
        marketTypes.map((t) => ({
          id: `${t.type}-${m.id}`,
          title: `${t.single} (${m.title})`,
          schemaType: t.type,
          value: { market: m.id, ...(t.hasCountry ? { country: m.country } : {}) },
        }))
      ),
    ],
  },
})
