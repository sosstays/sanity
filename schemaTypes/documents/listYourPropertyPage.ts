import { createElement } from 'react'
import { defineType, defineField, defineArrayMember } from 'sanity'
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
    { name: 'how', title: 'How this works' },
    { name: 'form', title: 'Form' },
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

    // ---- How this works ----
    sectionIdField('howSectionId', 'how', 'how-this-works'),
    defineField({
      name: 'howHeading',
      title: 'Heading',
      type: 'string',
      group: 'how',
      initialValue: 'How this works',
    }),
    defineField({
      name: 'howIntro',
      title: 'Intro line',
      type: 'text',
      rows: 3,
      group: 'how',
      description: 'Sits above the three boxes. Leave blank to keep the default copy.',
    }),
    defineField({
      name: 'howItems',
      title: 'Boxes',
      type: 'array',
      group: 'how',
      description:
        'The explainer boxes, in order — three fit best. Leave empty to keep the default three ("We find the booking", "We handle the enquiry", "You stay in control").',
      validation: (rule) => rule.max(3).warning('Three boxes fit the layout best.'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'howItem',
          fields: [
            defineField({ name: 'title', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        }),
      ],
    }),

    // ---- Form ----
    sectionIdField('formSectionId', 'form', 'submit'),

    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    prepare: () => ({ title: 'List Your Property Page (Corporate Stays)' }),
  },
})
