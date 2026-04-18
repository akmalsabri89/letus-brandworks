import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Content ──────────────────────────────────────────────
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'content',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', description: 'Short summary shown on listing cards and below the title.', type: 'text', rows: 2, group: 'content' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Brand Strategy', 'Design', 'Business', 'Marketing', 'Behind the Scenes'],
      },
      group: 'content',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Type a keyword and press comma or Enter to add. Keywords for SEO and GEO.',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'content',
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', group: 'content' }),
    defineField({ name: 'content', title: 'Content', type: 'blockContent', group: 'content' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false, group: 'content' }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      description: 'Overrides excerpt for <meta name="description"> and search snippets. Aim for 150–160 chars.',
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
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
  orderings: [
    { title: 'Published Date, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
})
