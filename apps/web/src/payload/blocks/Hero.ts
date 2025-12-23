
import type { Block } from 'payload/types';

const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: true,
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'badges',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', required: true }
      ],
    },
  ],
};

export default HeroBlock;
