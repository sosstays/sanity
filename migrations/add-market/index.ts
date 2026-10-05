import { defineMigration, at, setIfMissing, createIfNotExists } from 'sanity/migrate'

// Phase 1 migration: puts every existing document into the Ireland market.
//
//  - sets market: "ie" on propertyPage, areaGuide, blogPost, landlordPage
//    (published and draft) wherever it is missing
//  - fills city / region / country on properties from the free-text
//    `location` ("Ardee, Co. Louth" -> Ardee / Louth / IE); anything that
//    can't be parsed is left blank and logged for a human to fix
//  - sets country: "IE" on area guides
//  - for each singleton (siteSettings, footer, navigation, heroSection, ...)
//    creates `<type>-ie` (a copy of the current document) and an empty
//    `<type>-in`, both as DRAFTS so nothing goes live until the owner
//    publishes them. The original un-suffixed document is left untouched
//    because the live site still reads it.
//
// Safe to re-run: every operation is setIfMissing / createIfNotExists.
//
//   npx sanity migration run add-market              (dry run — default)
//   npx sanity migration run add-market --no-dry-run (writes to the dataset)

const MARKET_TYPES = ['propertyPage', 'areaGuide', 'blogPost', 'landlordPage']
const SINGLETON_TYPES = [
  'siteSettings', 'footer', 'navigation', 'heroSection', 'hostsModule', 'audienceTabs',
  'privacyPolicyPage', 'termsPage', 'corporateStaysPage', 'aboutPage', 'partnersPage', 'shopPage',
]

function parseLocation(location: unknown): { city: string; region: string } | null {
  if (typeof location !== 'string') return null
  const parts = location.split(',').map((p) => p.trim()).filter(Boolean)
  if (parts.length < 2) return null
  const city = parts[0]
  const region = parts.slice(1).join(', ').replace(/^(co\.?|county)\s+/i, '').trim()
  return city && region ? { city, region } : null
}

export default defineMigration({
  title: 'Add market (ie) to existing content and create per-market site settings',
  documentTypes: [...MARKET_TYPES, ...SINGLETON_TYPES],

  migrate: {
    document(doc) {
      if (SINGLETON_TYPES.includes(doc._type)) {
        // Only the original un-suffixed published document is copied.
        if (doc._id !== doc._type) return
        const { _id, _rev, _createdAt, _updatedAt, ...rest } = doc as Record<string, unknown>
        return [
          createIfNotExists({ ...rest, _id: `drafts.${doc._type}-ie`, _type: doc._type } as never),
          createIfNotExists({ _id: `drafts.${doc._type}-in`, _type: doc._type } as never),
        ]
      }

      const ops = [at('market', setIfMissing('ie'))]

      if (doc._type === 'areaGuide') {
        ops.push(at('country', setIfMissing('IE')))
      }

      if (doc._type === 'propertyPage') {
        const parsed = parseLocation((doc as { location?: unknown }).location)
        if (parsed) {
          ops.push(
            at('city', setIfMissing(parsed.city)),
            at('region', setIfMissing(parsed.region)),
            at('country', setIfMissing('IE'))
          )
        } else {
          console.log(
            `NEEDS HUMAN CHECK: ${doc._id} location=${JSON.stringify((doc as { location?: unknown }).location)} (city/region left blank)`
          )
          ops.push(at('country', setIfMissing('IE')))
        }
      }

      return ops
    },
  },
})
