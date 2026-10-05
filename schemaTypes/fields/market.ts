import { defineField } from 'sanity'

// Every market-scoped document carries one of these. The Studio sidebar
// (structure.ts) and the site's GROQ queries both filter on it. It is set
// by the "new document" template for each market, so editors never pick
// it by hand, and locked once set so a document can't silently switch market.
export const marketField = defineField({
  name: 'market',
  title: 'Market',
  type: 'string',
  options: {
    list: [
      { title: 'Ireland', value: 'ie' },
      { title: 'India', value: 'in' },
    ],
    layout: 'radio',
  },
  validation: (rule) => rule.required(),
  readOnly: ({ value }) => Boolean(value),
})

// Restricts a reference picker to documents in the same market as the
// document being edited. Falls back to no restriction if the current
// document has no market yet (e.g. before the migration has run).
export const sameMarketReference = {
  filter: ({ document }: { document?: { market?: string } }) =>
    document?.market
      ? { filter: 'market == $market', params: { market: document.market } }
      : { filter: '' },
}
