
import { Block } from 'payload';

const SplitContentBlock: Block = {
  slug: 'splitContent',
  labels: {
    singular: 'Split Content',
    plural: 'Split Content Sections',
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
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'item', type: 'text' }
      ]
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'reverse',
      type: 'boolean',
      label: 'Reverse Layout (Image Left)',
      defaultValue: false,
    },
  ],
};

export default SplitContentBlock;
