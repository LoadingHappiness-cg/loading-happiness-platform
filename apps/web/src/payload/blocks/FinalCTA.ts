
import { Block } from 'payload';

const FinalCTABlock: Block = {
  slug: 'finalCTA',
  labels: {
    singular: 'Final CTA Banner',
    plural: 'Final CTA Banners',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
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
  ],
};

export default FinalCTABlock;
