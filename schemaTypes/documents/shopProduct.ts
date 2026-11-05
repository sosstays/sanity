import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'

// Repeatable — one document per item in the shop (see
// web/src/app/shop/page.tsx). Two kinds share this schema rather than
// splitting into separate document types, since almost every field is
// identical between them:
// - "voucher": a digital eVoucher for an experience (Funtasia day pass, a
//   massage, dinner) — no property link, fulfilled manually for now (the
//   buyer pays via Stripe, gets Stripe's own receipt, and the actual
//   voucher/code is sent by hand once the order notification comes in).
// Either kind can also be flagged `offerAsAddOn`, which surfaces it as an
// optional extra during stay checkout (replaces the old standalone addOn
// document type).
// - "goods": a physical item placed in a guest's rented property before
//   they arrive (cookies, flowers, coffee) — checkout asks which property
//   and arrival date it's for, shown as `unit`/`deliveryNote` guide.
export const shopProduct = defineType({
  name: 'shopProduct',
  title: 'Shop Product',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'basket' }),
  fields: [
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'eVoucher (digital, any property)', value: 'voucher' },
          { title: 'Real thing (physical, placed in a property)', value: 'goods' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. "Funtasia, for four" or "Box of cookies"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short line under the name, e.g. "Family entertainment centre, Drogheda"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Small category tag shown on the card image, e.g. "Days out", "Wellness", "In the house"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (EUR)',
      type: 'number',
      description: 'Per unit — multiplied by the quantity the buyer picks at checkout.',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'unit',
      title: 'Unit Label',
      type: 'string',
      description: 'e.g. "per voucher · four people" or "per box of twelve"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'maxQuantity',
      title: 'Max Quantity Per Order',
      type: 'number',
      initialValue: 12,
      validation: (rule) => rule.required().min(1).max(50),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Shown on the shop grid card.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 4,
      description: 'Shown in the detail panel when a shopper opens this item.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'includes',
      title: 'What’s Included',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short bullet points, e.g. "Day pass for four, any opening day"',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'deliveryNote',
      title: 'Delivery / Fulfillment Note',
      type: 'string',
      description:
        'Shown in the detail panel, e.g. "Emailed within 60 seconds as a PDF with a booking code" (voucher) or "Placed in the house before check-in. Order by 2pm the day before." (goods)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'allowStayDelivery',
      title: 'Offer Delivery To A Stay',
      type: 'boolean',
      initialValue: true,
      description: 'Real things only — lets the buyer have this placed in a property for their check-in or check-out.',
      hidden: ({ document }) => document?.kind !== 'goods',
    }),
    defineField({
      name: 'allowAddressDelivery',
      title: 'Offer Delivery To An Address',
      type: 'boolean',
      initialValue: true,
      description: 'Real things only — lets the buyer have this delivered to a home or collection address.',
      hidden: ({ document }) => document?.kind !== 'goods',
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document
          if (doc?.kind !== 'goods') return true
          return value === false && doc.allowStayDelivery === false
            ? 'Enable at least one delivery option.'
            : true
        }),
    }),
    defineField({
      name: 'offerAsAddOn',
      title: 'Also Offer As A Stay Add-on',
      type: 'boolean',
      initialValue: false,
      description:
        'Shows this item as an optional extra at the end of a stay booking (/stays/[slug]/book), charged as its own line item alongside the accommodation. Works for both eVouchers and real things.',
    }),
    defineField({
      name: 'addOnProperties',
      title: 'Add-on Available On',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'propertyPage' }] }],
      description: 'Leave empty to offer it on every property.',
      hidden: ({ document }) => !document?.offerAsAddOn,
    }),
    defineField({
      name: 'enabled',
      title: 'Show In Shop',
      type: 'boolean',
      initialValue: true,
      description:
        'Turn off to hide this item from the shop without deleting it. If "Also Offer As A Stay Add-on" is on, it stays available as an add-on on property pages and at checkout.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'price', kind: 'kind', media: 'image' },
    prepare: ({ title, subtitle, kind, media }) => ({
      title,
      subtitle: `${kind === 'goods' ? 'Real thing' : 'eVoucher'} — €${subtitle}`,
      media,
    }),
  },
})
