
import type { Block } from 'payload/types';

const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  labels: {
    singular: 'Feature Grid',
    plural: 'Feature Grids',
  },
  fields: [
    {
      name: 'title',
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
      ],
    },
  ],
};

export default FeatureGridBlock;
