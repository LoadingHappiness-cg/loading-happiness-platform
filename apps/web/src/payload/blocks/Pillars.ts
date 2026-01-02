
import type { Block } from 'payload';

const PillarsBlock: Block = {
  slug: 'pillars',
  labels: {
    singular: 'Pillar Section',
    plural: 'Pillar Sections',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "values").',
      },
    },
    {
      name: 'anchorId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (briefing alias).',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'sectionTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 3,
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'content', type: 'textarea', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'icon', type: 'text', label: 'Icon (Emoji or Line Icon Name)', required: true },
        { name: 'proofPoint', type: 'text', localized: true },
      ],
    },
  ],
};

export default PillarsBlock;
