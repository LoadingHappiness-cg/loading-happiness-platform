import type { CollectionConfig } from 'payload';

const TeamMembers: CollectionConfig = {
    slug: 'team-members',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'roleTitle', 'avatarType'],
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'roleTitle',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'oneLiner',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'bio',
            type: 'textarea',
            required: true,
            localized: true,
        },
        {
            name: 'photo',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'avatarType',
            type: 'select',
            defaultValue: 'photo',
            options: [
                { label: 'Photo', value: 'photo' },
                { label: 'Icon', value: 'icon' },
                { label: 'Illustration', value: 'illustration' },
                { label: 'Gradient', value: 'gradient' },
            ],
        },
        {
            name: 'tags',
            type: 'array',
            maxRows: 5,
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    localized: true,
                },
            ],
        },
        {
            name: 'links',
            type: 'group',
            fields: [
                { name: 'linkedinUrl', type: 'text' },
                { name: 'email', type: 'text' },
                { name: 'githubUrl', type: 'text' },
                { name: 'websiteUrl', type: 'text' },
            ],
        },
    ],
};

export default TeamMembers;
