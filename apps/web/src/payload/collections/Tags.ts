
import type { CollectionConfig } from 'payload';

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      localized: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value;
            const name = data?.name as string | undefined;
            if (!name) return value;
            return name
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-');
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 220,
      localized: true,
    },
    {
      name: 'color',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional hex like #0EA5E9 for consistent tag badges.',
      },
    },
    {
      name: 'synonyms',
      type: 'array',
      required: false,
      fields: [{ name: 'value', type: 'text', localized: true }],
      admin: { description: 'Optional: helps search/consistency (e.g., MFA, 2FA).' },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
};

export default Tags;
