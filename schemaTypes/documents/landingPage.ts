import {defineField, defineType} from 'sanity'
import {seoFields} from '../shared/seoFields'

// Standalone marketing/campaign landing pages (e.g. "hotels-near-funtasia")
// that don't fit propertyPage, areaGuide, blogPost, or landlordPage. Renders
// at the site root, not nested under /stays, /areas, or /blog.
export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      description: 'Internal reference only, not necessarily shown on the page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description:
        'This becomes the page URL, e.g. "hotels-near-funtasia" → /hotels-near-funtasia. Landing pages are NOT nested under /blog, /areas, /stays, or /landlords — they render at the site root.',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    // HERO
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow text',
      type: 'string',
      description: 'Small label above the headline, e.g. "Family break, sorted".',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero subtext',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroTags',
      title: 'Hero tag pills',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Short highlight tags shown as pills under the hero copy, e.g. "Bunk beds for the kids".',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA label',
      type: 'string',
      initialValue: 'Book direct',
    }),
    defineField({
      name: 'primaryCtaUrl',
      title: 'Primary CTA URL',
      type: 'string',
      description:
        'Usually the Uplisting booking link for the featured property/room. Can be a relative path or full URL.',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaUrl',
      title: 'Secondary CTA URL',
      type: 'string',
    }),

    // MARQUEE TICKER
    defineField({
      name: 'marqueeItems',
      title: 'Marquee ticker items',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Short scrolling highlights under the hero, e.g. "Free on-site parking". Only confirmed facts — this renders as a stated claim.',
    }),

    // DISTANCE / PROXIMITY BAND
    defineField({
      name: 'distanceStat',
      title: 'Distance stat (e.g. "~15 min")',
      type: 'string',
      description:
        'Keep approximate/rounded rather than a precise minute count unless the exact address-to-address distance has been confirmed — see brand note on not overclaiming proximity.',
    }),
    defineField({
      name: 'distanceLabel',
      title: 'Distance stat label',
      type: 'string',
      description: 'e.g. "drive to Funtasia, Drogheda"',
    }),
    defineField({
      name: 'destinationName',
      title: 'Destination name',
      description: 'The place this page is driving visitors toward, e.g. "Funtasia Drogheda" — shown in the "you play here" card.',
      type: 'string',
    }),
    defineField({
      name: 'distanceText',
      title: 'Distance supporting text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'geographyHeading',
      title: 'Geography section heading',
      type: 'string',
      description: 'e.g. "Fifteen minutes apart. A world apart." Only shown if the distance stat is also filled in.',
    }),
    defineField({
      name: 'proximityStats',
      title: 'Additional proximity stats',
      type: 'array',
      description: 'Extra "X min to Y" tiles alongside the main distance stat, e.g. drive time to the nearest train station or airport. Only add confirmed times.',
      of: [
        {
          type: 'object',
          name: 'proximityStat',
          fields: [
            {name: 'value', type: 'string', title: 'Value (e.g. "20 min")', validation: (Rule: any) => Rule.required()},
            {name: 'label', type: 'string', title: 'Label (e.g. "to Drogheda station")', validation: (Rule: any) => Rule.required()},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    }),

    // DIRECT BOOKING PUSH
    defineField({
      name: 'directBookingBadge',
      title: 'Direct booking badge text',
      type: 'string',
      initialValue: 'Best price, booked direct',
    }),
    defineField({
      name: 'directBookingHeadline',
      title: 'Direct booking headline',
      type: 'string',
    }),
    defineField({
      name: 'directBookingText',
      title: 'Direct booking body text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'directBookingSavingsPercent',
      title: 'Platform booking surcharge (%)',
      type: 'number',
      description:
        'How much more a platform booking (Airbnb/Booking.com) costs vs. booking direct, as a percentage. Only set this with a confirmed figure — it renders as a comparison chart. Leave blank to show the qualitative badge/text only, no chart.',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'directBookingComparisonNote',
      title: 'Comparison chart note',
      type: 'text',
      rows: 2,
      description: 'Small print under the comparison chart, e.g. noting the figure is illustrative or varies by season.',
    }),

    // FEATURED PROPERTY / ROOM LINK
    defineField({
      name: 'featuredProperty',
      title: 'Featured property',
      type: 'reference',
      to: [{type: 'propertyPage'}],
      description: 'The property this landing page is driving bookings toward.',
    }),

    // FLEXIBLE INFO SECTIONS (e.g. Funtasia facts, pricing table, "while you're here")
    defineField({
      name: 'infoSections',
      title: 'Info sections',
      type: 'array',
      description:
        'Flexible content blocks for things like attraction details, pricing tables, or "while you\'re here" cross-sell cards.',
      of: [
        {
          type: 'object',
          name: 'infoSection',
          fields: [
            {name: 'eyebrow', type: 'string', title: 'Eyebrow'},
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'body', type: 'text', title: 'Body text', rows: 3},
            {
              name: 'layout',
              type: 'string',
              title: 'Layout',
              description: 'Cards: simple text card grid. Photo grid: large editorial magazine-style grid — use only once items have real photos.',
              options: {list: [{title: 'Cards', value: 'cards'}, {title: 'Photo grid', value: 'photoGrid'}], layout: 'radio'},
              initialValue: 'cards',
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'infoItem',
                  fields: [
                    {name: 'title', type: 'string', title: 'Title'},
                    {name: 'description', type: 'text', title: 'Description', rows: 2},
                    {name: 'tag', type: 'string', title: 'Tag (e.g. "Explore", "Food")'},
                    {
                      name: 'image',
                      type: 'image',
                      title: 'Image (optional)',
                      description:
                        'Used for the editorial photo-grid layout. Use a real photo of the actual place/activity — the card degrades gracefully (text only) if left empty, so don\'t fill this with generic stock.',
                      options: {hotspot: true},
                      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
                    },
                    {name: 'link', type: 'url', title: 'Link (optional)'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

    // PRICING TIERS (structured version of a pricing infoSection, for the stat-tile layout)
    defineField({
      name: 'pricingTiers',
      title: 'Pricing tiers',
      type: 'array',
      description: 'Structured price call-outs, e.g. general admission vs. off-peak. Rendered as stat tiles.',
      of: [
        {
          type: 'object',
          name: 'pricingTier',
          fields: [
            {name: 'amount', type: 'string', title: 'Amount (e.g. "€24.95")', validation: (Rule: any) => Rule.required()},
            {name: 'label', type: 'string', title: 'Label (e.g. "General admission, pp")', validation: (Rule: any) => Rule.required()},
          ],
          preview: {select: {title: 'amount', subtitle: 'label'}},
        },
      ],
    }),
    defineField({
      name: 'pricingNote',
      title: 'Pricing note',
      type: 'text',
      rows: 2,
      description: 'Small print under the pricing tiles, e.g. combo ticket info or a link prompt.',
    }),
    defineField({
      name: 'pricingLink',
      title: 'Pricing link URL',
      type: 'url',
      description: 'e.g. link to funtasia.ie for current rates.',
    }),
    defineField({
      name: 'pricingLinkLabel',
      title: 'Pricing link label',
      type: 'string',
    }),

    // ITINERARY
    defineField({
      name: 'itineraryEyebrow',
      title: 'Itinerary eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'itineraryHeading',
      title: 'Itinerary heading',
      type: 'string',
    }),
    defineField({
      name: 'itineraryText',
      title: 'Itinerary intro text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'itineraryDays',
      title: 'Itinerary days',
      type: 'array',
      description: 'A suggested plan, shown as a two-column timeline. Keep times illustrative and grounded in confirmed check-in/check-out details.',
      of: [
        {
          type: 'object',
          name: 'itineraryDay',
          fields: [
            {name: 'dayLabel', type: 'string', title: 'Day label (e.g. "Day one — arrive")', validation: (Rule: any) => Rule.required()},
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'itineraryItem',
                  fields: [
                    {name: 'time', type: 'string', title: 'Time (e.g. "15:00")'},
                    {name: 'title', type: 'string', title: 'Title', validation: (Rule: any) => Rule.required()},
                    {name: 'description', type: 'text', title: 'Description', rows: 2},
                  ],
                  preview: {select: {title: 'title', subtitle: 'time'}},
                },
              ],
            },
          ],
          preview: {select: {title: 'dayLabel'}},
        },
      ],
    }),

    // RELATED CONTENT (cross-sell into existing area guide content)
    defineField({
      name: 'relatedAreaGuide',
      title: 'Related area guide',
      type: 'reference',
      to: [{type: 'areaGuide'}],
      description:
        'Pulls related "while you\'re here" content from an existing area guide rather than duplicating it — prefer referencing over hardcoding where the content already exists.',
    }),

    // FINAL CTA
    defineField({
      name: 'finalCtaHeadline',
      title: 'Final CTA headline',
      type: 'string',
    }),
    defineField({
      name: 'finalCtaText',
      title: 'Final CTA body text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'finalCtaSecondaryLabel',
      title: 'Final CTA secondary label',
      type: 'string',
      description: 'e.g. "Ask us a question" — a lower-commitment link next to the primary CTA.',
    }),
    defineField({
      name: 'finalCtaSecondaryUrl',
      title: 'Final CTA secondary URL',
      type: 'string',
    }),

    // STICKY BOOKING BAR
    defineField({
      name: 'stickyBarEnabled',
      title: 'Show sticky booking bar',
      type: 'boolean',
      description: 'A floating "Book direct" bar that appears once the visitor scrolls past the hero.',
      initialValue: true,
    }),

    ...seoFields,
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
  },
})
