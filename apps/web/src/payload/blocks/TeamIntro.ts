import type { Block } from 'payload';

const TeamIntroBlock: Block = {
  slug: 'teamIntro',
  labels: {
    singular: 'Team Intro',
    plural: 'Team Intros',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "our-team").',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'text',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'role', type: 'text', localized: true },
        { name: 'text', type: 'textarea', localized: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'socialLink',
          type: 'text',
        },
        {
          name: 'tags',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaLink',
      type: 'text',
    },
  ],
};

export default TeamIntroBlock;
