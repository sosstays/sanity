import { createElement } from 'react'
import type { StructureResolver } from 'sanity/structure'
import { Icon } from '@sanity/icons'
import { markets, marketTypes, marketTypeNames } from './markets'

// Custom desk structure. The four market-scoped types (properties, area
// guides, blog posts, landlord pages) and per-market Site Settings live
// under an Ireland or India section. Everything else — the existing
// singletons and unsplit types — sits under "Shared", unchanged.
const SINGLETON_TYPES = ['siteSettings', 'footer', 'navigation', 'heroSection', 'hostsModule', 'audienceTabs', 'privacyPolicyPage', 'termsPage', 'corporateStaysPage', 'aboutPage', 'partnersPage', 'shopPage']

type Builder = Parameters<StructureResolver>[0]

const marketSection = (S: Builder, m: (typeof markets)[number]) =>
  S.listItem()
    .id(m.id)
    .title(m.title)
    .icon(() => createElement('span', null, m.flag))
    .child(
      S.list()
        .title(m.title)
        .items([
          S.listItem()
            .title('Site Settings')
            .icon(() => createElement(Icon, { symbol: 'cog' }))
            .child(
              S.document()
                .schemaType('siteSettings')
                .documentId(`siteSettings-${m.id}`)
            ),
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

const sharedItems = (S: Builder) => [
      S.listItem()
        .title('Site Settings (current, used by live site)')
        .icon(() => createElement(Icon, { symbol: 'cog' }))
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Footer')
        .icon(() => createElement(Icon, { symbol: 'bars-4' }))
        .child(
          S.document()
            .schemaType('footer')
            .documentId('footer')
        ),
      S.listItem()
        .title('Navigation')
        .icon(() => createElement(Icon, { symbol: 'bars-4' }))
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('navigation')
        ),
      S.listItem()
        .title('Homepage Hero')
        .icon(() => createElement(Icon, { symbol: 'image' }))
        .child(
          S.document()
            .schemaType('heroSection')
            .documentId('heroSection')
        ),
      S.listItem()
        .title('Hosts Module')
        .icon(() => createElement(Icon, { symbol: 'users' }))
        .child(
          S.document()
            .schemaType('hostsModule')
            .documentId('hostsModule')
        ),
      S.listItem()
        .title('Landlord Audience Tabs')
        .icon(() => createElement(Icon, { symbol: 'users' }))
        .child(
          S.document()
            .schemaType('audienceTabs')
            .documentId('audienceTabs')
        ),
      S.listItem()
        .title('Privacy Policy')
        .icon(() => createElement(Icon, { symbol: 'document-text' }))
        .child(
          S.document()
            .schemaType('privacyPolicyPage')
            .documentId('privacyPolicyPage')
        ),
      S.listItem()
        .title('Terms & Conditions')
        .icon(() => createElement(Icon, { symbol: 'document-text' }))
        .child(
          S.document()
            .schemaType('termsPage')
            .documentId('termsPage')
        ),
      S.listItem()
        .title('Corporate Stays Page')
        .icon(() => createElement(Icon, { symbol: 'case' }))
        .child(
          S.document()
            .schemaType('corporateStaysPage')
            .documentId('corporateStaysPage')
        ),
      S.listItem()
        .title('About Page')
        .icon(() => createElement(Icon, { symbol: 'heart' }))
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
        ),
      S.listItem()
        .title('Partners Page')
        .icon(() => createElement(Icon, { symbol: 'users' }))
        .child(
          S.document()
            .schemaType('partnersPage')
            .documentId('partnersPage')
        ),
      S.listItem()
        .title('Shop Page')
        .icon(() => createElement(Icon, { symbol: 'basket' }))
        .child(
          S.document()
            .schemaType('shopPage')
            .documentId('shopPage')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId() ?? ''
        return !SINGLETON_TYPES.includes(id) && !marketTypeNames.includes(id)
      }),
      S.divider(),
      // Safety net: market-scoped documents that don't have a market yet
      // (e.g. before the migration runs). Nothing is ever hidden from the Studio.
      S.listItem()
        .title('Unassigned (no market)')
        .icon(() => createElement(Icon, { symbol: 'warning-outline' }))
        .child(
          S.documentList()
            .title('Unassigned (no market)')
            .filter('_type in $types && !defined(market)')
            .params({ types: marketTypeNames })
        ),
    ]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('SOS Stays')
    .items([
      ...markets.map((m) => marketSection(S, m)),
      S.divider(),
      S.listItem()
        .id('shared')
        .title('Shared')
        .icon(() => createElement(Icon, { symbol: 'earth-globe' }))
        .child(S.list().title('Shared').items(sharedItems(S))),
    ])
