import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'

// Shared singleton (ID `countrySwitcher`) — one list used by every market's
// site, so the dropdown in the header nav is identical on sosstays.com and
// sosstays.in. Each entry links out to that country's own site; the entry
// whose market matches the site you're on is shown as the current selection.
export const countrySwitcher = defineType({
  name: 'countrySwitcher',
  title: 'Country Switcher',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'earth-globe' }),
  fields: [
    defineField({
      name: 'countries',
      title: 'Countries',
      description:
        'Shown in the header nav dropdown. The dropdown is hidden unless at least two countries are listed.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'country',
          fields: [
            defineField({
              name: 'label',
              title: 'Country Name',
              type: 'string',
              description: 'e.g. Ireland',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'code',
              title: 'Short Code',
              type: 'string',
              description: 'Shown on the nav button, e.g. IE or IN.',
              validation: (rule) => rule.required().max(3),
            }),
            defineField({
              name: 'market',
              title: 'Market',
              type: 'string',
              description: 'Which site this entry is — used to highlight the one the visitor is on.',
              options: {
                list: [
                  { title: 'Ireland', value: 'ie' },
                  { title: 'India', value: 'in' },
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Site URL',
              type: 'url',
              description: 'The country site to switch to, e.g. https://sosstays.in',
              validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Country Switcher' }),
  },
})
