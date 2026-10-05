import { createElement } from 'react'
import type { StructureResolver } from 'sanity/structure'
import { Icon } from '@sanity/icons'

// Custom desk structure: pins the Site Settings singleton at the top
// (edited in place, never duplicated), then lists all other content
// types normally below it.
const SINGLETON_TYPES = ['siteSettings', 'footer', 'navigation', 'heroSection', 'hostsModule', 'audienceTabs', 'privacyPolicyPage', 'termsPage', 'corporateStaysPage', 'aboutPage', 'partnersPage', 'shopPage']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
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
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.includes(listItem.getId() ?? '')
      ),
    ])
