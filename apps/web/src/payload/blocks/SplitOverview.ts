import type { Block } from 'payload';

const SplitOverviewBlock: Block = {
  slug: 'splitOverview',
  labels: {
    singular: 'Split Overview',
    plural: 'Split Overviews',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "company-overview").',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'content',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'sideTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'sideItems',
      type: 'array',
      fields: [{ name: 'text', type: 'text', localized: true }],
    },
  ],
};

export default SplitOverviewBlock;
