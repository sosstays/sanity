# Handoff notes

## Pending merge: SEO alternates + siteSettings contact fields (NOT merged yet)

Branch `feature/seo-alternates-siteSettings` is pushed for review and is
deliberately **not** merged into `main`. It pairs with the web branch
`feature/seo-p1-hreflang-ga4` in `sosstays/sosstays`; see `HANDOFF.md` there for
the full deploy order.

- `schemaTypes/shared/seoFields.ts`: new `canonicalOverride` (url) and
  `alternates` (reference to the other market's equivalent document, filtered to
  the opposite market). Spread into every SEO-enabled document type, so each can
  emit hreflang once both sides link to each other.
- `landlordPage.alternateVersion` is marked deprecated; the site still reads it
  as a fallback.
- `siteSettings`: new `phone` and `address` (used for per-market structured
  data only; nothing is inherited from the other market).
- `schema.json` re-extracted (`npx sanity schema extract --enforce-required-fields --force`).

After merging: run `sanity schema deploy`, then the web branch can be merged.
