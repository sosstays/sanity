import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'
import { sectionIdField } from '../shared/sectionIdField'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts), same pattern as heroSection/siteSettings. Drives
// the maroon "For property owners" section on the homepage: the intro
// copy + commission card, the three-step stepper (with its images), and
// the "earn more with multiple platforms" strip's heading/subtext. The
// platform logos themselves (Airbnb, Booking.com, etc.) are bespoke SVG
// components in the frontend, not editorial content, so they aren't
// fields here.
export const hostsModule = defineType({
  name: 'hostsModule',
  title: 'Homepage Hosts Module',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'users' }),
  groups: [
    { name: 'intro', title: 'Intro & pricing', default: true },
    { name: 'stepper', title: 'Stepper' },
    { name: 'marquee', title: 'Platforms strip' },
  ],
  fields: [
    sectionIdField('hostsSectionId', 'intro', 'hosts'),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      group: 'intro',
      initialValue: 'For property owners',
    }),
    defineField({
      name: 'heading',
      title: 'Headline',
      type: 'string',
      group: 'intro',
      initialValue: 'We sell the break, not just the booking',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Copy',
      type: 'text',
      rows: 4,
      group: 'intro',
      initialValue:
        'Sos Stays builds a guest-facing brand around your property — promoting Ireland and the local area, driving direct bookings, and turning one-off stays into repeat guests. Most Airbnb management companies simply list and wait. We market the break itself.',
    }),
    defineField({
      name: 'commissionRate',
      title: 'Commission Rate (%)',
      type: 'number',
      group: 'intro',
      initialValue: 15,
      validation: (rule) => rule.required().min(0).max(100),
    }),
    defineField({
      name: 'commissionLabel',
      title: 'Pricing Card Eyebrow',
      type: 'string',
      group: 'intro',
      initialValue: 'Commission-based pricing',
    }),
    defineField({
      name: 'commissionSuffix',
      title: 'Rate Suffix',
      type: 'string',
      group: 'intro',
      initialValue: 'of your rental revenue',
    }),
    defineField({
      name: 'commissionNote',
      title: 'Pricing Card Note',
      type: 'text',
      rows: 3,
      group: 'intro',
      initialValue:
        'Your exact commission depends on property type and location — coastal cottages, city apartments and multi-unit portfolios are priced differently.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      group: 'intro',
      initialValue: 'Get an estimate',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Button URL',
      type: 'string',
      group: 'intro',
      initialValue: '/landlords#calculator',
    }),
    defineField({
      name: 'stepperEyebrow',
      title: 'Stepper Eyebrow',
      type: 'string',
      group: 'stepper',
      initialValue: 'How it works',
    }),
    defineField({
      name: 'stepperHeading',
      title: 'Stepper Heading',
      type: 'string',
      group: 'stepper',
      initialValue: 'What we take care of, start to finish',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      group: 'stepper',
      description:
        'Built for exactly 3 steps — the tabs, connectors and grid are laid out for that count.',
      validation: (rule) => rule.required().length(3),
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'bullets',
              title: 'Bullets',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
              ],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    }),
    defineField({
      name: 'marqueeHeading',
      title: 'Platforms Strip Heading',
      type: 'string',
      group: 'marquee',
      initialValue: 'Earn more with multiple platforms',
    }),
    defineField({
      name: 'marqueeSubtext',
      title: 'Platforms Strip Subtext',
      type: 'string',
      group: 'marquee',
      initialValue: 'One calendar, synced across every channel your guests book on.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage Hosts Module' }),
  },
})
