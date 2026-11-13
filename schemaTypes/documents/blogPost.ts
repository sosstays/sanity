import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'
import { marketField, sameMarketReference } from '../fields/market'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'document-text' }),
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO / AEO' },
  ],
  fields: [
    { ...marketField, group: 'content' },
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary shown on the blog listing page. Also used as SEO description fallback.',
      validation: (rule) => rule.max(200).warning('Keep it under 200 characters for best display'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and image search — e.g. "Sunrise over Carlingford Lough from the Mourne coastal path"',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      description:
        'Rich text. Use the "+" menu to insert a photo, a table, or an HTML embed (YouTube, a form, a booking widget) alongside paragraphs. Headings get a jump-to link automatically from their own text; select any text and choose "Anchor" from the toolbar to mark a custom jump-to point for an in-article index.',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              // Re-declared explicitly: providing `marks.annotations` at all
              // replaces Studio's default annotations (which include Link),
              // so Link has to be listed here too or it disappears from the
              // toolbar.
              defineField({
                name: 'link',
                title: 'URL',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    description: 'A full link (https://...) or a same-page jump link (e.g. #enquire) to an anchor elsewhere on this page.',
                    validation: (rule) =>
                      rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }),
                  }),
                ],
              }),
              { type: 'anchor' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        },
        { type: 'table' },
        { type: 'embedBlock' },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature at top of /blog?',
      type: 'boolean',
      group: 'content',
      description: 'Pins this post to the top of the blog index instead of the most recently published post. If more than one post is marked, the most recently published of those wins.',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      group: 'content',
      description: 'Shown on the article header and byline. Leave blank to credit the Sos Stays team.',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. "Owner, Rathescar Grove"' }),
        defineField({
          name: 'avatar',
          title: 'Avatar',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'First tag is shown as the topic pill next to the byline; all tags appear in the article sidebar.',
    }),
    defineField({
      name: 'relatedAreaGuides',
      title: 'Related Area Guides',
      type: 'array',
      group: 'content',
      description: 'Link this post to relevant area guides (e.g. a post about Carlingford links to the Carlingford area guide) for internal linking and SEO.',
      of: [{ type: 'reference', to: [{ type: 'areaGuide' }], options: sameMarketReference }],
    }),
    defineField({
      name: 'promotedProperty',
      title: 'Promoted Property',
      type: 'reference',
      group: 'content',
      description: 'Feature a stay in the article sidebar — e.g. the property this post is about, or one relevant to it.',
      to: [{ type: 'propertyPage' }],
      options: sameMarketReference,
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'content',
      description: 'Optional Q&A shown at the end of the post — questions readers of this article are likely to have.',
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
    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'excerpt', featured: 'featured' },
    prepare: ({ title, media, subtitle, featured }) => ({
      title: featured ? `★ ${title}` : title,
      media,
      subtitle,
    }),
  },
})
