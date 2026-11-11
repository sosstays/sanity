import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'
import { sectionIdField } from '../shared/sectionIdField'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts), same pattern as siteSettings. Drives the homepage
// hero (image, headline, copy, and the two CTA buttons).
//
// Also holds the "Section ID (anchor)" fields for the homepage sections
// that have no CMS document of their own (landlord banner, area
// spotlight, Instagram feed, blog, landlord CTA, bespoke trip CTA) — see
// web/src/app/page.tsx. The promo grid and hosts module carry their own
// (promoGrid.ts / hostsModule.ts). The featured-stays section's id is
// deliberately NOT editable: "/#stays" is linked from the nav CTA and
// footer on every page.
export const heroSection = defineType({
  name: 'heroSection',
  title: 'Homepage Hero',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'image' }),
  fieldsets: [
    {
      name: 'anchors',
      title: 'Homepage section anchors',
      description:
        'Optional #anchor ids for the homepage sections, for links/buttons that jump to them. Leave blank to keep the defaults.',
      options: { collapsible: true, collapsed: true },
    },
  ],
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
    sectionIdField('heroSectionId', undefined, 'hero', { title: 'Hero — Section ID (anchor)', fieldset: 'anchors' }),
    sectionIdField('landlordBannerSectionId', undefined, 'owners-banner', {
      title: 'Landlord banner (strip under the hero) — Section ID (anchor)',
      fieldset: 'anchors',
    }),
    sectionIdField('areasSectionId', undefined, 'areas', { title: 'Area spotlight — Section ID (anchor)', fieldset: 'anchors' }),
    sectionIdField('instagramSectionId', undefined, 'instagram', { title: 'Instagram feed — Section ID (anchor)', fieldset: 'anchors' }),
    sectionIdField('blogSectionId', undefined, 'blog', { title: 'Blog — Section ID (anchor)', fieldset: 'anchors' }),
    sectionIdField('landlordsSectionId', undefined, 'landlords', {
      title: 'Landlord CTA ("Already self-managing your Airbnb?") — Section ID (anchor)',
      fieldset: 'anchors',
    }),
    sectionIdField('bespokeTripSectionId', undefined, 'bespoke-trip', { title: 'Bespoke trip CTA — Section ID (anchor)', fieldset: 'anchors' }),
  ],
  preview: {
    select: { subtitle: 'heading', media: 'image' },
    prepare: ({ subtitle, media }) => ({ title: 'Homepage Hero', subtitle, media }),
  },
})
