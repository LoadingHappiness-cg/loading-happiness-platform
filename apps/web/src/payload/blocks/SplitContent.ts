
import type { Block } from 'payload';

const SplitContentBlock: Block = {
  slug: 'splitContent',
  labels: {
    singular: 'Split Content',
    plural: 'Split Content Sections',
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
        description: 'Optional anchor ID for in-page links (e.g., "overview").',
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
      name: 'bodyRichText',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'content',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'item', type: 'text', localized: true }
      ]
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'link', type: 'text' },
      ],
    },
    { name: 'legacyCtaLabel', type: 'text', localized: true },
    { name: 'legacyCtaHref', type: 'text' },
    { name: 'secondaryLinkLabel', type: 'text', localized: true },
    { name: 'secondaryLinkHref', type: 'text' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'imageRight',
      options: [
        { label: 'Image Right', value: 'imageRight' },
        { label: 'Image Left', value: 'imageLeft' },
      ],
    },
    {
      name: 'reverse',
      type: 'checkbox',
      label: 'Reverse Layout (Image Left)',
      defaultValue: false,
    },
  ],
};

export default SplitContentBlock;
