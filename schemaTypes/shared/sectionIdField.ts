import { defineField } from 'sanity'

// Standard "Section ID" field — one per page section, across every page
// schema that renders discrete <section> bands. Lets an editor set the
// anchor a nav link, CTA button or external link jumps to (e.g. "#brief"),
// without a developer hardcoding it in the page's own source. Leaving it
// blank keeps that section's existing default id (set in the Next.js page
// itself), so this is purely additive — nothing breaks if it's never
// touched.
//
// `group` can be undefined for schemas that don't use field groups. The
// optional `options` are for documents that hold several of these side by
// side outside of groups (e.g. the homepage, whose sections are spread
// over a few singletons): `title` says which section the field belongs
// to, `fieldset` tucks them into a collapsible fieldset.
export function sectionIdField(
  fieldName: string,
  group: string | undefined,
  defaultId: string,
  options: { title?: string; fieldset?: string } = {},
) {
  return defineField({
    name: fieldName,
    title: options.title ?? 'Section ID (anchor)',
    type: 'string',
    ...(group ? { group } : {}),
    ...(options.fieldset ? { fieldset: options.fieldset } : {}),
    description: `Used as this section's #anchor for links/buttons that jump to it (e.g. a nav link to "#${defaultId}"). Lowercase letters, numbers and hyphens only, no spaces. Leave blank to keep the default ("${defaultId}").`,
    validation: (rule) =>
      rule.regex(/^[a-z0-9-]+$/, { name: 'slug' }).warning('Use only lowercase letters, numbers and hyphens — no spaces.'),
  })
}
