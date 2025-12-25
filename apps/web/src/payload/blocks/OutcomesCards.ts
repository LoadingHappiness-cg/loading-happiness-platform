import type { Block } from 'payload/types';

const OutcomesCardsBlock: Block = {
  slug: 'outcomesCards',
  labels: {
    singular: 'Outcomes Cards',
    plural: 'Outcomes Cards',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "outcomes").',
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
        { name: 'text', type: 'text', localized: true },
      ],
    },
  ],
};

export default OutcomesCardsBlock;
