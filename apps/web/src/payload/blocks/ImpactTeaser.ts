
import type { Block } from 'payload/types';

const ImpactTeaserBlock: Block = {
  slug: 'impactTeaser',
  labels: {
    singular: 'Impact Teaser',
    plural: 'Impact Teasers',
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
        description: 'Optional anchor ID for in-page links (e.g., "impact").',
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
      name: 'content',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true, localized: true },
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'note', type: 'text', localized: true },
      ],
    },
    {
      name: 'miniCase',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    { name: 'legacyCtaLabel', type: 'text', localized: true },
    { name: 'legacyCtaHref', type: 'text' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};

export default ImpactTeaserBlock;
