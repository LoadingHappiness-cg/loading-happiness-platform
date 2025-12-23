
import type { Block } from 'payload/types';

const PullQuoteBlock: Block = {
  slug: 'pullQuote',
  fields: [
    { name: 'quote', type: 'text', required: true },
    { name: 'author', type: 'text' },
  ],
};

export default PullQuoteBlock;
