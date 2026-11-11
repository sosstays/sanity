import { defineField, defineType } from 'sanity'

// A Portable Text annotation for marking an exact point in body text as a
// jump-to target — e.g. so an "in this article" index near the top of a
// blog post can link to "#best-coffee-spot" and actually land there.
// Select any text (a heading, a word, whatever) and apply "Anchor" from
// the toolbar, same way as the built-in Link mark, then give it an id.
// Headings also get an anchor automatically from their own text (see
// blogBodyComponents in portableText.tsx) — this mark is for anchoring a
// point that isn't a heading, or for a stable id that won't change if the
// heading text is later edited.
export const anchorMark = defineType({
  name: 'anchor',
  title: 'Anchor',
  type: 'object',
  icon: () => '#',
  fields: [
    defineField({
      name: 'id',
      title: 'Anchor ID',
      type: 'string',
      description:
        'Used as the #hash in a link to this point, e.g. "best-coffee" links here with "#best-coffee". Lowercase letters, numbers and hyphens only — no spaces.',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9-]+$/, { name: 'slug' })
          .error('Use only lowercase letters, numbers and hyphens — no spaces.'),
    }),
  ],
  preview: {
    select: { title: 'id' },
    prepare: ({ title }) => ({ title: `#${title ?? ''}` }),
  },
})
