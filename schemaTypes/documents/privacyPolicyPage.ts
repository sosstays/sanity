import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts), same pattern as siteSettings.
export const privacyPolicyPage = defineType({
  name: 'privacyPolicyPage',
  title: 'Privacy Policy',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'document-text' }),
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO / AEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      initialValue: 'Privacy Policy',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    prepare: () => ({ title: 'Privacy Policy' }),
  },
})
