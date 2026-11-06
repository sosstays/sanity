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
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Public business phone in international format, e.g. +353 1 234 5678 or +91 98765 43210. Used in structured data (schema.org).',
    }),
    defineField({
      name: 'address',
      title: 'Business Address',
      type: 'object',
      description: 'Used in structured data (schema.org) only. Leave blank if the business has no public address in this market — nothing is inherited from the other site.',
      fields: [
        defineField({ name: 'streetAddress', title: 'Street address', type: 'string' }),
        defineField({ name: 'locality', title: 'City / town', type: 'string' }),
        defineField({ name: 'region', title: 'County / state', type: 'string' }),
        defineField({ name: 'postalCode', title: 'Postcode / PIN code', type: 'string' }),
      ],
    }),
    defineField({
      name: 'bookingSubdomainUrl',
      title: 'Uplisting Booking Subdomain URL',
      type: 'url',
      description: 'e.g. https://book.sosstays.com — the base URL "Book Now" buttons link to.',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'propertyOrder',
      title: 'Property display order',
      type: 'array',
      description:
        'Drag to set the order properties appear in across the site — homepage featured stays, the /stays page, and anywhere else properties are listed. Any property not added here appears afterwards, in alphabetical order.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'propertyPage' }],
          options: { disableNew: true },
        },
      ],
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
