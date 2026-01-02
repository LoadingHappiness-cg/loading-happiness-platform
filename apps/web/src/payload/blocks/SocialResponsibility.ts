import type { Block } from 'payload';

const SocialResponsibilityBlock: Block = {
    slug: 'social-responsibility',
    interfaceName: 'SocialResponsibilityBlock',
    labels: {
        singular: 'Social Responsibility',
        plural: 'Social Responsibility',
    },
    fields: [
        {
            name: 'enabled',
            type: 'checkbox',
            defaultValue: true,
        },
        {
            name: 'sectionTitle',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'intro',
            type: 'textarea',
            localized: true,
        },
        {
            name: 'initiatives',
            type: 'array',
            labels: {
                singular: 'Initiative',
                plural: 'Initiatives',
            },
            fields: [
                { name: 'title', type: 'text', required: true, localized: true },
                { name: 'description', type: 'textarea', required: true, localized: true },
                {
                    name: 'status',
                    type: 'select',
                    defaultValue: 'planned',
                    options: [
                        { label: 'Active', value: 'active' },
                        { label: 'Planned', value: 'planned' },
                        { label: 'Completed', value: 'completed' },
                    ]
                },
                { name: 'link', type: 'text' },
            ],
        },
        {
            name: 'cta',
            type: 'group',
            fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'href', type: 'text' },
            ]
        }
    ],
};

export default SocialResponsibilityBlock;
