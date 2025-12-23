
import type { Block } from 'payload/types';

const ProcessBlock: Block = {
  slug: 'process',
  labels: {
    singular: 'Process Section',
    plural: 'Process Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'textarea', required: true },
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

export default ProcessBlock;
