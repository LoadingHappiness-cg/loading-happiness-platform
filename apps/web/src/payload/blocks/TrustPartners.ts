
import type { Block } from 'payload/types';

const TrustPartnersBlock: Block = {
  slug: 'trustPartners',
  labels: {
    singular: 'Trust Partners',
    plural: 'Trust Partners Sections',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "partners").',
      },
    },
    {
      name: 'text',
      type: 'text',
      label: 'Section Text',
      defaultValue: 'Trusted by teams that value stability and clarity',
      localized: true,
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Partner Logos',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
};

export default TrustPartnersBlock;
