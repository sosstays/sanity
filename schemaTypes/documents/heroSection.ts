import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts), same pattern as siteSettings. Drives the homepage
// hero (image, headline, copy, and the two CTA buttons).
export const heroSection = defineType({
  name: 'heroSection',
  title: 'Homepage Hero',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'image' }),
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text (renders as the page\'s H1)',
      type: 'string',
      description:
        'Small label above the headline, e.g. "Somewhere Out Somewhere" — this is the actual <h1> on the homepage, so keep it meaningful rather than purely decorative.',
    }),
    defineField({
      name: 'heading',
      title: 'Headline (renders as H2)',
      type: 'text',
      rows: 2,
      description: 'The main headline, shown below the H1 eyebrow. Line breaks are preserved, e.g. "Somewhere out.\\nSomewhere quiet."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Copy',
      type: 'text',
      rows: 3,
      description: 'Main supporting paragraph shown under the headline.',
    }),
    defineField({
      name: 'subBody',
      title: 'Secondary Copy',
      type: 'text',
      rows: 2,
      description: 'Smaller supporting line shown under the body copy.',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
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
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary Button Label',
      type: 'string',
      initialValue: 'Find your Somewhere',
    }),
    defineField({
      name: 'primaryCtaUrl',
      title: 'Primary Button URL',
      type: 'string',
      initialValue: '/stays',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary Button Label',
      type: 'string',
      initialValue: 'I have a property to manage',
    }),
    defineField({
      name: 'secondaryCtaUrl',
      title: 'Secondary Button URL',
      type: 'string',
      initialValue: '/landlords',
    }),
  ],
  preview: {
    select: { subtitle: 'heading', media: 'image' },
    prepare: ({ subtitle, media }) => ({ title: 'Homepage Hero', subtitle, media }),
  },
})
