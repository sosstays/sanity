import { createElement } from 'react'
import { defineType, defineField, defineArrayMember } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'
import { sectionIdField } from '../shared/sectionIdField'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts), same pattern as aboutPage/partnersPage. Drives the
// hero and the two shelf blurbs on /shop (see web/src/app/shop/page.tsx).
// The products themselves are NOT stored here — they're the separate,
// repeatable "shopProduct" documents (see shopProduct.ts), the same way
// partnersPage pulls its directory from separate "partner" documents.
export const shopPage = defineType({
  name: 'shopPage',
  title: 'Shop Page',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'basket' }),
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'shelves', title: 'Shelves' },
    { name: 'seo', title: 'SEO / AEO' },
  ],
  fields: [
    // ---- Hero ----
    sectionIdField('heroSectionId', 'hero', 'hero'),
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'hero',
      initialValue: 'The Sos shop',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Headline (H1)',
      type: 'string',
      group: 'hero',
      initialValue: 'Two kinds of good surprise.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Subtext',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Vouchers that land in an inbox in seconds — a day at Funtasia, an hour with a massage therapist. And real things we put in the house before anyone arrives: cookies, coffee, flowers, a bottle of something local.',
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero Stats',
      type: 'array',
      group: 'hero',
      description: 'Small stat pairs under the hero copy, e.g. "60s" / "eVoucher delivery"',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'heroStat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
      initialValue: [
        { value: '60s', label: 'eVoucher delivery' },
        { value: '14', label: 'local makers & partners' },
      ],
    }),

    // ---- Shelves ----
    sectionIdField('shelvesSectionId', 'shelves', 'shelves'),
    defineField({
      name: 'vouchersBlurb',
      title: 'eVouchers Shelf Blurb',
      type: 'text',
      rows: 2,
      group: 'shelves',
      initialValue:
        'Digital vouchers — a code and a PDF in the inbox within the minute. Good as a gift, good as a plan for the Wednesday nobody has thought about yet.',
    }),
    defineField({
      name: 'goodsBlurb',
      title: 'Real Things Shelf Blurb',
      type: 'text',
      rows: 2,
      group: 'shelves',
      initialValue:
        'Real things, put in the house before anyone arrives. Ordered by 2pm the day before, left on the counter by the cleaner.',
    }),

    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    prepare: () => ({ title: 'Shop Page' }),
  },
})
