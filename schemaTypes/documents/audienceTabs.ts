import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts), same pattern as heroSection/hostsModule. Drives the
// "Who we work with" tabbed section on the landlord page: the eyebrow
// label and the four audience tabs' copy. Built for exactly 4 tabs — the
// coverage-map animation (which markers light up, which connector lines
// draw, whether the demand ring shows) is keyed to tab position in the
// frontend component, so that animation config isn't editorial content
// and isn't a field here.
export const audienceTabs = defineType({
  name: 'audienceTabs',
  title: 'Landlord Audience Tabs',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'users' }),
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'Who we work with',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      description:
        'Built for exactly 4 tabs, in order — the coverage map animation on each tab is wired to its position (1st, 2nd, 3rd, 4th) in the frontend.',
      validation: (rule) => rule.required().length(4),
      of: [
        {
          type: 'object',
          name: 'audienceTab',
          fields: [
            defineField({
              name: 'label',
              title: 'Tab Label',
              type: 'string',
              description: 'Shown on the pill button, e.g. "Homeowners"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body Copy',
              type: 'text',
              rows: 5,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'checklist',
              title: 'Checklist',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description:
                'Shown on pages that render this section with a photo instead of the animated coverage-map illustration (e.g. /about) — swaps in as its tab becomes active.',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'heading', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Landlord Audience Tabs' }),
  },
})
