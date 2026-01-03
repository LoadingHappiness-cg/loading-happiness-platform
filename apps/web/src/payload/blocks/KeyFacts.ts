import type { Block } from 'payload';

const KeyFactsBlock: Block = {
    slug: 'keyFacts',
    labels: {
        singular: 'Key Facts',
        plural: 'Key Facts',
    },
    fields: [
        {
            name: 'sectionId',
            type: 'text',
            admin: {
                description: 'Optional anchor ID for in-page links (e.g., "key-facts").',
            },
        },
        {
            name: 'title',
            type: 'text',
            localized: true,
        },
        {
            name: 'facts',
            type: 'array',
            labels: {
                singular: 'Fact',
                plural: 'Facts',
            },
            fields: [
                { name: 'label', type: 'text', required: true, localized: true },
                { name: 'value', type: 'text', required: true, localized: true },
            ],
        },
    ],
};

export default KeyFactsBlock;
