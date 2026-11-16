import { defineType, defineField } from 'sanity'

// A blog author with their own page at /authors/<slug>. Linked from a blog
// post via its "Author profile" field; posts without one fall back to the
// inline name/role/avatar typed on the post itself.
export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. "Founder, Sos Stays"' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 5 }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'sameAs',
      title: 'Profile Links',
      type: 'array',
      description: "The author's own public profiles (LinkedIn, Instagram, personal site). Used in structured data.",
      of: [{ type: 'url', validation: (rule) => rule.uri({ scheme: ['http', 'https'] }) }],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
