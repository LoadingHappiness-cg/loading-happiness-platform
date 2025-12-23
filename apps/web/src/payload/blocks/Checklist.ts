
import type { Block } from 'payload/types';

const ChecklistBlock: Block = {
  slug: 'checklist',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [{ name: 'item', type: 'text', required: true }],
    },
  ],
};

export default ChecklistBlock;
