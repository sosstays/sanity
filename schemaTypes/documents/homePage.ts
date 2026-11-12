import { createElement } from 'react'
import { defineType, defineField, defineArrayMember } from 'sanity'
import { Icon } from '@sanity/icons'

// Singleton document — one per market (`homePage-ie`, `homePage-in`),
// managed via Studio Structure (see structure.ts / markets.ts). Holds the
// homepage pieces that have no document of their own:
//
//   Search prompts       — the lines the hero's search bar "types" by
//                          itself, each mapped to a search location.
//   Bottom menu          — the floating menu fixed to the bottom of the
//                          homepage (the header itself is only the logo
//                          and one button).
//   Partner initiatives  — the tiles under the big logo after the footer.
//                          These are NOT the Partners directory entries
//                          (see partner.ts) — they're their own list.
//
// The hero copy/image, promo grid and hosts module keep their own
// documents (heroSection.ts, promoGrid.ts, hostsModule.ts). Every field
// here is optional: the site falls back to sensible defaults when a list
// is left empty (see web/src/app/page.tsx).
export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage (Search, Menu & Partner Initiatives)',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'home' }),
  groups: [
    { name: 'search', title: 'Search prompts', default: true },
    { name: 'menu', title: 'Bottom menu' },
    { name: 'initiatives', title: 'Partner initiatives' },
  ],
  fields: [
    // ---- Search prompts ----
    defineField({
      name: 'searchPrompts',
      title: 'Search prompts',
      type: 'array',
      group: 'search',
      description:
        'The lines the hero search bar types out by itself, one after another. Each one opens the normal search page for its location (dates and guests are still picked there). Three or four work best. Leave empty to use the built-in defaults.',
      validation: (rule) => rule.max(6).warning('More than six prompts makes the loop very long.'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'searchPrompt',
          fields: [
            defineField({
              name: 'typedText',
              title: 'Typed text',
              type: 'string',
              description: 'What gets typed into the bar, e.g. "A base for Newgrange and the Boyne Valley". Keep it under about 50 characters so it fits on a phone.',
              validation: (rule) => rule.required().max(70),
            }),
            defineField({
              name: 'chipLabel',
              title: 'Button label',
              type: 'string',
              description: 'Short label for the clickable button under the bar, e.g. "Near Newgrange".',
              validation: (rule) => rule.required().max(28),
            }),
            defineField({
              name: 'location',
              title: 'Search location',
              type: 'string',
              description:
                'The location the search page opens with. Must match one of the search bar\'s own locations exactly — currently "Drogheda", "Wexford" or "Clare".',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'property',
              title: 'Stay to show as the match',
              type: 'reference',
              to: [{ type: 'propertyPage' }],
              description:
                'Shown as the "best match" card, and its photo fills the hero while this prompt is on screen. Uses the property\'s "Homepage image" if set, otherwise its first gallery photo.',
            }),
          ],
          preview: {
            select: { title: 'typedText', location: 'location', chip: 'chipLabel' },
            prepare: ({ title, location, chip }) => ({ title, subtitle: `${chip ?? ''} → ${location ?? 'no location'}` }),
          },
        }),
      ],
    }),

    // ---- Bottom menu ----
    defineField({
      name: 'dockMenus',
      title: 'Bottom menu',
      type: 'array',
      group: 'menu',
      description:
        'The menus in the floating bar at the bottom of the homepage, left to right. Each opens upward to show its links. Four fit comfortably on a phone. Leave empty to use the built-in defaults (Stays, Areas, Owners, More).',
      validation: (rule) => rule.max(5).warning('More than five menus will not fit on a phone.'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'dockMenu',
          fields: [
            defineField({
              name: 'label',
              title: 'Menu label',
              type: 'string',
              description: 'One short word, e.g. "Stays".',
              validation: (rule) => rule.required().max(12),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              validation: (rule) => rule.required().min(1),
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'dockLink',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
                    defineField({
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                      description: 'Relative path (e.g. /stays) or full URL.',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'note',
                      title: 'Small note (optional)',
                      type: 'string',
                      description: 'Shown in small text on the right, e.g. "From 15%".',
                    }),
                  ],
                  preview: { select: { title: 'label', subtitle: 'href' } },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'label', links: 'links' },
            prepare: ({ title, links }) => ({
              title,
              subtitle: `${links?.length ?? 0} link${links?.length === 1 ? '' : 's'}`,
            }),
          },
        }),
      ],
    }),

    // ---- Partner initiatives ----
    defineField({
      name: 'initiativesHeading',
      title: 'Heading',
      type: 'string',
      group: 'initiatives',
      initialValue: 'Partner initiatives',
      description: 'Small heading above the tiles. Defaults to "Partner initiatives".',
    }),
    defineField({
      name: 'initiatives',
      title: 'Partner initiatives',
      type: 'array',
      group: 'initiatives',
      description:
        'The tiles under the big logo at the very bottom of the homepage, two per row — four fill it neatly. Separate from the Partners directory. Leave empty to show only the logo.',
      validation: (rule) => rule.max(6).warning('Four tiles (two rows) is the intended layout.'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'initiative',
          fields: [
            defineField({ name: 'title', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'tagline',
              title: 'Small line above the heading',
              type: 'string',
              description: 'e.g. "Family entertainment centre, Drogheda".',
            }),
            defineField({
              name: 'tagLabel',
              title: 'Tag (top-left pill)',
              type: 'string',
              description: 'Defaults to "Partner initiative".',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Where the tile goes when clicked — a relative path (e.g. /partners/funtasia) or a full URL. Leave blank for a tile that is not clickable.',
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'tagline', media: 'image' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage (Search, Menu & Partner Initiatives)' }),
  },
})
