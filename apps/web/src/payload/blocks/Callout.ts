
import { Block } from 'payload';

const CalloutBlock: Block = {
  slug: 'callout',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'content', type: 'textarea', required: true },
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
