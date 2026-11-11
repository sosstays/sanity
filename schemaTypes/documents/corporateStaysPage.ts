import { createElement } from 'react'
import { defineType, defineField, defineArrayMember } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'
import { iconField } from '../shared/iconField'
import { sectionIdField } from '../shared/sectionIdField'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts), same pattern as heroSection/hostsModule. Drives the
// whole /corporate-stays page (see app/corporate-stays/page.tsx): hero,
// "who we house" cards, "how it works" steps, coverage-by-county band, the
// "what's included" feature grid, and the FAQ. Every section field has an
// `initialValue` matching the page's original hardcoded copy, so the first
// document created from this schema reproduces the live page rather than
// shipping it blank.
export const corporateStaysPage = defineType({
  name: 'corporateStaysPage',
  title: 'Corporate Stays Page',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'case' }),
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'who', title: 'Who we house' },
    { name: 'how', title: 'How it works' },
    { name: 'coverage', title: 'Coverage' },
    { name: 'included', title: "What's included" },
    { name: 'partner', title: 'Partner with us' },
    { name: 'faq', title: 'FAQ' },
    { name: 'closing', title: 'Closing CTA' },
    { name: 'seo', title: 'SEO / AEO' },
  ],
  fields: [
    // ---- Hero ----
    sectionIdField('heroSectionId', 'hero', 'hero'),
    defineField({
      name: 'heroBadge',
      title: 'Badge Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Now booking crews in Louth',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Headline',
      type: 'string',
      group: 'hero',
      initialValue: 'Contractor and workforce accommodation, sorted for the month.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroBody',
      title: 'Body Copy',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Fully furnished houses and apartments across Louth, Clare, Wexford and Wicklow — booked by the week or the month, on one invoice, with one person who answers the phone for the whole stay.',
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Primary Button Label',
      type: 'string',
      group: 'hero',
      initialValue: 'Send your SOS',
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Secondary Button Label',
      type: 'string',
      group: 'hero',
      initialValue: 'See where we operate',
    }),
    defineField({
      name: 'heroFacts',
      title: 'Quick Facts',
      type: 'array',
      group: 'hero',
      description: 'Short bullet row under the CTAs, e.g. "Fully furnished".',
      of: [{ type: 'string' }],
      initialValue: ['Fully furnished', 'Weekly or monthly', 'One invoice', 'One contact'],
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      type: 'array',
      group: 'hero',
      description:
        'One image fills the desktop split full-height; two stack as a diptych. See components/SplitHero.tsx.',
      validation: (rule) => rule.max(2),
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),

    // ---- Who we house ----
    sectionIdField('whoSectionId', 'who', 'who'),
    defineField({
      name: 'whoEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'who',
      initialValue: 'Who we house',
    }),
    defineField({
      name: 'whoHeading',
      title: 'Heading',
      type: 'string',
      group: 'who',
      initialValue: 'A hotel room is overkill for a month.',
    }),
    defineField({
      name: 'whoBody',
      title: 'Body Copy',
      type: 'text',
      rows: 2,
      group: 'who',
      initialValue:
        "If your return date keeps shifting, or you're housing a crew rather than a guest, this is who we sort accommodation for.",
    }),
    defineField({
      name: 'whoCards',
      title: 'Cards',
      type: 'array',
      group: 'who',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'whoCard',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: (rule) => rule.required() }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (rule) => rule.required() })],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        }),
      ],
    }),

    // ---- How it works ----
    sectionIdField('howSectionId', 'how', 'how'),
    defineField({
      name: 'howEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'how',
      initialValue: 'How it works',
    }),
    defineField({
      name: 'howHeading',
      title: 'Heading',
      type: 'string',
      group: 'how',
      initialValue: 'Three steps, no procurement portal.',
    }),
    defineField({
      name: 'howBody',
      title: 'Body Copy',
      type: 'text',
      rows: 2,
      group: 'how',
      initialValue:
        'Tell us headcount, dates and the county you need to be near. You get real options back — not a generic price list.',
    }),
    defineField({
      name: 'howSteps',
      title: 'Steps',
      type: 'array',
      group: 'how',
      description: 'Shown numbered in order — the number itself is just this array\'s position.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'howStep',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),

    // ---- Coverage ----
    sectionIdField('coverageSectionId', 'coverage', 'coverage'),
    defineField({
      name: 'coverageEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'coverage',
      initialValue: 'Where we operate',
    }),
    defineField({
      name: 'coverageHeading',
      title: 'Heading',
      type: 'string',
      group: 'coverage',
      initialValue: 'Live in Louth, expanding down the east coast and into the mid-west.',
    }),
    defineField({
      name: 'coverageAreas',
      title: 'Areas',
      type: 'array',
      group: 'coverage',
      description:
        'Keep this honest — only mark a county "Live" once there is a real, confirmed property there. Everywhere else should read "Expanding", with no invented stats.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'coverageArea',
          fields: [
            defineField({ name: 'county', title: 'County', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'live',
              title: 'Live now?',
              type: 'boolean',
              description: 'On = "Live now" (with the pulsing marker). Off = "Expanding".',
              initialValue: false,
            }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: (rule) => rule.required() }),
          ],
          preview: {
            select: { title: 'county', live: 'live' },
            prepare: ({ title, live }) => ({ title, subtitle: live ? 'Live now' : 'Expanding' }),
          },
        }),
      ],
      initialValue: [
        {
          county: 'Louth',
          live: true,
          body: 'On the Dublin–Belfast corridor, close to the M1 and the Newry–Dublin rail line. Our first managed property is here, with more coming.',
        },
        {
          county: 'Clare',
          live: false,
          body: 'Near Shannon Airport and the Shannon Free Zone — a practical base for crews working the mid-west.',
        },
        {
          county: 'Wexford',
          live: false,
          body: 'Close to Rosslare Europort, with growing project activity as the offshore renewable energy hub develops.',
        },
        {
          county: 'Wicklow',
          live: false,
          body: 'The closest of the four to Dublin city — a straightforward base for anyone commuting in without living in Dublin.',
        },
      ],
    }),
    defineField({
      name: 'coverageNote',
      title: 'Footnote',
      type: 'text',
      rows: 2,
      group: 'coverage',
      initialValue:
        "Need a county that isn't live yet? Tell us where — we'll confirm what's available now or add you to the list as we grow there.",
    }),

    // ---- What's included ----
    sectionIdField('includedSectionId', 'included', 'included'),
    defineField({
      name: 'includedEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'included',
      initialValue: "What's included",
    }),
    defineField({
      name: 'includedHeading',
      title: 'Heading',
      type: 'string',
      group: 'included',
      initialValue: 'Move-in ready, managed for the whole stay.',
    }),
    defineField({
      name: 'includedFeatures',
      title: 'Features',
      type: 'array',
      group: 'included',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'includedFeature',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: (rule) => rule.required() }),
            iconField({ initialValue: 'sofa' }),
          ],
          preview: { select: { title: 'title', subtitle: 'icon' } },
        }),
      ],
      initialValue: [
        {
          title: 'Fully furnished',
          body: 'Beds made, kitchen equipped, living space set up for a crew rather than a single guest.',
          icon: 'sofa',
        },
        {
          title: 'Free WiFi in every stay',
          body: 'Connected from day one, so evenings and remote paperwork both work.',
          icon: 'wifi',
        },
        {
          title: 'One dedicated contact',
          body: 'The same person for questions, issues and extensions — for the length of the stay.',
          icon: 'headset',
        },
        {
          title: 'Confirmed before you commit',
          body: 'Amenities vary by property, so we confirm the specifics of your stay in writing first.',
          icon: 'clipboard-check',
        },
      ],
    }),

    // ---- Partner with us (property owners) ----
    sectionIdField('partnerSectionId', 'partner', 'partner'),
    // Copy + CTA are editable here; the property image grid itself is not
    // — it's a live query against propertyPage documents (see
    // CORPORATE_ONBOARDED_PROPERTIES_QUERY in web/src/sanity/queries.ts),
    // so it never goes stale as properties are added.
    defineField({
      name: 'partnerEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'partner',
      initialValue: 'For property owners',
    }),
    defineField({
      name: 'partnerHeading',
      title: 'Heading',
      type: 'string',
      group: 'partner',
      initialValue: 'Own a property along the corridor?',
    }),
    defineField({
      name: 'partnerBody',
      title: 'Body Copy',
      type: 'text',
      rows: 3,
      group: 'partner',
      initialValue:
        'Most self-managing hosts earn 20–35% less than they should. Hand it to us — commission-only, no setup fee — and see it managed properly alongside the crews we house.',
    }),
    defineField({
      name: 'partnerCtaLabel',
      title: 'CTA Button Label',
      type: 'string',
      group: 'partner',
      initialValue: 'Partner with us',
    }),
    defineField({
      name: 'partnerCtaUrl',
      title: 'CTA Button URL',
      type: 'string',
      group: 'partner',
      initialValue: '/landlords',
    }),

    // ---- FAQ ----
    sectionIdField('faqSectionId', 'faq', 'faq'),
    defineField({
      name: 'faqEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'faq',
      initialValue: 'Questions',
    }),
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
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
      initialValue: [
        {
          question: 'How do companies book accommodation for workers?',
          answer:
            "Send the brief through the form on this page — company name, number of people, target dates and which county you need to be in — and we'll come back with what's available and pricing. No account or lease to set up.",
        },
        {
          question: 'Can you book housing for multiple workers at once?',
          answer:
            "Yes. Tell us the headcount and we'll check what we can put together across our properties and landlord network — whether that's one larger property or a few units close together.",
        },
        {
          question: "What's included in a Sos Stays workforce booking?",
          answer:
            "Every stay is fully furnished with free WiFi, plus one point of contact for anything that comes up — questions, issues, or extending the dates. Exact amenities vary by property, so we'll confirm specifics before you commit.",
        },
        {
          question: 'Is serviced accommodation better than hotels for workers?',
          answer:
            'For anything longer than a week, generally yes — a furnished house or apartment gives a crew more space and one invoice instead of a room-by-room hotel bill. For a night or two, a hotel is still the simpler option.',
        },
      ],
    }),

    // ---- Closing CTA ----
    sectionIdField('closingSectionId', 'closing', 'closing'),
    defineField({
      name: 'closingHeading',
      title: 'Heading',
      type: 'string',
      group: 'closing',
      initialValue: 'Got a crew to house, or a county in mind?',
    }),
    defineField({
      name: 'closingBody',
      title: 'Body Copy',
      type: 'text',
      rows: 2,
      group: 'closing',
      initialValue:
        "Send the details — company, headcount, dates, and whether you need Louth, Clare, Wexford or Wicklow — and we'll come back with real options.",
    }),

    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    prepare: () => ({ title: 'Corporate Stays Page' }),
  },
})
