import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'
import { iconField } from '../shared/iconField'
import { sectionIdField } from '../shared/sectionIdField'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts), same pattern as corporateStaysPage/aboutPage. Drives
// the whole /bespoke-ireland-trip page (see app/bespoke-ireland-trip/page.tsx):
// hero, the scroll-driven "We take care of every detail" photo stack,
// how-it-works steps, what-we-arrange bullets, featured houses, area guide
// links, sample itineraries, FAQ, and the enquiry-form lead-in copy. Every
// field has an `initialValue` matching the page's original hardcoded copy,
// so the first document created from this schema reproduces the live page
// rather than shipping it blank.
export const bespokeTripPage = defineType({
  name: 'bespokeTripPage',
  title: 'Bespoke Ireland Trip Page',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'heart' }),
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'details', title: 'Every Detail' },
    { name: 'how', title: 'How It Works' },
    { name: 'arrange', title: 'What We Arrange' },
    { name: 'houses', title: 'The Houses' },
    { name: 'areas', title: 'Areas' },
    { name: 'itineraries', title: 'Sample Itineraries' },
    { name: 'faq', title: 'FAQ' },
    { name: 'enquire', title: 'Enquire' },
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
      initialValue: 'Bespoke trips',
    }),
    defineField({
      name: 'heading',
      title: 'H1 Heading',
      type: 'string',
      group: 'hero',
      initialValue: 'Plan Your Bespoke Ireland Trip',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subhead',
      title: 'Subhead',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue:
        "Our houses, your itinerary, one point of contact — whether it's the Ryder Cup, a wedding, Paddy's weekend or a family holiday.",
    }),
    defineField({
      name: 'heroParagraph',
      title: 'Hero Paragraph',
      type: 'text',
      rows: 4,
      group: 'hero',
      initialValue:
        "You didn't come all this way to juggle bookings. Tell us what your family loves — golf, coast, castles, quiet countryside — and we'll build the trip around it, using our own houses across Ireland and a local's knowledge of what's actually worth the drive.",
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (rule) => rule.required() })],
    }),

    // ---- We take care of every detail (scroll-converge photo stack) ----
    sectionIdField('detailsSectionId', 'details', 'details'),
    defineField({
      name: 'detailsEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'details',
      initialValue: 'What we handle',
    }),
    defineField({
      name: 'detailsHeading',
      title: 'Heading',
      type: 'string',
      group: 'details',
      initialValue: 'We Take Care of Every',
    }),
    defineField({
      name: 'detailsHeadingAccent',
      title: 'Heading accent word',
      type: 'string',
      description: 'Rendered in the maroon accent color right after the heading above.',
      group: 'details',
      initialValue: 'Detail',
    }),
    defineField({
      name: 'detailItems',
      title: 'Detail Cards',
      type: 'array',
      group: 'details',
      description: 'Exactly 6 cards for the scroll-converge layout — label, icon and a real photo for each.',
      validation: (rule) => rule.max(6).min(6),
      of: [
        {
          type: 'object',
          name: 'detailItem',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
            iconField({ initialValue: 'plane' }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
              fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (rule) => rule.required() }),
              ],
            }),
          ],
          preview: { select: { title: 'label', media: 'image' } },
        },
      ],
      initialValue: [
        { _key: 'airport', label: 'Airport pick-up', icon: 'plane' },
        { _key: 'accommodation', label: 'Local accommodation', icon: 'home' },
        { _key: 'sightseeing', label: 'Sightseeing trips', icon: 'camera' },
        { _key: 'golf', label: 'Golf tee bookings', icon: 'flag' },
        { _key: 'tours', label: 'Tour packages', icon: 'compass' },
        { _key: 'transfers', label: 'Local transfers', icon: 'car' },
      ],
    }),

    // ---- How it works ----
    sectionIdField('howSectionId', 'how', 'how'),
    defineField({
      name: 'howItWorksHeading',
      title: 'Heading',
      type: 'string',
      group: 'how',
      initialValue: 'How it works',
    }),
    defineField({
      name: 'howItWorksSteps',
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
          title: 'Tell us',
          text: "Your ideal month, group size, and what everyone's into — whether you're here for an event or just a break.",
        },
        {
          _key: 'wePlan',
          title: 'We plan',
          text: 'Accommodation across our houses, transport, tee times, family days and dinner reservations. One itinerary, one price.',
        },
        {
          _key: 'youArrive',
          title: 'You arrive',
          text: "We handle the rest, and we're on the ground if anything changes.",
        },
      ],
    }),

    // ---- What we arrange ----
    sectionIdField('arrangeSectionId', 'arrange', 'arrange'),
    defineField({
      name: 'whatWeArrangeHeading',
      title: 'Heading',
      type: 'string',
      group: 'arrange',
      initialValue: 'What we arrange',
    }),
    defineField({
      name: 'whatWeArrangeItems',
      title: 'Bullet Items',
      type: 'array',
      group: 'arrange',
      of: [{ type: 'string' }],
      initialValue: [
        "Accommodation in our Irish houses — Howard's Way on the Clare coast, Rathescar Grove in the Boyne Valley, and more",
        'Event and transport planning — getting to the Ryder Cup, a wedding venue or a match day without the stress',
        'Tee times at Lahinch, Trump Doonbeg and the west-of-Ireland links',
        'Family days out: Cliffs of Moher, Aran Islands, the Burren, castles, Galway',
        'Dinner reservations and local recommendations',
        'One point of contact for the whole trip',
      ],
    }),

    // ---- The houses ----
    sectionIdField('housesSectionId', 'houses', 'houses'),
    defineField({
      name: 'housesHeading',
      title: 'Heading',
      type: 'string',
      group: 'houses',
      initialValue: 'The houses',
    }),
    defineField({
      name: 'houses',
      title: 'Houses',
      type: 'array',
      group: 'houses',
      description: 'Reuses each property\'s own name/location/photos — edit those on the property page itself.',
      of: [{ type: 'reference', to: [{ type: 'propertyPage' }] }],
    }),
    defineField({
      name: 'housesFooterNote',
      title: 'Footer Note',
      type: 'string',
      group: 'houses',
      initialValue: 'More across Ireland — ask us.',
    }),

    // ---- Explore Ireland by area ----
    sectionIdField('areasSectionId', 'areas', 'areas'),
    defineField({
      name: 'areasEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'areas',
      initialValue: 'Plan your route',
    }),
    defineField({
      name: 'areasHeading',
      title: 'Heading',
      type: 'string',
      group: 'areas',
      initialValue: 'Explore Ireland by area',
    }),
    defineField({
      name: 'areaGuides',
      title: 'Area Guides',
      type: 'array',
      group: 'areas',
      description: 'Reuses each area guide\'s own name/photo — edit those on the area guide itself.',
      of: [{ type: 'reference', to: [{ type: 'areaGuide' }] }],
    }),
    defineField({
      name: 'moreAreasLabel',
      title: '"More areas" Card Title',
      type: 'string',
      group: 'areas',
      initialValue: 'More areas across Ireland',
    }),
    defineField({
      name: 'moreAreasDescription',
      title: '"More areas" Card Description',
      type: 'string',
      group: 'areas',
      initialValue: 'See every area guide on the site.',
    }),

    // ---- Sample itineraries ----
    sectionIdField('itinerariesSectionId', 'itineraries', 'itineraries'),
    defineField({
      name: 'itinerariesHeading',
      title: 'Heading',
      type: 'string',
      group: 'itineraries',
      initialValue: 'Sample itineraries',
    }),
    defineField({
      name: 'itineraries',
      title: 'Itineraries',
      type: 'array',
      group: 'itineraries',
      of: [
        {
          type: 'object',
          name: 'itinerary',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      initialValue: [
        {
          _key: 'ryderCup',
          title: 'Ryder Cup week (13–19 Sept 2027)',
          text: "Base at Howard's Way on the Clare coast; park-and-ride or train to Adare on match days; practice days for the Cliffs of Moher and a Lahinch links round; family days on the Aran Islands and the Burren.",
        },
        {
          _key: 'wedding',
          title: 'A wedding or family event',
          text: 'Base near your venue, and we plan the around-days — where to stay, how to get there, and what to do with the kids before and after.',
        },
        {
          _key: 'golfFamily',
          title: 'Two weeks: golf + family',
          text: 'Week one on the Clare coast — Lahinch and Trump Doonbeg tee times, the Cliffs, Doolin. Week two in the Boyne Valley — Newgrange, a Dublin day trip, and Funtasia for the kids.',
        },
        {
          _key: 'noGolf',
          title: 'The no-golf family route',
          text: 'Boyne Valley first (Newgrange, Funtasia Waterpark, Hill of Slane), then the Clare coast (Cliffs of Moher, Lahinch beach, Aran Islands).',
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
          _key: 'kindsOfTrips',
          question: 'What kind of trips do you plan?',
          answer:
            "Any trip to Ireland — golf breaks, family holidays, weddings and events, Paddy's weekend, work trips and the Ryder Cup 2027. If you're coming for an event, we plan the around-days too.",
        },
        {
          _key: 'howFarAhead',
          question: 'How far in advance should I book?',
          answer:
            'For major events like the Ryder Cup, as early as possible — accommodation near Adare Manor sells out months ahead. For a general Ireland trip, three to six months ahead is ideal for peak summer dates.',
        },
        {
          _key: 'whatsIncluded',
          question: 'What does the bespoke plan include?',
          answer:
            'Accommodation in our own Irish houses, plus the itinerary and bookings we arrange for you — transport and event planning, tee times and family days out. Flights, event tickets and some activities are arranged separately.',
        },
        {
          _key: 'noGolfQuestion',
          question: 'Can you plan a trip if nobody in the group plays golf?',
          answer:
            "Yes. The concierge service is for any family or group trip to Ireland — coast, history, castles, food and the kids' days out. Golf is optional.",
        },
        {
          _key: 'minimumGroup',
          question: 'Do you have a minimum group size or stay?',
          answer:
            "We tailor trips to your group, from a single family to a golf group or two families travelling together. Minimum stays vary by property and season — send us your dates and we'll confirm.",
        },
        {
          _key: 'getStarted',
          question: 'How do we get started?',
          answer:
            "Email hello@sosstays.com or use the form below with your ideal month, group size and what everyone wants to do. We'll come back with a plan and a price.",
        },
      ],
    }),

    // ---- Enquire ----
    sectionIdField('enquireSectionId', 'enquire', 'enquire'),
    defineField({
      name: 'enquireHeading',
      title: 'Heading',
      type: 'string',
      group: 'enquire',
      initialValue: 'Start the conversation',
    }),
    defineField({
      name: 'enquireText',
      title: 'Lead-in Text',
      type: 'text',
      rows: 2,
      group: 'enquire',
      initialValue: "Tell us about your trip and we'll come back with a plan and a price.",
    }),

    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    prepare: () => ({ title: 'Bespoke Ireland Trip Page' }),
  },
})
