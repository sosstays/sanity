import { createElement } from 'react'
import { defineType, defineField, defineArrayMember } from 'sanity'
import { Icon } from '@sanity/icons'

// One link (label + destination), reused by every link list in the footer.
const footerLink = () =>
  defineArrayMember({
    type: 'object',
    name: 'footerLink',
    fields: [
      defineField({
        name: 'label',
        title: 'Label',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'href',
        title: 'Link',
        type: 'string',
        description: 'Relative path (e.g. /pricing) or full URL.',
        validation: (rule) => rule.required(),
      }),
    ],
    preview: {
      select: { title: 'label', subtitle: 'href' },
    },
  })

// Singleton document — one per market (`footer-ie`, `footer-in`), managed
// via Studio Structure (see structure.ts / markets.ts). Drives the
// site-wide footer (see web/src/components/Footer.tsx), which is two
// stacked bands:
//
//   Primary footer (cream)   — the page-link columns, then a single quiet
//                              line of "popular searches" SEO links.
//   Secondary footer (green) — logo + tagline, social icons, then company
//                              details, legal links and the copyright line.
//
// Social links live on siteSettings and are fetched separately.
export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'bars-4' }),
  groups: [
    { name: 'primary', title: 'Primary footer (links)', default: true },
    { name: 'secondary', title: 'Secondary footer (company)' },
  ],
  fields: [
    // ---- Primary footer ----
    defineField({
      name: 'columns',
      title: 'Link columns',
      type: 'array',
      group: 'primary',
      description:
        'Page-link columns shown across the top of the footer, in order. Four columns fit best on desktop. Keep legal links (privacy, terms) out of here — they go in the secondary footer.',
      validation: (rule) => rule.max(5).warning('More than five columns gets cramped on desktop.'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [footerLink()],
            }),
          ],
          preview: {
            select: { title: 'title', links: 'links' },
            prepare: ({ title, links }) => ({
              title,
              subtitle: `${links?.length ?? 0} link${links?.length === 1 ? '' : 's'}`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'seoLinksTitle',
      title: 'SEO links heading',
      type: 'string',
      group: 'primary',
      initialValue: 'Popular searches',
      description: 'Small heading beside the SEO links line. Defaults to "Popular searches".',
    }),
    defineField({
      name: 'seoLinks',
      title: 'SEO links',
      type: 'array',
      group: 'primary',
      description:
        'Landing-page links shown as one quiet line under the columns (e.g. "Hotels near Funtasia"). Leave empty to hide the line.',
      of: [footerLink()],
    }),

    // ---- Secondary footer ----
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'secondary',
      initialValue: 'Sos is the Irish word for a break.',
      description: 'Short line shown under the logo.',
    }),
    defineField({
      name: 'companyInfo',
      title: 'Company details',
      type: 'text',
      rows: 2,
      group: 'secondary',
      description:
        'Shown after the copyright line, e.g. registered company name, address and company number. Leave empty to hide.',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal links',
      type: 'array',
      group: 'secondary',
      description: 'Privacy policy, terms and similar documents, shown at the very bottom.',
      of: [footerLink()],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'secondary',
      description:
        'Optional override for the bottom copyright line. Use {year} for the current year. Defaults to "© {year} Sos Stays. All rights reserved."',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Footer' }),
  },
})
