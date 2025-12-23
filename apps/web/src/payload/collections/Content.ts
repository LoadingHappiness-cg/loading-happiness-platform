
import { CollectionConfig } from 'payload';
import PullQuoteBlock from '../blocks/PullQuote';
import CalloutBlock from '../blocks/Callout';
import ChecklistBlock from '../blocks/Checklist';
import FAQBlock from '../blocks/FAQ';

const Content: CollectionConfig = {
  slug: 'content',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'contentType', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      defaultValue: 'Article',
      options: [
        { label: 'Article', value: 'Article' },
        { label: 'Opinion', value: 'Opinion' },
        { label: 'Video', value: 'Video' },
        { label: 'Guide', value: 'Guide' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 240,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heroStyle',
      type: 'select',
      defaultValue: 'Large',
      options: [
        { label: 'Large Image', value: 'Large' },
        { label: 'Small Image', value: 'Small' },
        { label: 'No Image', value: 'None' },
      ],
    },
    {
      name: 'body',
      type: 'blocks',
      required: true,
      blocks: [
        {
          slug: 'richText',
          fields: [{ name: 'content', type: 'textarea', required: true }],
        },
        PullQuoteBlock,
        CalloutBlock,
        ChecklistBlock,
        FAQBlock,
        {
          slug: 'media',
          fields: [
            { name: 'file', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'videoData',
      type: 'group',
      admin: {
        condition: (data) => data.contentType === 'Video',
      },
      fields: [
        {
          name: 'provider',
          type: 'select',
          options: [
            { label: 'YouTube', value: 'YouTube' },
            { label: 'Vimeo', value: 'Vimeo' },
          ],
        },
        { name: 'url', type: 'text' },
        { name: 'duration', type: 'text' },
        { name: 'transcript', type: 'textarea' },
      ],
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'authors',
      hasMany: true,
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Recommended: 3–6 tags per post.'
      }
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};

export default Content;
