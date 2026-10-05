import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'

// Keep this list in sync with the county names in
// web/src/lib/pricingCounties.ts (ROI_COUNTY_NAMES + NI_COUNTY_NAMES) —
// the frontend matches a stats doc to a county by exact name.
const COUNTY_NAMES = [
  'Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Dublin', 'Galway', 'Kerry',
  'Kildare', 'Kilkenny', 'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth',
  'Mayo', 'Meath', 'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary',
  'Waterford', 'Westmeath', 'Wexford', 'Wicklow',
  'Antrim', 'Armagh', 'Down', 'Fermanagh', 'Derry / Londonderry', 'Tyrone',
]

// Real, per-county performance data shown on /pricing/[county]'s "live"
// results page (see web/src/components/pricing/LiveCountyResult.tsx). One
// document per county — only counties with a document here (and `live`
// switched on) get the "live data" hero badge and real stats; every other
// county on the pricing page falls back to the honest "expanding" state.
// See the honesty-in-projections principle: never fabricate these numbers,
// the real example, or the FAQ answers.
export const countyPricingStats = defineType({
  name: 'countyPricingStats',
  title: 'County Pricing Stats',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'bar-chart' }),
  groups: [
    { name: 'stats', title: 'Market stats', default: true },
    { name: 'example', title: 'Real example' },
    { name: 'content', title: 'Drivers & FAQ' },
  ],
  fields: [
    defineField({
      name: 'county',
      title: 'County',
      type: 'string',
      description: 'Must exactly match a county name used on the pricing page.',
      options: { list: COUNTY_NAMES },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'live',
      title: 'Show as live on the pricing page',
      type: 'boolean',
      description:
        'Only turn this on once these figures reflect real managed properties in this county. Leave off to prepare a draft without it showing publicly — the county falls back to the "expanding" state until this is on.',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'adr',
      title: 'Local market ADR (€)',
      description: 'Average daily rate from comparable local listings (e.g. AirDNA).',
      type: 'number',
      group: 'stats',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'occupancy',
      title: 'Avg local comp-set occupancy (%)',
      type: 'number',
      group: 'stats',
      validation: (rule) => rule.required().min(0).max(100),
    }),
    defineField({
      name: 'annualRevenue',
      title: 'Avg annual revenue, comparable local listings (€)',
      type: 'number',
      group: 'stats',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'statsSourceNote',
      title: 'Stats source note',
      type: 'text',
      rows: 3,
      group: 'stats',
      description: 'Shown under the stat strip — explain where these market figures come from.',
      initialValue:
        "These figures are drawn from AirDNA market data and from real Sos Stays–managed properties' actual performance. We show this because it's real, not because every property will match it exactly — your own numbers depend on your property, condition and location within the county.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'realExample',
      title: 'Real example property',
      type: 'object',
      group: 'example',
      description:
        'A specific, real Sos Stays–managed property in this county, shown as an honest before/after occupancy comparison — never a hypothetical or composite property.',
      fields: [
        defineField({
          name: 'propertyName',
          title: 'Property name',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'propertyLocation',
          title: 'Location description',
          type: 'string',
          description: 'e.g. "near Dunleer"',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'beforeLabel',
          title: 'Before period label',
          type: 'string',
          description: "e.g. \"Aug '25\"",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'beforeOccupancy',
          title: 'Before occupancy (%)',
          type: 'number',
          validation: (rule) => rule.required().min(0).max(100),
        }),
        defineField({
          name: 'afterLabel',
          title: 'After period label',
          type: 'string',
          description: "e.g. \"Aug '26\"",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'afterOccupancy',
          title: 'After occupancy (%)',
          type: 'number',
          validation: (rule) => rule.required().min(0).max(100),
        }),
        defineField({
          name: 'note',
          title: 'Note',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'drivers',
      title: 'What drives pricing here',
      type: 'array',
      group: 'content',
      description: 'Short, county-specific factors — local demand drivers, events, access, etc.',
      of: [{ type: 'text', rows: 2 }],
    }),
    defineField({
      name: 'faqs',
      title: 'County hosting FAQ',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'faq',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'county', subtitle: 'live' },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? 'Live on pricing page' : 'Draft — not shown as live',
    }),
  },
})
