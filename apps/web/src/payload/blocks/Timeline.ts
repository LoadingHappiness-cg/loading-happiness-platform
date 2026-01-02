import type { Block } from 'payload';

const TimelineBlock: Block = {
    slug: 'timeline',
    interfaceName: 'TimelineBlock',
    labels: {
        singular: 'Timeline',
        plural: 'Timelines',
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
            name: 'items',
            type: 'array',
            labels: {
                singular: 'Event',
                plural: 'Events',
            },
            fields: [
                { name: 'yearOrPeriod', type: 'text', required: true, localized: true },
                { name: 'title', type: 'text', required: true, localized: true },
                { name: 'description', type: 'textarea', required: true, localized: true },
                { name: 'highlightQuote', type: 'text', localized: true },
            ],
        },
    ],
};

export default TimelineBlock;
