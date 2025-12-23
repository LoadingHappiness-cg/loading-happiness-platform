
import { Block } from 'payload';

const PillarsBlock: Block = {
  slug: 'pillars',
  labels: {
    singular: 'Pillar Section',
    plural: 'Pillar Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'textarea', required: true },
        { name: 'icon', type: 'text', label: 'Icon (Emoji or Line Icon Name)', required: true },
      ],
    },
  ],
};

export default PillarsBlock;
