
import type { Block } from 'payload';

const PullQuoteBlock: Block = {
  slug: 'pullQuote',
  fields: [
    { name: 'quote', type: 'text', required: true, localized: true },
    { name: 'author', type: 'text', localized: true },
  ],
};

export default PullQuoteBlock;
