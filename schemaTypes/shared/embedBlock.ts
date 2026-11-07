import { defineField, defineType } from 'sanity'

// A Portable Text block for pasting a third-party embed code (YouTube,
// Google Forms, a booking widget, etc.) into rich text. Rendered on the
// frontend inside a sandboxed <iframe srcDoc> — never injected directly
// into the page — so a pasted <script> can't read cookies, call site APIs,
// or touch the parent DOM. Editor-only content (not public user input), but
// sandboxing costs nothing and removes an entire class of risk.
export const embedBlock = defineType({
  name: 'embedBlock',
  title: 'HTML Embed',
  type: 'object',
  icon: () => '</>',
  fields: [
    defineField({
      name: 'code',
      title: 'Embed Code',
      type: 'text',
      rows: 6,
      description: 'Paste the full embed/iframe code from the third-party site (YouTube, a form provider, a booking widget, etc.).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional small caption shown under the embed.',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: { list: ['16:9', '4:3', '1:1', 'auto'] },
      initialValue: '16:9',
      description: '"auto" lets the embed set its own height (e.g. a tall form) instead of being cropped to a fixed ratio.',
    }),
  ],
  preview: {
    select: { subtitle: 'caption' },
    prepare: ({ subtitle }) => ({ title: 'HTML Embed', subtitle: subtitle || 'No caption' }),
  },
})
