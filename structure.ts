import { createElement } from 'react'
import type { StructureResolver } from 'sanity/structure'
import { Icon } from '@sanity/icons'
import { markets, marketTypes, marketTypeNames, singletons, singletonTypeNames } from './markets'

// Custom desk structure. Each market (Ireland, India) has its own copy of
// every singleton (Site Settings, Footer, Navigation, ...) plus filtered
// lists of the four market-scoped types. "Shared" holds the types that
// aren't split by market, and the original un-suffixed singletons the live
// site still reads until Phase 2.

type Builder = Parameters<StructureResolver>[0]

const icon = (symbol: string) => () => createElement(Icon, { symbol: symbol as never })

const singletonItem = (S: Builder, s: (typeof singletons)[number], documentId: string, title = s.title) =>
  S.listItem()
    .title(title)
    .icon(icon(s.icon))
    .child(S.document().schemaType(s.type).documentId(documentId).title(title))

const marketSection = (S: Builder, m: (typeof markets)[number]) =>
  S.listItem()
    .id(m.id)
    .title(m.title)
    .icon(() => createElement('span', null, m.flag))
    .child(
      S.list()
        .title(m.title)
        .items([
          ...singletons.map((s) => singletonItem(S, s, `${s.type}-${m.id}`)),
          S.divider(),
          ...marketTypes.map((t) =>
            S.listItem()
              .title(t.title)
              .child(
                S.documentList()
                  .title(`${t.title} – ${m.title}`)
                  .schemaType(t.type)
                  .filter('_type == $type && market == $market')
                  .params({ type: t.type, market: m.id })
                  .initialValueTemplates([S.initialValueTemplateItem(`${t.type}-${m.id}`)])
              )
          ),
        ])
    )

const sharedSection = (S: Builder) =>
  S.listItem()
    .id('shared')
    .title('Shared')
    .icon(icon('earth-globe'))
    .child(
      S.list()
        .title('Shared')
        .items([
          // Types that aren't split by market (county pricing stats, landing
          // pages, partners, shop products, ...).
          ...S.documentTypeListItems().filter((listItem) => {
            const id = listItem.getId() ?? ''
            return !singletonTypeNames.includes(id) && !marketTypeNames.includes(id)
          }),
          S.divider(),
          // The original un-suffixed singletons. The live site reads these
          // until Phase 2 switches its queries to `<type>-<market>`.
          S.listItem()
            .title('Legacy (read by live site)')
            .icon(icon('archive'))
            .child(
              S.list()
                .title('Legacy (read by live site)')
                .items(singletons.map((s) => singletonItem(S, s, s.type)))
            ),
          // Safety net: market-scoped documents with no market yet (e.g.
          // before the migration runs). Nothing is ever hidden from the Studio.
          S.listItem()
            .title('Unassigned (no market)')
            .icon(icon('warning-outline'))
            .child(
              S.documentList()
                .title('Unassigned (no market)')
                .filter('_type in $types && !defined(market)')
                .params({ types: marketTypeNames })
            ),
        ])
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('SOS Stays')
    .items([...markets.map((m) => marketSection(S, m)), S.divider(), sharedSection(S)])
