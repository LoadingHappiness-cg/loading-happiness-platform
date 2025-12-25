import type { Block } from 'payload/types';

const BulletsBlock: Block = {
  slug: 'bullets',
  labels: {
    singular: 'Bullets',
    plural: 'Bullets',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "who-its-for").',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
  ],
};

export default BulletsBlock;
