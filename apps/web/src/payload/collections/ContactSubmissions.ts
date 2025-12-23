
import { CollectionConfig } from 'payload';

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
      name: 'email',
      type: 'email',
      required: true,
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
