import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts). Holds global fallback SEO fields and structured
// data (schema.org business info) used site-wide, e.g. when an individual
// page hasn't set its own seoTitle/seoDescription.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'cog' }),
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Sos Stays',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'defaultSeoTitle',
      title: 'Default SEO Title',
      type: 'string',
      description: 'Used site-wide as a fallback when a page has no seoTitle of its own.',
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'defaultSeoImage',
      title: 'Default Social Share Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'businessName',
      title: 'Legal Business Name',
      type: 'string',
      initialValue: 'Power Rangers Ltd',
      description: 'Used in structured data (schema.org) — the registered legal entity.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'info@sosstays.com',
    }),
    defineField({
      name: 'bookingSubdomainUrl',
      title: 'Uplisting Booking Subdomain URL',
      type: 'url',
      description: 'e.g. https://book.sosstays.com — the base URL "Book Now" buttons link to.',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Shown as icons in the site footer.',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'X (Twitter)', value: 'x' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TripAdvisor', value: 'tripadvisor' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
