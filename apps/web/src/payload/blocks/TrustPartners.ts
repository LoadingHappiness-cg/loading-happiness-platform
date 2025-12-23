
import { Block } from 'payload';

const TrustPartnersBlock: Block = {
  slug: 'trustPartners',
  labels: {
    singular: 'Trust Partners',
    plural: 'Trust Partners Sections',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Section Text',
      defaultValue: 'Trusted by teams that value stability and clarity',
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
        },
      ],
    },
  ],
};

export default TrustPartnersBlock;
