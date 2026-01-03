import type { CollectionConfig } from 'payload';

const TrustedPartners: CollectionConfig = {
    slug: 'trusted-partners',
    admin: {
        useAsTitle: 'companyName',
        defaultColumns: ['companyName', 'category'],
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'category',
            type: 'select',
            required: true,
            options: [
                { label: 'Accounting', value: 'Accounting' },
                { label: 'Legal', value: 'Legal' },
                { label: 'Other', value: 'Other' },
            ],
        },
        {
            name: 'companyName',
            type: 'text',
            required: true,
        },
        {
            name: 'specialtyLine',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'links',
            type: 'group',
            fields: [
                { name: 'websiteUrl', type: 'text', required: true },
                { name: 'linkedinUrl', type: 'text' },
                { name: 'email', type: 'text' },
            ],
        },
        {
            name: 'trustedSince',
            type: 'text',
        },
    ],
};

export default TrustedPartners;
