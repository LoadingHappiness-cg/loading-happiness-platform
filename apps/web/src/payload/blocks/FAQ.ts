
import type { Block } from 'payload/types';

const FAQBlock: Block = {
  slug: 'faq',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
};

export default FAQBlock;
