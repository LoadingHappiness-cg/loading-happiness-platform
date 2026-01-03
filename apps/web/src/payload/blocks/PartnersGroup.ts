import type { Block } from 'payload';
import { backgroundField } from '../fields/background.ts';

const PartnersGroupBlock: Block = {
    slug: 'partnersGroup',
    labels: {
        singular: 'Partners Group Section',
        plural: 'Partners Group Sections',
    },
    fields: [
        { name: 'anchorId', type: 'text' },
        { name: 'title', type: 'text', localized: true, defaultValue: 'Trusted Partners' },
        { name: 'intro', type: 'textarea', localized: true },
        {
            name: 'partners',
            type: 'relationship',
            relationTo: 'trusted-partners',
            hasMany: true,
            required: true,
        },
        backgroundField,
    ],
};

export default PartnersGroupBlock;
