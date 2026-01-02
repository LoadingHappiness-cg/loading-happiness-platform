import type { Block } from 'payload';

const TwoColumnListBlock: Block = {
  slug: 'twoColumnList',
  labels: {
    singular: 'Two Column List',
    plural: 'Two Column Lists',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "partnership").',
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
      name: 'leftTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'leftItems',
      type: 'array',
      fields: [{ name: 'text', type: 'text', localized: true }],
    },
    {
      name: 'rightTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'rightItems',
      type: 'array',
      fields: [{ name: 'text', type: 'text', localized: true }],
    },
  ],
};

export default TwoColumnListBlock;
