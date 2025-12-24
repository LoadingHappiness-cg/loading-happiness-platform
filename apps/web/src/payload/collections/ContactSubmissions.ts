
import type { CollectionConfig } from 'payload/types';

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'createdAt'],
  },
  access: {
    create: () => true, // Allow anyone to submit the contact form
    read: ({ req: { user } }) => !!user, // Only allow authenticated users to read submissions
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'topic',
      type: 'select',
      options: [
        { label: 'Managed IT', value: 'managed-it' },
        { label: 'Cybersecurity', value: 'cybersecurity' },
        { label: 'Cloud & M365', value: 'cloud' },
        { label: 'Projects', value: 'projects' },
        { label: 'General', value: 'general' },
      ],
    },
    {
      name: 'urgency',
      type: 'select',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Urgent', value: 'urgent' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
  timestamps: true,
};

export default ContactSubmissions;
