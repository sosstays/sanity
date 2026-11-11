import { createElement } from 'react'
import { defineType, defineField, defineArrayMember } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'
import { PARTNER_CATEGORIES } from '../shared/partnerCategories'
import { sectionIdField } from '../shared/sectionIdField'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts), same pattern as aboutPage/corporateStaysPage.
// Drives the page copy on /partners (see web/src/app/partners/page.tsx):
// hero, intro, the two partner tiers, and the "who we're looking for"
// category list. The directory itself is NOT stored here — it's built
// from the separate, repeatable "partner" documents (see partner.ts),
// the same way the corporate-stays page pulls its onboarded-properties
// grid live from propertyPage rather than storing it on the singleton.
export const partnersPage = defineType({
  name: 'partnersPage',
  title: 'Partners Page',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'users' }),
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'intro', title: 'Intro' },
    { name: 'tiers', title: 'How we work with partners' },
    { name: 'whoWeWant', title: "Who we're looking for" },
    { name: 'spotlight', title: 'Spotlight image' },
    { name: 'directory', title: 'Directory' },
    { name: 'becomePartner', title: 'Become a partner' },
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
      initialValue: 'Partners',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Headline (H1)',
      type: 'string',
      group: 'hero',
      initialValue: "We're better with good people around us. Let's work together.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Subtext',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'Shown under the headline in the hero. Keep this distinct from Paragraph 1 below — that one repeats immediately underneath in the Intro section.',
      initialValue:
        'The cleaners, photographers, tour operators and local businesses who help us deliver more than just a bed for the night.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),

    // ---- Intro ----
    sectionIdField('introSectionId', 'intro', 'intro'),
    defineField({
      name: 'introParagraph1',
      title: 'Paragraph 1',
      type: 'text',
      rows: 3,
      group: 'intro',
      initialValue:
        'Every stay we manage is really a string of small local businesses working together — the cleaner who turns the room around, the photographer who makes it look like itself, the café down the road we send guests to, the operator who takes them out on the water the next morning.',
    }),
    defineField({
      name: 'introParagraph2',
      title: 'Paragraph 2',
      type: 'text',
      rows: 4,
      group: 'intro',
      initialValue:
        "We'd rather pay a local business for that than build it all in-house. It keeps the work local, it keeps the money local, and it means every guest gets the actual Irish welcome — not a version of it we invented in an office.",
    }),
    defineField({
      name: 'introParagraph3',
      title: 'Paragraph 3',
      type: 'text',
      rows: 3,
      group: 'intro',
      initialValue:
        "If that sounds like the kind of company you'd want turning up on your books, we'd like to hear from you.",
    }),

    // ---- How we work with partners ----
    sectionIdField('tiersSectionId', 'tiers', 'tiers'),
    defineField({
      name: 'tiersEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'tiers',
      initialValue: 'How we work with partners',
    }),
    defineField({
      name: 'tiersHeading',
      title: 'Heading',
      type: 'string',
      group: 'tiers',
      initialValue: 'Two tiers, not a logo wall',
    }),
    defineField({
      name: 'tiers',
      title: 'Tiers',
      type: 'array',
      group: 'tiers',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tier',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
      initialValue: [
        {
          title: 'Featured Partners',
          body: 'Businesses guests will actually book or visit as part of their stay (days out, tours, wellness, food experiences). These get a full profile page: your story, your offer, your photos, and a direct link from ours to yours.',
        },
        {
          title: 'Directory Partners',
          body: 'Everyone else on this list. A card with your name, what you do, a line on why we rate you, and a link straight to your site or booking page. Simple, but it puts you in front of every guest and every landlord who lands on this page.',
        },
      ],
    }),
    defineField({
      name: 'tiersNote',
      title: 'Closing Note',
      type: 'text',
      rows: 2,
      group: 'tiers',
      initialValue: "Either way, we're not interested in a logo wall. We only list businesses we'd actually recommend to a friend.",
    }),

    // ---- Who we're looking for ----
    sectionIdField('whoWeWantSectionId', 'whoWeWant', 'who-we-want'),
    defineField({
      name: 'whoWeWantEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'whoWeWant',
      initialValue: "Who we're looking for",
    }),
    defineField({
      name: 'whoWeWantHeading',
      title: 'Heading',
      type: 'string',
      group: 'whoWeWant',
      initialValue: 'Six kinds of good people',
    }),
    defineField({
      name: 'whoWeWantCategories',
      title: 'Categories',
      type: 'array',
      group: 'whoWeWant',
      description: 'Keep the category tag in sync with the matching option on each Partner document.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'whoWeWantCategory',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: (rule) => rule.required() }),
            defineField({
              name: 'tag',
              title: 'Matching Category Tag',
              type: 'string',
              options: { list: PARTNER_CATEGORIES },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
      initialValue: [
        {
          title: 'Cleaning companies & freelance cleaners',
          body: 'Turnover teams across Louth, Meath, Clare and Wexford.',
          tag: 'cleaning',
        },
        {
          title: 'Photographers',
          body: 'Property and lifestyle photography for listings.',
          tag: 'photography',
        },
        {
          title: 'Social & content creators',
          body: 'Influencers and creators who cover Irish travel, food, or property.',
          tag: 'social-content',
        },
        {
          title: 'Tour operators & experiences',
          body: 'Day tours, activities, anything a guest would book on top of their stay.',
          tag: 'tours-experiences',
        },
        {
          title: 'Food & drink producers',
          body: 'Local brands we can put in a welcome basket instead of a supermarket multipack.',
          tag: 'food-drink',
        },
        {
          title: 'Hospitality & days out',
          body: 'The likes of Funtasia and Tranquil Space — attractions, activities, and hospitality businesses near our stays.',
          tag: 'hospitality-days-out',
        },
      ],
    }),

    // ---- Spotlight image (full-bleed band between "who we want" and the directory) ----
    sectionIdField('spotlightSectionId', 'spotlight', 'spotlight'),
    defineField({
      name: 'spotlightHeading',
      title: 'Heading',
      type: 'string',
      group: 'spotlight',
      initialValue: 'The kind of local businesses already on the list',
    }),
    defineField({
      name: 'spotlightBody',
      title: 'Body Copy',
      type: 'text',
      rows: 3,
      group: 'spotlight',
      initialValue: "From family days out to the person who takes the photos that actually sell a stay — a look at who we're already working with.",
    }),
    defineField({
      name: 'spotlightImage',
      title: 'Image',
      type: 'image',
      group: 'spotlight',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),

    // ---- Directory ----
    sectionIdField('directorySectionId', 'directory', 'directory'),
    defineField({
      name: 'directoryEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'directory',
      initialValue: 'The directory',
    }),
    defineField({
      name: 'directoryHeading',
      title: 'Heading',
      type: 'string',
      group: 'directory',
      initialValue: 'Partner directory',
    }),

    // ---- Become a partner ----
    sectionIdField('becomePartnerSectionId', 'becomePartner', 'become-a-partner'),
    defineField({
      name: 'becomePartnerEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'becomePartner',
      initialValue: 'Become a partner',
    }),
    defineField({
      name: 'becomePartnerHeading',
      title: 'Heading',
      type: 'string',
      group: 'becomePartner',
      initialValue: 'Tell us about your business',
    }),
    defineField({
      name: 'becomePartnerIntro',
      title: 'Intro Copy',
      type: 'text',
      rows: 2,
      group: 'becomePartner',
      initialValue: "Tell us a bit about your business and we'll get back to you.",
    }),

    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    prepare: () => ({ title: 'Partners Page' }),
  },
})
