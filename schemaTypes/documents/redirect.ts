import { defineType, defineField } from 'sanity'

const isSitePath = (value: string | undefined) =>
  !value || /^\/[^\s]*$/.test(value) ? true : 'Must be a site path starting with "/", e.g. /blog/old-slug'

// A URL redirect applied by the website before the page is looked up — use
// it when renaming a slug so the old URL keeps working.
export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'from',
      title: 'From path',
      type: 'string',
      description: 'The old path, e.g. /blog/old-slug (no domain, no trailing slash).',
      validation: (rule) => rule.required().custom(isSitePath),
    }),
    defineField({
      name: 'to',
      title: 'To path',
      type: 'string',
      description: 'The new path, e.g. /blog/new-slug.',
      validation: (rule) => rule.required().custom(isSitePath),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (301)?',
      type: 'boolean',
      description: 'On for a permanent move (search engines transfer the old URL\'s ranking). Off for a temporary redirect.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { from: 'from', to: 'to', permanent: 'permanent' },
    prepare: ({ from, to, permanent }) => ({ title: from, subtitle: `→ ${to} (${permanent === false ? 'temporary' : '301'})` }),
  },
})
