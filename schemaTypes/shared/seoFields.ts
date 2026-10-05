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
    description: 'Turn on to stop this page appearing in Google, Bing, and AI search results.',
    initialValue: false,
  }),
]
