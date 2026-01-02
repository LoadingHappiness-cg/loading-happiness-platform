import type { Block } from 'payload';

const ValueCardsBlock: Block = {
  slug: 'valueCards',
  labels: {
    singular: 'Value Cards',
    plural: 'Value Cards',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "value").',
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
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'text', type: 'textarea', required: true, localized: true },
        { name: 'icon', type: 'text' },
      ],
    },
  ],
};

export default ValueCardsBlock;
