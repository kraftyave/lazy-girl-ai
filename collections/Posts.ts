import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${data.slug}`,
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          UnorderedListFeature(),
          OrderedListFeature(),
          LinkFeature(),
          BlocksFeature({
            blocks: [
              {
                slug: 'tip',
                labels: { singular: 'Lazy Girl Tip', plural: 'Lazy Girl Tips' },
                fields: [{ name: 'text', type: 'textarea', required: true }],
              },
              {
                slug: 'callout',
                labels: { singular: 'Callout', plural: 'Callouts' },
                fields: [{ name: 'text', type: 'textarea', required: true }],
              },
              {
                slug: 'promptBox',
                labels: { singular: 'Prompt Box', plural: 'Prompt Boxes' },
                fields: [
                  { name: 'label', type: 'text' },
                  { name: 'prompt', type: 'textarea', required: true },
                ],
              },
            ],
          }),
        ],
      }),
    },
    // Sidebar fields
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Tools', value: 'tools' },
        { label: 'AI Updates', value: 'ai-updates' },
        { label: 'Productivity', value: 'productivity' },
        { label: 'Content', value: 'content' },
        { label: 'Career', value: 'career' },
        { label: 'Money', value: 'money' },
        { label: 'Opinion', value: 'opinion' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'array',
      admin: { position: 'sidebar' },
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'MMM d, yyyy' },
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time in minutes',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'coverImageUrl',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'External image URL (used if no uploaded cover image)',
      },
    },
  ],
}
