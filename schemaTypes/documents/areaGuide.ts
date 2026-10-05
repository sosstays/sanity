import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'

// These are the SEO/AEO anchor pages — Boyne Valley, Mournes, Carlingford,
// etc. Built to rank for "[activity] in [area]" and "things to do in
// [area]" searches, and to feed AI answer engines rich, structured
// local content.
export const areaGuide = defineType({
  name: 'areaGuide',
  title: 'Area Guide',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'pin' }),
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO / AEO' },
  ],
  fields: [
    defineField({
      name: 'areaName',
      title: 'Area Name',
      type: 'string',
      group: 'content',
      description: 'e.g. "Carlingford & the Cooley Peninsula", "Boyne Valley", "Mourne Mountains"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'areaName', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
      description: 'Warm opening — what this area feels like, why guests come here.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thingsToDo',
      title: 'Things to Do',
      type: 'array',
      group: 'content',
      description: 'Shown as tabbed cards (Explore / Food / Transport) on the area guide page.',
      of: [
        {
          type: 'object',
          name: 'activity',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: { list: ['Explore', 'Things to Do', 'Food', 'Transport'], layout: 'radio' },
              initialValue: 'Explore',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'tag',
              title: 'Tag',
              type: 'string',
              description: 'Short label shown on the card, e.g. "20 min drive" or "In town".',
            }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
            }),
            defineField({
              name: 'link',
              title: 'More Info Link',
              type: 'url',
              description: 'Optional external link, e.g. a Google Maps listing or a website.',
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
        },
      ],
    }),
    defineField({
      name: 'travelNotes',
      title: 'Getting Here',
      type: 'array',
      group: 'content',
      description: 'Short travel notes shown next to the map, e.g. "From Dublin — about 55 minutes by car".',
      of: [
        {
          type: 'object',
          name: 'travelNote',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "From Dublin"', validation: (rule) => rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'string', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'description' } },
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
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
    defineField({
      name: 'featuredProperties',
      title: 'Featured Properties in This Area',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'propertyPage' }] }],
      description: 'Properties to showcase on this area guide.',
    }),
    defineField({
      name: 'relatedBlogPosts',
      title: 'Related Blog Posts',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
    }),
    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    select: { title: 'areaName', media: 'heroImage' },
  },
})
