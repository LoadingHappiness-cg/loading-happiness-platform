
import type { Block } from 'payload/types';

const ServicesGridBlock: Block = {
  slug: 'servicesGrid',
  labels: {
    singular: 'Services Grid',
    plural: 'Services Grids',
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
        description: 'Optional anchor ID for in-page links (e.g., "services").',
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
      name: 'intro',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'sectionIntro',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
        { name: 'icon', type: 'text', required: true },
        { name: 'link', type: 'text' },
        { name: 'tag', type: 'text', localized: true },
        {
          name: 'bulletPoints',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        { name: 'ctaLabel', type: 'text', localized: true },
        { name: 'ctaHref', type: 'text' },
        { name: 'serviceCategory', type: 'text', localized: true },
        { name: 'relatedCaseStudyLink', type: 'text' },
      ],
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
  ],
};

export default ServicesGridBlock;
