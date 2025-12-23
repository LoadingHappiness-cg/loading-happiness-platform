
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
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
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
      fields: [{ name: 'value', type: 'text' }],
      admin: { description: 'Optional: helps search/consistency (e.g., MFA, 2FA).' },
    },
  ],
};

export default Tags;
