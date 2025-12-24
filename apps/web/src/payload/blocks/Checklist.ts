
import type { Block } from 'payload/types';

const ChecklistBlock: Block = {
  slug: 'checklist',
  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [{ name: 'item', type: 'text', required: true, localized: true }],
    },
  ],
};

export default ChecklistBlock;
