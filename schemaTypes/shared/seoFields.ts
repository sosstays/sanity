import { defineField } from 'sanity'

// Shared SEO/AEO fields. Spread into any document type that needs
// its own meta title/description/OG image/robots control.
export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO Title',
    type: 'string',
    description: 'Overrides the page title in search results and browser tabs. Falls back to the main title if left blank.',
    validation: (rule) => rule.max(60).warning('Titles over 60 characters may be truncated in search results'),
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO Description',
    type: 'text',
    rows: 3,
    description: 'The summary shown under the title in search results and AI answer engines. Aim for 120-160 characters.',
    validation: (rule) => rule.max(160).warning('Descriptions over 160 characters may be truncated'),
  }),
  defineField({
    name: 'seoImage',
    title: 'Social Share Image',
    type: 'image',
    description: 'Shown when this page is shared on social media or messaging apps. Recommended 1200x630px.',
    options: { hotspot: true },
  }),
  defineField({
    name: 'noIndex',
    title: 'Hide from search engines',
    type: 'boolean',
    description:
      'Turn on to stop this page appearing in Google, Bing, and AI search results. Ireland pages are visible unless this is on. India pages are hidden by default: they only appear in search once this is explicitly switched OFF (toggle it on, then off).',
  }),
  defineField({
    name: 'canonicalOverride',
    title: 'Canonical URL override',
    type: 'url',
    description:
      'Leave blank. Only set this if this page is a duplicate of another URL and search engines should treat that URL as the original. Must be an absolute URL.',
    validation: (rule) => rule.uri({ scheme: ['https'] }),
  }),
  defineField({
    name: 'alternates',
    title: 'Same page on the other market’s site',
    type: 'reference',
    description:
      'Link the equivalent page on the other country’s site (e.g. the India version of this Ireland page). Both pages must link to each other — this is what produces the hreflang tags. Leave blank if the page exists on one site only.',
    to: [
      { type: 'propertyPage' },
      { type: 'areaGuide' },
      { type: 'blogPost' },
      { type: 'landlordPage' },
      { type: 'landingPage' },
    ],
    options: {
      filter: ({ document }: { document?: { market?: string } }) =>
        document?.market
          ? { filter: 'market != $market', params: { market: document.market } }
          : { filter: '' },
    },
  }),
]
