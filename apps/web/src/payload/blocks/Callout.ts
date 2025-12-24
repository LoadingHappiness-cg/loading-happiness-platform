
import type { Block } from 'payload/types';

const CalloutBlock: Block = {
  slug: 'callout',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'content', type: 'textarea', required: true, localized: true },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Tip', value: 'tip' },
      ],
    },
  ],
};

export default CalloutBlock;
