
import { Block } from 'payload';

const ImpactTeaserBlock: Block = {
  slug: 'impactTeaser',
  labels: {
    singular: 'Impact Teaser',
    plural: 'Impact Teasers',
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
      name: 'cta',
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
  ],
};

export default ImpactTeaserBlock;
