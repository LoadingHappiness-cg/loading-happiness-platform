
import type { Block } from 'payload/types';

const PillarsBlock: Block = {
  slug: 'pillars',
  labels: {
    singular: 'Pillar Section',
    plural: 'Pillar Sections',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "values").',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'content', type: 'textarea', required: true, localized: true },
        { name: 'icon', type: 'text', label: 'Icon (Emoji or Line Icon Name)', required: true },
      ],
    },
  ],
};

export default PillarsBlock;
