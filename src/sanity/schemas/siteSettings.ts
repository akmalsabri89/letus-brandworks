import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact', default: true },
    { name: 'social', title: 'Social' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    // ── Contact ──────────────────────────────────────────────
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'number', title: 'Number (no spaces, with country code — e.g. 60143693225)', type: 'string' }),
        defineField({ name: 'display', title: 'Display text (e.g. +6014-369 3225)', type: 'string' }),
      ],
    }),

    // ── Social ───────────────────────────────────────────────
    defineField({
      name: 'socials',
      title: 'Social Links',
      description: 'These appear in the footer and contact page. Drag to reorder.',
      type: 'array',
      group: 'social',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
              list: ['Instagram', 'LinkedIn', 'Behance', 'Facebook', 'TikTok', 'X (Twitter)'],
            },
          }),
          defineField({ name: 'url', title: 'URL', type: 'url' }),
        ],
        preview: { select: { title: 'platform', subtitle: 'url' } },
      }],
    }),

    // ── Footer ───────────────────────────────────────────────
    defineField({
      name: 'footerHeading',
      title: 'Footer CTA Heading',
      type: 'string',
      group: 'footer',
      initialValue: 'Ready to ignite your brand?',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
