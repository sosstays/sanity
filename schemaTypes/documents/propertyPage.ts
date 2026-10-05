import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { Icon } from '@sanity/icons'
import { seoFields } from '../shared/seoFields'
import { marketField, sameMarketReference } from '../fields/market'

// NOTE: This holds editorial/marketing content only (description, photos,
// area context). Live availability, pricing, and the booking link itself
// come from Uplisting at request time — this document is never the
// source of truth for bookable dates or rates. The `uplistingPropertySlug`
// field is how the frontend matches this page to the right Uplisting listing.
export const propertyPage = defineType({
  name: 'propertyPage',
  title: 'Property Page',
  type: 'document',
  icon: () => createElement(Icon, { symbol: 'home' }),
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'promo', title: 'Gallery Promotion' },
    { name: 'booking', title: 'Booking Link' },
    { name: 'seo', title: 'SEO / AEO' },
  ],
  fields: [
    { ...marketField, group: 'content' },
    defineField({
      name: 'name',
      title: 'Property Name',
      type: 'string',
      group: 'content',
      description: 'Should match the property name in Uplisting for clarity.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'content',
      description: 'e.g. "Ardee, Co. Louth"',
      validation: (rule) => rule.required(),
    }),
    // Structured location. `location` above is still what the site reads;
    // once these are filled on every property the site switches to them
    // and `location` can be hidden.
    defineField({
      name: 'city',
      title: 'City / Town',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'County / State',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      group: 'content',
      options: { list: [{ title: 'Ireland', value: 'IE' }, { title: 'India', value: 'IN' }] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'geo',
      title: 'Map Location',
      type: 'geopoint',
      group: 'content',
    }),
    defineField({
      name: 'locationLink',
      title: 'Google Maps Link',
      type: 'url',
      group: 'content',
      description: 'Paste a Google Maps link for this property (e.g. from the "Share" button). Used to show the map on the property page — falls back to searching the Location text above if left blank.',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'One or two warm, honest sentences for listing cards and previews.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
      description: 'Rich, guest-facing description for the property page itself.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (rule) => rule.required() }),
          ],
        },
      ],
      validation: (rule) => rule.min(3).warning('At least 3 photos recommended for a strong listing page'),
    }),
    defineField({
      name: 'video',
      title: 'Video Tour',
      type: 'file',
      group: 'content',
      options: { accept: 'video/*' },
      description: 'Upload a property walkthrough video, hosted directly in Sanity. Shown below the description. Leave blank to hide.',
    }),
    defineField({
      name: 'roomTypes',
      title: 'Room Types',
      type: 'array',
      group: 'content',
      description: 'Breakdown of room types shown in a table below the description, e.g. "Deluxe Double Room — 1 large double bed — sleeps 2".',
      of: [
        {
          type: 'object',
          name: 'roomType',
          fields: [
            defineField({ name: 'name', title: 'Room Type Name', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'roomId',
              title: 'Room ID',
              type: 'string',
              description: 'Identifier for this room type from the booking/PMS system (e.g. Uplisting room ID). Not shown to guests.',
            }),
            defineField({
              name: 'image',
              title: 'Room Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
              ],
            }),
            defineField({
              name: 'bedConfiguration',
              title: 'Bed Configuration',
              type: 'string',
              description: 'e.g. "2 bunk beds and 1 large double bed"',
            }),
            defineField({
              name: 'guests',
              title: 'Number of Guests',
              type: 'number',
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'bedConfiguration', media: 'image' },
          },
        },
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'sleeps',
      title: 'Sleeps (max guests)',
      type: 'number',
      group: 'content',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price',
      type: 'string',
      group: 'content',
      description: 'Shown as a tag next to the property name, e.g. "From €150/night". Not connected to Uplisting — update manually as rates change.',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      group: 'content',
    }),
    defineField({
      name: 'beds',
      title: 'Beds',
      type: 'number',
      group: 'content',
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      group: 'content',
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      group: 'content',
      description: '"Entire House" and "Room" describe the booking unit (a whole-house property vs. one of several separately bookable rooms) and get their own icon on the property page — the rest are just descriptive.',
      options: {
        list: ['Entire House', 'Room', 'Apartment', 'Cottage', 'Cabin', 'Villa', 'Bungalow', 'Townhouse'],
      },
    }),
    defineField({
      name: 'reviewScore',
      title: 'Overall Review Score',
      type: 'number',
      group: 'content',
      description: 'Out of 10, e.g. 9.2. Leave blank to hide the review score card.',
      validation: (rule) => rule.min(0).max(10),
    }),
    defineField({
      name: 'reviewCount',
      title: 'Number of Reviews',
      type: 'number',
      group: 'content',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'reviewCategories',
      title: 'Review Categories',
      type: 'array',
      group: 'content',
      description: 'Category breakdown shown as bars under the overall score, e.g. Cleanliness, Location.',
      of: [
        {
          type: 'object',
          name: 'reviewCategory',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'value',
              title: 'Score (out of 10)',
              type: 'number',
              validation: (rule) => rule.required().min(0).max(10),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Good to Know (FAQs)',
      type: 'array',
      group: 'content',
      description: 'Practical guest questions specific to this property — check-in times, parking, pets, etc.',
      of: [
        {
          type: 'object',
          name: 'faq',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
    defineField({
      name: 'relatedAreaGuides',
      title: 'Related Area Guides',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'areaGuide' }], options: sameMarketReference }],
      description: 'Link to the area guide(s) covering this property\'s location, for cross-linking and SEO context.',
    }),
    defineField({
      name: 'galleryPromotion',
      title: 'Gallery Promotion',
      type: 'object',
      group: 'promo',
      description:
        'Optional timed promo that reveals over the photo gallery a few seconds after the page loads — three rotating highlights (e.g. quirky selling points, standout features), each with its own headline, description, and (optionally) a photo that cross-fades onto the hero tile. Leave "Enable" off to show the plain gallery.',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'highlights',
          title: 'Highlights',
          type: 'array',
          description:
            'Exactly 3 rotating highlights, one per dot in the gallery indicator. Guests can click a dot to jump straight to one, or let them autoplay. Lead with something memorable — a quirky detail, a standout feature, a reason to book.',
          of: [
            {
              type: 'object',
              name: 'highlight',
              fields: [
                defineField({
                  name: 'headline',
                  title: 'Headline',
                  type: 'string',
                  description: 'e.g. "Say Hello to the Neighbours"',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                  description: 'e.g. "Horses and donkeys graze in the field next door."',
                  validation: (rule) => rule.required().max(160),
                }),
                defineField({
                  name: 'image',
                  title: 'Hero Photo',
                  type: 'image',
                  description:
                    'Optional photo for this highlight — cross-fades onto the large hero gallery tile while this highlight is showing. Leave blank to keep the regular hero photo in place.',
                  options: { hotspot: true },
                  fields: [
                    defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (rule) => rule.required() }),
                  ],
                }),
                defineField({
                  name: 'supportingImages',
                  title: 'Supporting Photos',
                  type: 'array',
                  description:
                    'Up to 2 photos that cross-fade onto the two smaller gallery tiles (to the right of the hero photo) while this highlight is showing. Leave empty to keep the regular gallery photos in place there.',
                  of: [
                    {
                      type: 'image',
                      options: { hotspot: true },
                      fields: [
                        defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (rule) => rule.required() }),
                      ],
                    },
                  ],
                  validation: (rule) => rule.max(2),
                }),
                defineField({
                  name: 'ctaLabel',
                  title: 'Button Label',
                  type: 'string',
                  description: 'e.g. "Book Now" or "Claim Offer"',
                  initialValue: 'Book Now',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'ctaHref',
                  title: 'Button Link',
                  type: 'url',
                  description: 'Where the button sends guests. Leave blank to use this property\'s Uplisting booking link.',
                  validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
                }),
              ],
              preview: {
                select: { title: 'headline', subtitle: 'description', media: 'image' },
              },
            },
          ],
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { enabled?: boolean } | undefined
              if (!parent?.enabled) return true
              if (!value || value.length !== 3) return 'Exactly 3 highlights are required when the promotion is enabled'
              return true
            }),
        }),
        defineField({
          name: 'delaySeconds',
          title: 'Reveal Delay (seconds)',
          type: 'number',
          description: 'How long after the page loads before the promo appears.',
          initialValue: 2.5,
          validation: (rule) => rule.min(0).max(30),
        }),
        defineField({
          name: 'autoplaySeconds',
          title: 'Autoplay Interval (seconds)',
          type: 'number',
          description: 'How often the promo indicator advances once it appears.',
          initialValue: 4,
          validation: (rule) => rule.min(1).max(30),
        }),
      ],
      preview: {
        select: { enabled: 'enabled', headline: 'highlights.0.headline' },
        prepare: ({ enabled, headline }) => ({
          title: headline || 'Gallery Promotion',
          subtitle: enabled ? 'Enabled' : 'Disabled',
        }),
      },
    }),
    defineField({
      name: 'uplistingPropertySlug',
      title: 'Uplisting Property Slug',
      type: 'string',
      group: 'booking',
      description: 'The property_slug value from Uplisting\'s Properties API endpoint. Used to build the "Book Now" link to the Uplisting booking subdomain. Find it in Uplisting\'s dashboard or API response.',
      validation: (rule) => rule.required().error('Required — without this, the Book Now button cannot link to the right listing'),
    }),
    defineField({
      name: 'uplistingPropertyId',
      title: 'Uplisting Property ID',
      type: 'number',
      group: 'booking',
      description: 'The numeric property ID from Uplisting\'s Properties API (not the slug). Required for the on-site embedded checkout page to fetch a live price quote — leave blank if this property only uses the off-site "Book Now" link.',
    }),
    defineField({
      name: 'wholeHouseAvailabilityId',
      title: 'Whole-House Availability ID',
      type: 'string',
      group: 'booking',
      description: 'For properties booked as a single whole-house unit (room types are informational only, with no Room ID set): the Uplisting property_slug for this listing, used to check live availability. Leave blank for properties with separately bookable room types.',
    }),
    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    select: { title: 'name', media: 'gallery.0', subtitle: 'location' },
  },
})
