
import { Block } from 'payload';

const PullQuoteBlock: Block = {
  slug: 'pullQuote',
  fields: [
    { name: 'quote', type: 'text', required: true },
    { name: 'author', type: 'text' },
  ],
};

export default PullQuoteBlock;
