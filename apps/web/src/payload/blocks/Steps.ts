import type { Block } from 'payload';

const StepsBlock: Block = {
  slug: 'steps',
  labels: {
    singular: 'Steps',
    plural: 'Steps',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "steps").',
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
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'text', type: 'text', localized: true },
      ],
    },
  ],
};

export default StepsBlock;
