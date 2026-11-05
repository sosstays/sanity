import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'
import { PARTNER_CATEGORIES } from '../shared/partnerCategories'
import { marketField } from '../fields/market'

// Repeatable — one document per partner shown in the /partners
// directory (see web/src/app/partners/page.tsx). Not a singleton:
// there's one of these per business, unlike partnersPage itself.
// Featured partners additionally get a full profile at /partners/[slug]
// (web/src/app/partners/[slug]/page.tsx) using the fields in the
// "Profile page" group below.
export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'users' }),
  groups: [
    { name: 'card', title: 'Directory card', default: true },
    { name: 'profile', title: 'Profile page' },
  ],
  fields: [
    { ...marketField, group: 'card' },
    defineField({
      name: 'name',
      title: 'Business Name',
      type: 'string',
      group: 'card',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'card',
      description: 'Used for the Featured Partner profile URL, e.g. /partners/funtasia — unless "Profile Link Override" below points somewhere else. Required for Featured partners.',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'card',
      description: 'Short line under the name, e.g. "Family entertainment centre, Drogheda"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Card / Profile Image',
      type: 'image',
      group: 'card',
      description: 'Shown on the directory card and (for Featured Partners) at the top of their profile page. Falls back to a plain initial if left blank.',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'card',
      options: { list: PARTNER_CATEGORIES },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Card Description',
      type: 'text',
      rows: 3,
      group: 'card',
      description: 'One or two lines on why we recommend them — shown on the directory card.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Website / Booking Link',
      type: 'url',
      group: 'card',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Partner?',
      type: 'boolean',
      group: 'card',
      description: 'On = Featured Partner (full profile page, sorts to top of the directory). Off = Directory Partner (card only).',
      initialValue: false,
    }),
    defineField({
      name: 'profileHref',
      title: 'Profile Link Override',
      type: 'string',
      group: 'profile',
      description: 'If this partner already has a dedicated page elsewhere on the site (e.g. an SEO landing page like /hotels-near-funtasia), enter its path here. "Read more" links to this instead of the generic /partners/[slug] profile, and visiting /partners/[slug] directly redirects here.',
      hidden: ({ document }) => !document?.featured,
    }),
    defineField({
      name: 'profileIntro',
      title: 'Profile Intro Line',
      type: 'string',
      group: 'profile',
      description: 'Shown under the name on the profile page. Defaults to the tagline if left blank.',
      hidden: ({ document }) => !document?.featured || Boolean(document?.profileHref),
    }),
    defineField({
      name: 'profileBody',
      title: 'Profile Body',
      type: 'text',
      rows: 6,
      group: 'profile',
      description: 'The full write-up shown on the partner\'s own /partners/[slug] page. Defaults to the card description if left blank.',
      hidden: ({ document }) => !document?.featured || Boolean(document?.profileHref),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline', featured: 'featured' },
    prepare: ({ title, subtitle, featured }) => ({
      title,
      subtitle: featured ? `★ Featured — ${subtitle}` : subtitle,
    }),
  },
})
