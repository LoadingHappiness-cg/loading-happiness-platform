
import type { Block } from 'payload/types';

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
      localized: true,
    },
    {
      name: 'content',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'item', type: 'text', localized: true }
      ]
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true },
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
