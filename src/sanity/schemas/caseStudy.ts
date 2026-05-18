import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'story', title: 'Story' },
    { name: 'assets', title: 'Assets' },
  ],
  fields: [
    // ── Overview ──────────────────────────────────────────────
    defineField({ name: 'title', title: 'Project Title', type: 'string', group: 'overview' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      group: 'overview',
    }),
    defineField({ name: 'client', title: 'Client Name', type: 'string', group: 'overview' }),
    defineField({ name: 'headline', title: 'Headline', description: 'Bold one-liner shown as the hero statement on the case study page.', type: 'string', group: 'overview' }),
    defineField({ name: 'summary', title: 'Summary', description: 'Short paragraph summarising the project (shown on listing cards and intro section).', type: 'text', rows: 3, group: 'overview' }),
    defineField({ name: 'excerpt', title: 'Excerpt (legacy)', description: 'Deprecated — use Summary instead. Kept for backward compatibility.', type: 'text', rows: 2, group: 'overview', hidden: true }),
    defineField({
      name: 'sector',
      title: 'Sector',
      description: 'Industry sector of the client.',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'category',
      title: 'Services Delivered',
      type: 'string',
      options: {
        list: ['Brand Strategy & Identity', 'Brand Identity', 'Brand Strategy', 'Logo Design', 'Web Design', 'Digital Marketing'],
      },
      group: 'overview',
    }),
    defineField({
      name: 'services',
      title: 'Services (list)',
      description: 'Individual service tags displayed on the case study page.',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'overview',
    }),
    defineField({ name: 'year', title: 'Year', type: 'number', group: 'overview' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false, group: 'overview' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', group: 'overview' }),

    // ── Story ─────────────────────────────────────────────────
    defineField({ name: 'challenge', title: 'Challenge', description: 'The problem or challenge the client faced.', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'solution', title: 'Solution', description: 'How Letus approached and solved it.', type: 'text', rows: 4, group: 'story' }),
    defineField({
      name: 'metrics',
      title: 'Metrics / Results',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
      group: 'story',
    }),
    defineField({
      name: 'stats',
      title: 'Stats (legacy)',
      description: 'Deprecated — use Metrics instead.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
      group: 'story',
      hidden: true,
    }),
    defineField({
      name: 'chapters',
      title: 'Chapters',
      description: 'Narrative sections that scroll through the case study. Each chapter becomes a ChapterIndex entry.',
      type: 'array',
      of: [{
        type: 'object',
        name: 'chapter',
        title: 'Chapter',
        fields: [
          { name: 'title', title: 'Chapter Title', type: 'string' },
          { name: 'body', title: 'Body', type: 'blockContent' },
        ],
        preview: { select: { title: 'title' } },
      }],
      group: 'story',
    }),
    defineField({ name: 'quote', title: 'Client Quote', type: 'text', rows: 3, group: 'story' }),
    defineField({ name: 'quoteBy', title: 'Quote Attribution', description: 'Name and role, e.g. "Sarah Lee, CEO of Acme"', type: 'string', group: 'story' }),
    defineField({
      name: 'content',
      title: 'Additional Content (rich text)',
      description: 'Optional freeform content block for extra context or embedded media.',
      type: 'blockContent',
      group: 'story',
    }),

    // ── Assets ────────────────────────────────────────────────
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      group: 'assets',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      description: 'Full-bleed images displayed in the case study gallery section.',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'caption', title: 'Caption', type: 'string' },
          { name: 'alt', title: 'Alt text', type: 'string' },
        ],
      }],
      group: 'assets',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'coverImage' },
  },
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Year, New', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
})
