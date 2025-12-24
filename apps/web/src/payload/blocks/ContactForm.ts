import type { Block } from 'payload/types';

const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "contact").',
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
      name: 'submitLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Send Message',
    },
    {
      name: 'topics',
      type: 'array',
      fields: [{ name: 'label', type: 'text', localized: true }],
      admin: {
        description: 'Optional dropdown topics. Leave empty to hide the field.',
      },
    },
  ],
};

export default ContactFormBlock;
