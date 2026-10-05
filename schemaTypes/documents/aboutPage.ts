import { createElement } from 'react'
import { defineType, defineField, defineArrayMember } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'
import { iconField } from '../shared/iconField'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts), same pattern as corporateStaysPage/heroSection.
// Drives the whole /about page (see web/src/app/about/page.tsx): hero,
// intro, what-we-do, where-we-operate, featured stays, the team,
// work-with-us, the two collapsed "legal" accordions, and the FAQ.
// Every field has an `initialValue` matching the page's original copy
// (the "About Sos Stays — DRAFT for review" doc), so the first document
// created from this schema reproduces the live page rather than
// shipping it blank. Several bios below are intentionally left with
// bracketed placeholder text (e.g. "[fill in]") — that's the draft
// content itself, not a schema bug; an editor replaces it in Studio
// once the real details are confirmed.
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'heart' }),
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'intro', title: 'Intro' },
    { name: 'whatWeDo', title: 'Who we work with' },
    { name: 'coverage', title: 'Where we operate' },
    { name: 'stays', title: 'The stays' },
    { name: 'team', title: 'Meet the team' },
    { name: 'workWithUs', title: 'Work with us' },
    { name: 'ownership', title: 'Who owns us' },
    { name: 'reachUs', title: 'How to reach us' },
    { name: 'faq', title: 'FAQ' },
    { name: 'seo', title: 'SEO / AEO' },
  ],
  fields: [
    // ---- Hero ----
    defineField({
      name: 'heroBadge',
      title: 'Badge Text',
      type: 'string',
      group: 'hero',
      initialValue: 'About us',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Headline (H1)',
      type: 'string',
      group: 'hero',
      initialValue: "We're Sos Stays. We sell the break, not just the booking.",
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
        "Property management and direct bookings, run by a small team who actually knows every house on the books.",
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
    defineField({
      name: 'introParagraph1',
      title: 'Paragraph 1',
      type: 'text',
      rows: 3,
      group: 'intro',
      initialValue:
        "Sós is the Irish word for a break. That's the whole idea, really — we named the company after the thing we're actually selling.",
    }),
    defineField({
      name: 'introParagraph2',
      title: 'Paragraph 2',
      type: 'text',
      rows: 4,
      group: 'intro',
      initialValue:
        "Sos Stays is the trading name of Power Rangers Ltd, an Irish company (CRO 746631) based in Drogheda, Co. Louth — but we're not a Louth company that happens to manage a few extra places. We manage short-term rentals for landlords and take direct bookings for guests right across Ireland, from the Boyne Valley to the Cliffs of Moher.",
    }),
    defineField({
      name: 'introParagraph3',
      title: 'Paragraph 3',
      type: 'text',
      rows: 4,
      group: 'intro',
      initialValue:
        "Most Airbnb management companies list a property and wait for the phone to ring. We do the opposite: we market the place and the area, write the guides people actually search for, chase direct bookings so owners keep more of what they earn, and build a guest experience good enough that people come back without needing an algorithm to remind them.",
    }),

    // ---- Who we work with ----
    // Renders as the same tabbed component used on /landlords (see
    // web/src/components/AudienceTabs.tsx), but with this page's own
    // three service lines rather than the landlord page's four audience
    // segments — each item's title doubles as both the tab label and its
    // heading, since there's no separate section heading in that layout.
    defineField({
      name: 'whatWeDoEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'whatWeDo',
      initialValue: 'What we do',
    }),
    defineField({
      name: 'whatWeDoItems',
      title: 'Items',
      type: 'array',
      group: 'whatWeDo',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'whatWeDoItem',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required() }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Shown alongside this item when its tab is active. Falls back to a shared default photo if left blank.',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
            }),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        }),
      ],
      initialValue: [
        {
          title: 'Guest stays',
          body: 'Self-catering houses and a guest house you can book direct, without paying the Airbnb premium.',
        },
        {
          title: 'Landlord management',
          body: 'Listings, pricing, guest messaging, cleaning coordination and owner statements, sorted. Commission-only, from 15% of rental revenue. No setup fee, no retainer, no booking, no fee.',
        },
        {
          title: 'Corporate & contractor stays',
          body: 'Weekly and monthly furnished houses, one invoice, no fuss.',
        },
      ],
    }),

    // ---- Where we operate ----
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
      initialValue: 'Home ground, not the only ground',
    }),
    defineField({
      name: 'coverageBody',
      title: 'Body Copy',
      type: 'text',
      rows: 5,
      group: 'coverage',
      initialValue:
        'Louth, Meath, the Boyne Valley and the Mournes are home ground — it\'s where we started and where most of our team is based. But "home ground" isn\'t the same as "only ground": we\'ve got stays live in Liscannor on the Clare coast and out in Ferns, Co. Wexford, and corporate stays run the east coast corridor including Wicklow. If you own a place worth a proper look, we\'re interested — wherever in Ireland it is.',
    }),
    defineField({
      name: 'coverageImage',
      title: 'Background Image',
      type: 'image',
      group: 'coverage',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'regions',
      title: 'Regions',
      type: 'array',
      group: 'coverage',
      description: 'Keep this honest — describe real coverage rather than invented stats.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'region',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'status', title: 'Status', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'muted',
              title: 'Muted style?',
              type: 'boolean',
              description: 'On = shown in the lighter/expanding style. Off = full-strength "home ground" style.',
              initialValue: false,
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'status' } },
        }),
      ],
      initialValue: [
        { name: 'Louth & Meath', status: 'Home ground', muted: false },
        { name: 'Co. Clare', status: 'Live stay — Liscannor', muted: false },
        { name: 'Co. Wexford', status: 'Live stay — Ferns', muted: false },
        { name: 'Wicklow & the east coast', status: 'Corporate stays', muted: true },
      ],
    }),

    // ---- The stays ----
    defineField({
      name: 'staysHeading',
      title: 'Heading',
      type: 'string',
      group: 'stays',
      initialValue: 'The stays',
    }),
    defineField({
      name: 'featuredStays',
      title: 'Featured Stays',
      type: 'array',
      group: 'stays',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'featuredStay',
          fields: [
            defineField({ name: 'name', title: 'Property Name', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Path to the property page, e.g. /stays/howards-way-liscannor',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'e.g. "Liscannor, Co. Clare"',
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (rule) => rule.required() }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'location', media: 'image' } },
        }),
      ],
      initialValue: [
        {
          name: "Howard's Way",
          href: '/stays/howards-way-liscannor',
          location: 'Liscannor, Co. Clare',
          description: 'A 4-bed house above Liscannor Bay, sleeps 8, five minutes from the Cliffs of Moher.',
        },
        {
          name: 'Rathescar Grove Guest House',
          href: '/stays/rathescar-grove-guest-house',
          location: 'Ardee, Co. Louth',
          description: 'A guest house outside Ardee, your base for the Boyne Valley.',
        },
        {
          name: 'Tinneshrule Farm Lodge',
          href: '/stays/tinneshrule-farm-lodge',
          location: 'Ferns, Co. Wexford',
          description: 'A working-farm studio in Ferns. No TV, strong WiFi, does what it says on the tin.',
        },
      ],
    }),

    // ---- Meet the team ----
    defineField({
      name: 'teamEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'team',
      initialValue: 'Meet the team',
    }),
    defineField({
      name: 'teamHeading',
      title: 'Heading',
      type: 'string',
      group: 'team',
      initialValue: 'Meet the team',
    }),
    defineField({
      name: 'teamIntro',
      title: 'Intro Copy',
      type: 'text',
      rows: 2,
      group: 'team',
      initialValue:
        'We kept the job titles a bit Irish — see the plain version in brackets on each card if the Irish doesn\'t land.',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      group: 'team',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'teamMember',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'title',
              title: 'Designation (Irish)',
              type: 'string',
              description: 'e.g. "Chief Fáilte Officer"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'plainTitle',
              title: 'Plain Title',
              type: 'string',
              description: 'e.g. "Co-Founder, Marketing & Guest Experience" — shown in brackets under the Irish title.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'highlights',
              title: 'Highlights',
              type: 'array',
              description:
                'The "more info" shown when this card is expanded — an icon plus one short sentence per fact. 3–4 reads best.',
              validation: (rule) => rule.min(2).max(5),
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'founderHighlight',
                  fields: [
                    iconField({ initialValue: 'sparkles' }),
                    defineField({
                      name: 'text',
                      title: 'Sentence',
                      type: 'string',
                      description: 'One short, concrete sentence — not a fragment.',
                      validation: (rule) => rule.required().max(140),
                    }),
                  ],
                  preview: { select: { title: 'text', subtitle: 'icon' } },
                }),
              ],
            }),
            defineField({
              name: 'photo',
              title: 'Photo (cutout)',
              type: 'image',
              description:
                'A transparent-background PNG cutout, not a framed headshot — it renders bottom-aligned inside the card with no crop box of its own. Recommended size: 560×760px (a 7:9.5 portrait aspect), cropped tightly to the subject with headroom at the top, since the bottom edge sits flush with the card. Placeholder initials show until this is added.',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'title', media: 'photo' } },
        }),
      ],
      initialValue: [
        {
          name: 'Andrine Mendez',
          title: 'Chief Fáilte Officer',
          plainTitle: 'Co-Founder, Marketing & Guest Experience',
          highlights: [
            { icon: 'megaphone', text: '15+ years in demand generation for tech companies before co-founding Sos Stays.' },
            { icon: 'graduation-cap', text: 'MBS in Marketing & Entrepreneurship from DKIT.' },
            { icon: 'code', text: 'Built the CRM the whole team runs on.' },
            { icon: 'message-circle', text: 'Owns the brand, the website, and partnerships like Funtasia.' },
          ],
        },
        {
          name: 'Akhil Edathara Asokan',
          title: 'Chief Airgead Officer',
          plainTitle: 'Co-Founder, Sales, Operations & Finance',
          highlights: [
            { icon: 'circle-help', text: '[Background — fill in.]' },
            { icon: 'calculator', text: 'Handles the landlord side end to end — the pitch, the numbers, the paperwork.' },
            { icon: 'house', text: 'Makes sure owners actually get paid on time. A healthy respect for a good spreadsheet, and an even better host.' },
          ],
        },
        {
          name: 'Keena Duffy',
          title: 'Chief Saoiste Officer',
          plainTitle: 'Co-Founder -Operations, Sales & Business Development',
          highlights: [
            { icon: 'briefcase', text: 'Four years managing stores and sales teams at Vodafone.' },
            { icon: 'graduation-cap', text: 'Degree in Irish & Human Development, postgrad in real estate.' },
            { icon: 'map', text: 'On the road onboarding properties and meeting landlords across the country.' },
            { icon: 'clipboard-check', text: 'Keeps guest comms, cleaning schedules and stock sorted, wherever she is.' },
          ],
        },
      ],
    }),

    // ---- Work with us ----
    defineField({
      name: 'workWithUsEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'workWithUs',
      initialValue: 'Work with us',
    }),
    defineField({
      name: 'workWithUsHeading',
      title: 'Heading',
      type: 'string',
      group: 'workWithUs',
      initialValue: 'Work with us',
    }),
    defineField({
      name: 'workWithUsIntro',
      title: 'Intro Copy',
      type: 'text',
      rows: 2,
      group: 'workWithUs',
      initialValue:
        "We're not looking to build a big office. We're looking for good people and good businesses already great at one thing, in the places we operate.",
    }),
    defineField({
      name: 'workWithUsCategories',
      title: 'Categories',
      type: 'array',
      group: 'workWithUs',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'workCategory',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
      initialValue: [
        {
          title: 'Cleaning & turnover teams',
          body: 'If you run a cleaning business (or you\'re a solo cleaner who takes pride in the work) around Louth, Meath, Clare or Wexford, we\'d like to hear from you. Reliable, flexible, and happy to work off a proper checklist rather than "just wing it."',
        },
        {
          title: 'Freelancers & contractors',
          body: 'Photographers, maintenance and handyman contractors, and anyone else who keeps a property in good nick. Bring your own tools and your own rates; we bring you consistent work across our managed properties.',
        },
        {
          title: 'Partners',
          body: 'We also team up with local businesses to make a stay better than just a bed for the night — the likes of Funtasia and Tranquil Space, among others. If that sounds like your business, get in touch about a partnership.',
        },
      ],
    }),
    defineField({
      name: 'workWithUsContactLine',
      title: 'Contact Line',
      type: 'string',
      group: 'workWithUs',
      initialValue: 'Send a line about what you do and where you\'re based to hello@sosstays.com — no CV required, just tell us straight.',
    }),

    // ---- Who owns us (collapsed accordion) ----
    defineField({
      name: 'ownershipHeading',
      title: 'Heading',
      type: 'string',
      group: 'ownership',
      initialValue: 'Who owns Sos Stays',
    }),
    defineField({
      name: 'ownershipBody',
      title: 'Body Copy',
      type: 'text',
      rows: 4,
      group: 'ownership',
      initialValue:
        'Power Rangers Ltd, trading as Sos Stays. Registered in Ireland, CRO 746631. Registered office: The Mill Enterprise Centre, Drogheda, Co. Louth, Ireland.',
    }),
    defineField({
      name: 'ownershipCroLinkLabel',
      title: 'CRO Link Label',
      type: 'string',
      group: 'ownership',
      initialValue: 'Companies Registration Office',
    }),
    defineField({
      name: 'ownershipCroLinkUrl',
      title: 'CRO Link URL',
      type: 'string',
      group: 'ownership',
      initialValue: 'https://www.cro.ie/',
    }),

    // ---- How to reach us (collapsed accordion) ----
    defineField({
      name: 'reachUsHeading',
      title: 'Heading',
      type: 'string',
      group: 'reachUs',
      initialValue: 'How to reach us',
    }),
    defineField({
      name: 'reachUsEmail',
      title: 'Email',
      type: 'string',
      group: 'reachUs',
      initialValue: 'hello@sosstays.com',
    }),
    defineField({
      name: 'reachUsWhatsapp',
      title: 'WhatsApp Number (display)',
      type: 'string',
      group: 'reachUs',
      initialValue: '+353 89 480 1345',
    }),
    defineField({
      name: 'reachUsWhatsappUrl',
      title: 'WhatsApp Link',
      type: 'string',
      group: 'reachUs',
      initialValue: 'https://wa.me/353894801345',
    }),
    defineField({
      name: 'reachUsInstagramHandle',
      title: 'Instagram Handle (display)',
      type: 'string',
      group: 'reachUs',
      initialValue: '@sos_stays',
    }),
    defineField({
      name: 'reachUsInstagramUrl',
      title: 'Instagram Link',
      type: 'string',
      group: 'reachUs',
      initialValue: 'https://www.instagram.com/sos_stays/',
    }),

    // ---- FAQ ----
    defineField({
      name: 'faqHeading',
      title: 'Heading',
      type: 'string',
      group: 'faq',
      initialValue: 'FAQ',
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
          question: 'What is Sos Stays?',
          answer:
            'An Irish property management company. We look after holiday homes and Airbnbs for landlords, and we book stays direct for guests.',
        },
        {
          question: 'Where does Sos Stays operate?',
          answer:
            'Nationally — home ground is Louth, Meath and the Mournes, with live stays in Clare and Wexford and corporate stays along the east coast.',
        },
        {
          question: 'Who owns Sos Stays?',
          answer: 'Power Rangers Ltd (CRO 746631), trading as Sos Stays.',
        },
        {
          question: 'Is Sos Stays a registered Irish company?',
          answer:
            'Yes. Power Rangers Ltd is registered in Ireland. CRO 746631. Office: The Mill Enterprise Centre, Drogheda, Co. Louth.',
        },
        {
          question: 'How much does Sos Stays charge landlords?',
          answer: 'Commission-only, from 15% of rental revenue. No setup fee, no monthly retainer.',
        },
      ],
    }),

    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
