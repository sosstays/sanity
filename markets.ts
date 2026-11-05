// Single source of truth for the markets the Studio is split into.
// Used by structure.ts (sidebar), sanity.config.ts (new-document templates)
// and the add-market migration.

export const markets = [
  { id: 'ie', title: 'Ireland', flag: '🇮🇪', country: 'IE' },
  { id: 'in', title: 'India', flag: '🇮🇳', country: 'IN' },
] as const

// Document types that belong to exactly one market, via a `market` field.
export const marketTypes = [
  { type: 'propertyPage', title: 'Properties', single: 'Property', hasCountry: true },
  { type: 'areaGuide', title: 'Area Guides', single: 'Area Guide', hasCountry: true },
  { type: 'blogPost', title: 'Blog Posts', single: 'Blog Post', hasCountry: false },
  { type: 'landlordPage', title: 'Landlord Pages', single: 'Landlord Page', hasCountry: false },
  { type: 'partner', title: 'Partners', single: 'Partner', hasCountry: false },
] as const

export const marketTypeNames: string[] = marketTypes.map((t) => t.type)

// Singletons: one document per market, identified by a fixed ID of the form
// `<type>-<market>` (e.g. `footer-ie`, `footer-in`). The original un-suffixed
// document (`footer`) is left in place under "Shared > Legacy" because the
// live site still reads it until Phase 2 switches its queries.
export const singletons = [
  { type: 'siteSettings', title: 'Site Settings', icon: 'cog' },
  { type: 'footer', title: 'Footer', icon: 'bars-4' },
  { type: 'navigation', title: 'Navigation', icon: 'bars-4' },
  { type: 'heroSection', title: 'Homepage Hero', icon: 'image' },
  { type: 'promoGrid', title: 'Promo Grid', icon: 'th-large' },
  { type: 'hostsModule', title: 'Hosts Module', icon: 'users' },
  { type: 'audienceTabs', title: 'Landlord Audience Tabs', icon: 'users' },
  { type: 'privacyPolicyPage', title: 'Privacy Policy', icon: 'document-text' },
  { type: 'termsPage', title: 'Terms & Conditions', icon: 'document-text' },
  { type: 'corporateStaysPage', title: 'Corporate Stays Page', icon: 'case' },
  { type: 'aboutPage', title: 'About Page', icon: 'heart' },
  { type: 'shopPage', title: 'Shop Page', icon: 'basket' },
  { type: 'partnersPage', title: 'Partners Page', icon: 'users' },
] as const

// Singletons shared by every market: a single document with the plain type
// name as its ID (e.g. `partnersPage`), shown under "Shared".
export const sharedSingletons = [
  { type: 'countrySwitcher', title: 'Country Switcher', icon: 'earth-globe' },
] as const

export const singletonTypeNames: string[] = singletons.map((s) => s.type)
export const sharedSingletonTypeNames: string[] = sharedSingletons.map((s) => s.type)
