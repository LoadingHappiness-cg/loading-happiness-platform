
import type { CollectionConfig } from 'payload';
import PullQuoteBlock from '../blocks/PullQuote.ts';
import CalloutBlock from '../blocks/Callout.ts';
import ChecklistBlock from '../blocks/Checklist.ts';
import FAQBlock from '../blocks/FAQ.ts';

const Content: CollectionConfig = {
  slug: 'content',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'contentType', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
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
      localized: true,
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
          fields: [{ name: 'content', type: 'textarea', required: true, localized: true }],
        },
        PullQuoteBlock,
        CalloutBlock,
        ChecklistBlock,
        FAQBlock,
        {
          slug: 'media',
          fields: [
            { name: 'file', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption', type: 'text', localized: true },
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
        { name: 'transcript', type: 'textarea', localized: true },
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
      label: 'SEO & Social',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'SEO title (leave empty to use post title). Max 60 characters.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          maxLength: 160,
          admin: {
            description: 'Meta description for search engines. Max 160 characters.',
          },
        },
        {
          name: 'keywords',
          type: 'array',
          label: 'SEO Keywords',
          admin: {
            description: 'Keywords for SEO (generated automatically or add manually)',
          },
          fields: [
            {
              name: 'keyword',
              type: 'text',
            },
          ],
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Share Image',
          admin: {
            description: 'Image for social media sharing (Facebook, LinkedIn, etc.). Recommended: 1200x630px',
          },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          label: 'No Index',
          defaultValue: false,
          admin: {
            description: 'Prevent search engines from indexing this post',
          },
        },
      ],
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Reading Time (minutes)',
      admin: {
        position: 'sidebar',
        description: 'Calculated automatically on save',
        readOnly: true,
      },
    },
    {
      name: 'tableOfContents',
      type: 'json',
      label: 'Table of Contents',
      admin: {
        description: 'Generated automatically from headings',
        readOnly: true,
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'content',
      hasMany: true,
      maxRows: 3,
      label: 'Related Posts',
      admin: {
        description: 'Manually select or auto-generated based on content similarity',
      },
    },
    {
      name: 'enableComments',
      type: 'checkbox',
      label: 'Enable Comments',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Post',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this post in featured sections',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }: any) => {
        // Calculate reading time
        if (data.body && Array.isArray(data.body)) {
          let totalWords = 0;
          data.body.forEach((block: any) => {
            if (block.blockType === 'richText' && block.content) {
              const words = block.content.trim().split(/\s+/).length;
              totalWords += words;
            }
          });
          data.readingTime = Math.ceil(totalWords / 200); // 200 words per minute
        }

        // Generate slug from title if not provided
        if (!data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }

        return data;
      },
    ],
  },
};

export default Content;
