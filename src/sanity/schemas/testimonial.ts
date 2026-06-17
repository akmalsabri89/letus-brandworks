import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'emphasis',
      title: 'Emphasis phrase',
      description: 'A short phrase from the quote above that will be highlighted in orange italic. Must be an exact match — copy and paste from the quote.',
      type: 'string',
    }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({
      name: 'role',
      title: 'Role & Company',
      description: 'e.g. CEO, Verdant Forge',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'active',
      title: 'Show on site',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
