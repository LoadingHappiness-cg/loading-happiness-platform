import type { Block } from 'payload';

const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "testimonials").',
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
        { name: 'quote', type: 'textarea', required: true, localized: true },
        { name: 'name', type: 'text', required: true, localized: true },
        { name: 'role', type: 'text', localized: true },
        { name: 'company', type: 'text', localized: true },
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};

export default TestimonialsBlock;
