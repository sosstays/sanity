import { createElement } from 'react'
import { defineType, defineField, defineArrayMember } from 'sanity'
import { Icon } from '@sanity/icons'

// Singleton document — one instance only, managed via Studio Structure
// (see structure.ts). Drives the site-wide footer content (tagline,
// nav columns, copyright). Social links live on siteSettings and are
// fetched separately.
export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'bars-4' }),
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Sos is the Irish word for a break.',
      description: 'Short line shown under the logo.',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      description: 'Nav link columns shown across the footer, in order.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'footerLink',
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
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title', links: 'links' },
            prepare: ({ title, links }) => ({
              title,
              subtitle: `${links?.length ?? 0} link${links?.length === 1 ? '' : 's'}`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description:
        'Optional override for the bottom copyright line. Use {year} for the current year. Defaults to "© {year} Sos Stays. All rights reserved."',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Footer' }),
  },
})
