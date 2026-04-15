import { defineType, defineArrayMember } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
      },
    }),
    defineArrayMember({
      name: 'imageBlock',
      title: 'Image',
      type: 'object',
      fields: [
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        { name: 'caption', title: 'Caption', type: 'string' },
        {
          name: 'layout',
          title: 'Layout',
          type: 'string',
          options: { list: ['full', 'contained', 'grid-2', 'grid-3'], layout: 'radio' },
          initialValue: 'full',
        },
      ],
      preview: { select: { media: 'image', title: 'caption' } },
    }),
    defineArrayMember({
      name: 'videoBlock',
      title: 'Video',
      type: 'object',
      fields: [
        { name: 'url', title: 'Video URL (YouTube / Vimeo)', type: 'url' },
        { name: 'caption', title: 'Caption', type: 'string' },
      ],
      preview: { select: { title: 'url' } },
    }),
    defineArrayMember({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
          options: {
            list: ['Problem', 'Challenge', 'Solution', 'Process', 'Result', 'Strategy', 'Identity', 'Custom'],
          },
        },
        { name: 'customLabel', title: 'Custom label (if Custom selected)', type: 'string' },
      ],
      preview: { select: { title: 'label' } },
    }),
  ],
})
