import { defineField } from 'sanity'

// A freeform icon name, rendered on the front end by looking it up in the
// lucide-react icon set at runtime (see web/src/components/DynamicIcon.tsx)
// — so any icon in that library can be used here without a code change.
// Editors pick the exact name from https://lucide.dev/icons (kebab-case,
// e.g. "map-pin"), not from a fixed list baked into this schema.
export function iconField({ initialValue }: { initialValue?: string } = {}) {
  return defineField({
    name: 'icon',
    title: 'Icon',
    type: 'string',
    description:
      'Look up an icon name at lucide.dev/icons and paste it here exactly as shown (e.g. "map-pin"). Renders live on the site — no code change needed.',
    initialValue,
    validation: (rule) =>
      rule
        .required()
        .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
          name: 'kebab-case icon name',
          invert: false,
        })
        .error('Use the kebab-case name exactly as shown on lucide.dev/icons, e.g. "map-pin"'),
  })
}
