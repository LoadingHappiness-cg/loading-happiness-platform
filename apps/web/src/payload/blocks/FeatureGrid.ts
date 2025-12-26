
import type { Block } from 'payload/types';

const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  labels: {
    singular: 'Feature Grid',
    plural: 'Feature Grids',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "features").',
      },
    },
    {
      name: 'anchorId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (briefing alias).',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'sectionTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'columns',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 4,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'content', type: 'textarea', required: true, localized: true },
        { name: 'icon', type: 'text', required: true },
        { name: 'linkLabel', type: 'text', localized: true },
        { name: 'linkHref', type: 'text' },
      ],
    },
  ],
};

export default FeatureGridBlock;
