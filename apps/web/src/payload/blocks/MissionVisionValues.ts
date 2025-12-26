import type { Block } from 'payload/types';

const MissionVisionValuesBlock: Block = {
    slug: 'mission-vision-values',
    interfaceName: 'MissionVisionValuesBlock',
    labels: {
        singular: 'Mission, Vision & Values',
        plural: 'Mission, Vision & Values',
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
            name: 'mission',
            type: 'textarea',
            required: true,
            localized: true,
        },
        {
            name: 'vision',
            type: 'textarea',
            required: true,
            localized: true,
        },
        {
            name: 'values',
            type: 'array',
            required: true,
            labels: {
                singular: 'Value',
                plural: 'Values',
            },
            admin: {
                useAsTitle: 'title',
            },
            fields: [
                { name: 'title', type: 'text', required: true, localized: true },
                { name: 'description', type: 'textarea', required: true, localized: true },
                { name: 'proofBehavior', type: 'text', localized: true },
            ],
        },
    ],
};

export default MissionVisionValuesBlock;
