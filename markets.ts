// Single source of truth for the markets the Studio is split into.
// Used by structure.ts (sidebar) and sanity.config.ts (new-document templates).

export const markets = [
  { id: 'ie', title: 'Ireland', flag: '🇮🇪', country: 'IE' },
  { id: 'in', title: 'India', flag: '🇮🇳', country: 'IN' },
] as const

// Document types that belong to exactly one market.
export const marketTypes = [
  { type: 'propertyPage', title: 'Properties', single: 'Property', hasCountry: true },
  { type: 'areaGuide', title: 'Area Guides', single: 'Area Guide', hasCountry: true },
  { type: 'blogPost', title: 'Blog Posts', single: 'Blog Post', hasCountry: false },
  { type: 'landlordPage', title: 'Landlord Pages', single: 'Landlord Page', hasCountry: false },
] as const

export const marketTypeNames: string[] = marketTypes.map((t) => t.type)
