import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'visibility', title: 'Visibility' },
  ],
  fields: [
    // ── Content ──────────────────────────────────────────────
    defineField({ name: 'name', title: 'Service Name', type: 'string', group: 'content' }),
    defineField({
      name: 'displayNumber',
      title: 'Display Number',
      description: "Label shown beside the service name. Use '01', '02', '+', etc.",
      type: 'string',
      group: 'content',
    }),
    defineField({ name: 'tagline', title: 'Tagline', description: 'Short italic phrase shown under the name. e.g. Position. Provoke. Prove.', type: 'string', group: 'content' }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      description: 'Concise body shown on the homepage services section.',
      type: 'text',
      rows: 2,
      group: 'content',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      description: 'Full paragraph shown in the accordion on the /services page.',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'chips',
      title: 'Deliverable chips',
      description: 'What is included — shown as pills. Type and press Enter.',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'content',
    }),

    // ── Visibility ───────────────────────────────────────────
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Controls position across all pages.',
      type: 'number',
      group: 'visibility',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      description: 'Show on the /services page.',
      type: 'boolean',
      initialValue: true,
      group: 'visibility',
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on homepage',
      description: 'Also feature in the homepage services section. Keep this ticked only for your core offerings.',
      type: 'boolean',
      initialValue: false,
      group: 'visibility',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title, subtitle }
    },
  },
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
