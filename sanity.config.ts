import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool, defineLocations } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

const previewOrigin =
  process.env.NODE_ENV === 'production'
    ? 'https://letusbrandworks.com'
    : 'http://localhost:3000'

export default defineConfig({
  name: 'letus-brandworks',
  title: 'Letus Brandworks',
  projectId: 'ca47tnzo',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'siteSettings'
            ),
          ]),
    }),
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        draftMode: { enable: '/api/draft-mode/enable' },
      },
      resolve: {
        locations: {
          service: defineLocations({
            select: { name: 'name', showOnHomepage: 'showOnHomepage' },
            resolve: (doc) => ({
              locations: [
                { title: doc?.name ?? 'Service', href: '/services' },
                ...(doc?.showOnHomepage ? [{ title: 'Homepage', href: '/' }] : []),
              ],
            }),
          }),
          testimonial: defineLocations({
            select: { name: 'name' },
            resolve: (doc) => ({
              locations: [{ title: doc?.name ?? 'Testimonial', href: '/' }],
            }),
          }),
          caseStudy: defineLocations({
            select: { title: 'title', slug: 'slug.current', featured: 'featured' },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title ?? 'Case Study', href: `/works/${doc?.slug}` },
                ...(doc?.featured ? [{ title: 'Homepage', href: '/' }] : []),
              ],
            }),
          }),
          post: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title ?? 'Post', href: `/blogs/${doc?.slug}` },
              ],
            }),
          }),
          siteSettings: defineLocations({
            select: {},
            resolve: () => ({
              locations: [
                { title: 'Homepage', href: '/' },
                { title: 'Contact', href: '/contact' },
              ],
            }),
          }),
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})
