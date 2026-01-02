import type { Block } from 'payload';

const CaseStudyTeaserBlock: Block = {
  slug: 'caseStudyTeaser',
  labels: {
    singular: 'Case Study Teaser',
    plural: 'Case Study Teasers',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "case-studies").',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'industry', type: 'text', localized: true },
        { name: 'challenge', type: 'textarea', localized: true },
        { name: 'result', type: 'text', localized: true },
        { name: 'link', type: 'text' },
      ],
    },
  ],
};

export default CaseStudyTeaserBlock;
