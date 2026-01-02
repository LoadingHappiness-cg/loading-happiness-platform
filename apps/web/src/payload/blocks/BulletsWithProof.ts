import type { Block } from 'payload';

const BulletsWithProofBlock: Block = {
  slug: 'bulletsWithProof',
  labels: {
    singular: 'Bullets with Proof',
    plural: 'Bullets with Proof',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "why-choose-us").',
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
      name: 'bullets',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'text', type: 'text', localized: true }],
    },
    {
      name: 'proofTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'proofText',
      type: 'textarea',
      localized: true,
    },
  ],
};

export default BulletsWithProofBlock;
