import { defineType, defineField } from 'sanity'

// A single guest review for one property. Only approved reviews are shown
// on the site. Reviews collected by us ("Direct") can also feed the star
// rating search engines see; reviews copied from other platforms are shown
// with their source but never marked up as our own.
export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'property',
      title: 'Property',
      type: 'reference',
      to: [{ type: 'propertyPage' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'guestFirstName',
      title: 'Guest first name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stayMonth',
      title: 'Stay month',
      type: 'number',
      options: {
        list: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
          (title, i) => ({ title, value: i + 1 })
        ),
      },
    }),
    defineField({
      name: 'stayYear',
      title: 'Stay year',
      type: 'number',
      validation: (rule) => rule.integer().min(2015).max(2100),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1).max(5),
    }),
    defineField({ name: 'text', title: 'Review text', type: 'text', rows: 5, validation: (rule) => rule.required() }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where the review was left. "Direct" means the guest gave it to us themselves.',
      options: {
        list: [
          { title: 'Direct (collected by us)', value: 'direct' },
          { title: 'Google', value: 'google' },
          { title: 'Airbnb', value: 'airbnb' },
          { title: 'Booking.com', value: 'booking' },
        ],
        layout: 'radio',
      },
      initialValue: 'direct',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Link to the original review or listing, for reviews from another platform.',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'approved',
      title: 'Approved?',
      type: 'boolean',
      description: 'Only approved reviews appear on the site.',
      initialValue: false,
    }),
  ],
  preview: {
    select: { name: 'guestFirstName', rating: 'rating', source: 'source', property: 'property.name', approved: 'approved' },
    prepare: ({ name, rating, source, property, approved }) => ({
      title: `${name ?? 'Guest'} — ${rating ?? '?'}/5${approved ? '' : ' (not approved)'}`,
      subtitle: [property, source].filter(Boolean).join(' · '),
    }),
  },
})
