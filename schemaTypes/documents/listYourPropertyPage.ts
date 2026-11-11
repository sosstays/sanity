import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'
import { sectionIdField } from '../shared/sectionIdField'

// Singleton document — one instance per market, managed via Studio Structure
// (see markets.ts/structure.ts), same pattern as corporateStaysPage. Drives
// the hero copy on /corporate-stays/list-your-property (the public owner
// submission form for corporate/monthly-stay sourcing — a separate pool
// from the regular "list your property" management onboarding at
// /landlords). The form itself and its fields are not CMS-driven — only
// this hero banner's copy is.
export const listYourPropertyPage = defineType({
  name: 'listYourPropertyPage',
  title: 'List Your Property Page (Corporate Stays)',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'home' }),
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'seo', title: 'SEO / AEO' },
  ],
  fields: [
    sectionIdField('heroSectionId', 'hero', 'hero'),
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'hero',
      initialValue: 'For property owners · Corporate & monthly stays only',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Headline',
      type: 'string',
      group: 'hero',
      initialValue: 'Submit your property for corporate & monthly-stay sourcing',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroBody',
      title: 'Body Copy',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'This is not our regular Airbnb management sign-up — it only feeds contractor crews, relocating professionals and other long-stay corporate guests. We review every submission before anything goes live, and nothing here is shared or booked outside our team.',
    }),
    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    prepare: () => ({ title: 'List Your Property Page (Corporate Stays)' }),
  },
})
