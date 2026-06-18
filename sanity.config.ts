import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
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
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        draftMode: { enable: '/api/draft-mode/enable' },
      },
    }),
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
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})
