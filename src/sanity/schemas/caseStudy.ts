import { defineField, defineType } from 'sanity'
import { TAG_OPTIONS } from '../lib/tagOptions'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Content ──────────────────────────────────────────────
    defineField({ name: 'title', title: 'Project Title', type: 'string', group: 'content' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      group: 'content',
    }),
    defineField({ name: 'client', title: 'Client Name', type: 'string', group: 'content' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Brand Strategy & Identity', 'Brand Identity', 'Brand Strategy', 'Logo Design', 'Web Design', 'Digital Marketing'],
      },
      group: 'content',
    }),
    defineField({ name: 'year', title: 'Year', type: 'number', group: 'content' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 2, group: 'content' }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Select all that apply. Match these to blog post tags so this case study appears in relevant sidebars.',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: TAG_OPTIONS },
      group: 'content',
    }),
    defineField({
      name: 'customTags',
      title: 'Custom Tags',
      description: 'For topics not in the list above. Type a keyword and press Enter.',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'content',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false, group: 'content' }),
    defineField({ name: 'order', title: 'Display Order', description: 'Controls position in the homepage Selected Work grid (1–5).', type: 'number', group: 'content' }),

    // ── Media ────────────────────────────────────────────────
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      group: 'media',
    }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      description: 'Overrides excerpt for search snippets. Aim for 150–160 chars.',
      type: 'text',
      rows: 2,
      group: 'seo',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      description: 'Leave blank to use the default page URL. Set only if this content is cross-posted.',
      type: 'url',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'coverImage' },
  },
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
