import { createElement } from 'react'
import { defineType, defineField, defineArrayMember } from 'sanity'
import { Icon } from '@sanity/icons'

const navLinkField = defineArrayMember({
  type: 'object',
  name: 'navLink',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Relative path (e.g. /pricing) or full URL.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts). Drives the header nav shown by <HeroNav> across the
// whole site. Two versions because guest-facing pages (home, stays, areas,
// blog, etc.) and landlord-facing pages (/landlords, /pricing) show
// entirely different links. A bare hash (e.g. "#faq") is resolved relative
// to each version's own "home" page (guest → "/", landlord → "/landlords")
// and automatically prefixed when shown on another page in that version.
export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'bars-4' }),
  fields: [
    defineField({
      name: 'guestNavLinks',
      title: 'Guest-facing Nav Links',
      description: 'Shown in the header on every guest-facing page (home, stays, areas, blog, etc.).',
      type: 'array',
      of: [navLinkField],
    }),
    defineField({
      name: 'landlordNavLinks',
      title: 'Landlord-facing Nav Links',
      description: 'Shown in the header on landlord-facing pages (/landlords, /pricing).',
      type: 'array',
      of: [navLinkField],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Navigation' }),
  },
})
