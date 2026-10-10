import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'

// Singleton document — one per market (`promoGrid-ie`, `promoGrid-in`),
// managed via Studio Structure (see structure.ts / markets.ts). Drives the
// promotions grid directly below the homepage hero.
//
// A section title and a short note (shown to its right) sit above the grid.
// The grid has five fixed slots, so the order of the promos matters:
//   1     large tile (top left)
//   2, 3  right-hand column: 2 is the short tile on top, 3 the tall one below
//   4, 5  bottom row, under the large tile
// Slots without a promo show as grey "more on the way" placeholders. Each
// promo is only an image, a title and a subtitle — plus an optional link
// that turns the whole tile into a clickable card.
export const promoGrid = defineType({
  name: 'promoGrid',
  title: 'Homepage Promo Grid',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'th-large' }),
  fields: [
    defineField({
      name: 'heading',
      title: 'Section title',
      type: 'string',
      initialValue: 'Latest offers',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Text beside the title',
      type: 'string',
      description: 'Short line shown to the right of the title, e.g. "More promos on the way".',
      initialValue: 'More promos on the way',
    }),
    defineField({
      name: 'promos',
      title: 'Promotions',
      type: 'array',
      description:
        'Up to five promos. Order = position: 1 is the large tile, 2 is the short tile top right, 3 is the tall tile below it, 4–5 sit in the bottom row. Any empty slots show as grey placeholders. Drag to reorder.',
      validation: (rule) => rule.required().min(1).max(5),
      of: [
        defineField({
          name: 'promo',
          title: 'Promo',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                  description: 'Describe the image for screen readers.',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required().max(50),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              validation: (rule) => rule.max(80),
            }),
            defineField({
              name: 'link',
              title: 'Link (optional)',
              type: 'string',
              description:
                'Where the tile goes when clicked — a site path like "/stays" or a full URL like "https://…". Leave empty for a non-clickable tile.',
              validation: (rule) =>
                rule.custom((value) =>
                  !value || /^(\/|https?:\/\/)/.test(value)
                    ? true
                    : 'Must start with "/" or "https://"'
                ),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'subtitle', media: 'image', link: 'link' },
            prepare: ({ title, subtitle, media, link }) => ({
              title,
              subtitle: [subtitle, link && `→ ${link}`].filter(Boolean).join('  '),
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage Promo Grid' }),
  },
})
