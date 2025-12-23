
import { Block } from 'payload';

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
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'textarea', required: true },
        { name: 'icon', type: 'text', required: true },
      ],
    },
  ],
};

export default FeatureGridBlock;
