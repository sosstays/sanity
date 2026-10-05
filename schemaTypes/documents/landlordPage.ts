import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'

// Landlord-facing pages: pitch, "become a partner", revenue calculator
// context, etc. Kept as a separate type from blogPost/areaGuide because
// this audience needs a distinct tone (direct, numbers-led) and different
// fields (proof points, CTA link) per the brand voice guidance.
export const landlordPage = defineType({
  name: 'landlordPage',
  title: 'Landlord Page',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'users' }),
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO / AEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroStatement',
      title: 'Hero Statement',
      type: 'string',
      group: 'content',
      description: 'The main headline, e.g. "Send your SOS. We\'ll sort the stay."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'proofPoints',
      title: 'Proof Points',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Key stats for this audience — e.g. "Most self-managing hosts earn 20-35% less than they should"',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ',
      type: 'array',
      group: 'content',
      description: 'Landlord-specific questions — commission, contract terms, cleaning, insurance, etc.',
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
      name: 'ctaLabel',
      title: 'Call to Action Label',
      type: 'string',
      group: 'content',
      initialValue: 'Send your SOS',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Call to Action URL',
      type: 'string',
      group: 'content',
      description: 'e.g. link to the revenue calculator at strrevenue.netlify.app or a contact form',
    }),
    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    select: { title: 'title', subtitle: 'heroStatement' },
  },
})
