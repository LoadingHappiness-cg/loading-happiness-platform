
import type { Block } from 'payload/types';

const ServicesGridBlock: Block = {
  slug: 'servicesGrid',
  labels: {
    singular: 'Services Grid',
    plural: 'Services Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
        { name: 'icon', type: 'text', required: true },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'link', type: 'text' },
      ],
    },
  ],
};

export default ServicesGridBlock;
