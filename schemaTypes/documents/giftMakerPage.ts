import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'
import { sectionIdField } from '../shared/sectionIdField'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts), same pattern as bespokeTripPage/corporateStaysPage.
// Drives the editorial copy around /gift-maker (see
// app/gift-maker/page.tsx): hero, "why gift with us" trust points,
// how-it-works steps, FAQ and the closing CTA. The gift-building tool
// itself (the step wizard) is not CMS content — it reads live from the
// shopProduct catalogue instead. Every field has an initialValue matching
// the page's first real draft, so the first document created from this
// schema reproduces the live page rather than shipping it blank.
export const giftMakerPage = defineType({
  name: 'giftMakerPage',
  title: 'Gift Maker Page',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'gift' }),
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'why', title: 'Why Gift With Us' },
    { name: 'how', title: 'How It Works' },
    { name: 'faq', title: 'FAQ' },
    { name: 'cta', title: 'Closing CTA' },
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
      initialValue: 'Corporate & Personal Gifting',
    }),
    defineField({
      name: 'heading',
      title: 'H1 Heading',
      type: 'string',
      group: 'hero',
      initialValue: 'The Ultimate Irish Gift Maker',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subhead',
      title: 'Subhead',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue: "Real gifts from our own shop, matched to your budget — not a generic hamper.",
    }),
    defineField({
      name: 'heroParagraph',
      title: 'Hero Paragraph',
      type: 'text',
      rows: 4,
      group: 'hero',
      initialValue:
        "Answer a few quick questions — who it's for, how many people, your budget per gift — and we'll put together real options, built from what's actually in our shop today. Every package leads with an SOS Stays gift voucher, so there's always something flexible in the mix, then fills out with Irish-made treats and local experiences around it.",
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (rule) => rule.required() })],
    }),

    // ---- Why gift with us ----
    sectionIdField('whySectionId', 'why', 'why'),
    defineField({
      name: 'whyHeading',
      title: 'Heading',
      type: 'string',
      group: 'why',
      initialValue: 'Why gift through SOS Stays',
    }),
    defineField({
      name: 'whyItems',
      title: 'Points',
      type: 'array',
      group: 'why',
      of: [
        {
          type: 'object',
          name: 'whyItem',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'text' } },
        },
      ],
      initialValue: [
        {
          _key: 'realStock',
          title: 'Real Irish stock, not a catalogue',
          text: 'Every suggestion is something we actually sell today — Loaded cookies, a Celtic Cara fairy door, Tranquil View spa rituals, Funtasia days out, and our own flexible gift voucher.',
        },
        {
          _key: 'votherPriority',
          title: 'A voucher in every package, first',
          text: 'Unless you choose physical-only, an SOS Stays gift voucher is allocated first in every suggestion, so there is always something flexible for them to use whenever they like.',
        },
        {
          _key: 'budgetBuilt',
          title: 'Built around your budget',
          text: "Tell us what you'd like to spend per person and we build the mix to fit it, rather than pricing a fixed hamper and hoping it lands close.",
        },
        {
          _key: 'delivery',
          title: 'We handle delivery',
          text: 'One office or fifty separate addresses, a box to open or an e-voucher to forward — we sort the logistics either way.',
        },
      ],
    }),

    // ---- How it works ----
    sectionIdField('howSectionId', 'how', 'how'),
    defineField({
      name: 'howHeading',
      title: 'Heading',
      type: 'string',
      group: 'how',
      initialValue: 'How it works',
    }),
    defineField({
      name: 'howSteps',
      title: 'Steps',
      type: 'array',
      group: 'how',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'text' } },
        },
      ],
      initialValue: [
        {
          _key: 'tellUs',
          title: 'Tell us the brief',
          text: "Who it's for, how many people, and what you'd like to spend per person.",
        },
        {
          _key: 'weBuild',
          title: 'We build it from real stock',
          text: 'Every option is something we actually sell today, led by a flexible gift voucher, not a mock-up.',
        },
        {
          _key: 'weDeliver',
          title: 'We handle delivery',
          text: 'One office or fifty addresses — we sort the logistics either way, and email you a formal quote.',
        },
      ],
    }),

    // ---- FAQ ----
    sectionIdField('faqSectionId', 'faq', 'faq'),
    defineField({
      name: 'faqHeading',
      title: 'Heading',
      type: 'string',
      group: 'faq',
      initialValue: 'Frequently asked questions',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'faq',
      description:
        'Visible on the page and mirrored word-for-word into the FAQPage JSON-LD schema — keep question/answer text exactly in sync if edited.',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
      initialValue: [
        {
          _key: 'whatsIncluded',
          question: "What's included in a gift package?",
          answer:
            'Usually an SOS Stays gift voucher (€25, €50, €75 or €100, picked to fit your budget) plus one or two real items from our shop — cookies, a fairy door, a spa ritual, a day out at Funtasia. You can add or remove items before requesting a quote.',
        },
        {
          _key: 'customise',
          question: 'Can I customise the suggested packages?',
          answer:
            'Yes — once you see your suggestions, you can remove any item and add others from our shop before you request a quote, so the final package is exactly what you want.',
        },
        {
          _key: 'multipleAddresses',
          question: 'Do you deliver to multiple addresses?',
          answer:
            "Yes. Tell us whether you need one delivery (e.g. one office) or several, and we'll quote accordingly — physical items go out together or individually, and e-vouchers are emailed per person regardless.",
        },
        {
          _key: 'budgetTooLow',
          question: "What if my budget doesn't fit a voucher tier?",
          answer:
            "Our smallest voucher tier is €25. For a lower per-gift budget, choose a physical-only package instead — our Irish-made cookies and fairy doors start lower, with no voucher included.",
        },
        {
          _key: 'howLong',
          question: 'How long does it take to get a quote?',
          answer: "We aim to email a formal quote within one business day of your request.",
        },
        {
          _key: 'businessBilling',
          question: 'Can I pay by business invoice?',
          answer:
            'Yes — choose "Business billing" when you request your quote and we\'ll invoice your company directly.',
        },
      ],
    }),

    // ---- Closing CTA ----
    sectionIdField('ctaSectionId', 'cta', 'cta'),
    defineField({
      name: 'ctaHeading',
      title: 'Heading',
      type: 'string',
      group: 'cta',
      initialValue: 'Gifting more than 20 people?',
    }),
    defineField({
      name: 'ctaText',
      title: 'Text',
      type: 'text',
      rows: 2,
      group: 'cta',
      initialValue:
        "Talk to us directly and we'll build a bespoke corporate gifting plan, invoiced once, delivered everywhere.",
    }),

    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    prepare: () => ({ title: 'Gift Maker Page' }),
  },
})
