import type { Block } from 'payload';

const BulletsBlock: Block = {
  slug: 'bullets',
  interfaceName: 'BulletsBlock',
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
      labels: {
        singular: 'Item',
        plural: 'Items',
      },
      minRows: 1,
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
  ],
};

export default BulletsBlock;
