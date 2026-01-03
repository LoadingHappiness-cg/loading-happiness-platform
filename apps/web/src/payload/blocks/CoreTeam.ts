import type { Block } from 'payload';
import { backgroundField } from '../fields/background.ts';

const CoreTeamBlock: Block = {
    slug: 'coreTeam',
    labels: {
        singular: 'Core Team Section',
        plural: 'Core Team Sections',
    },
    fields: [
        { name: 'anchorId', type: 'text' },
        { name: 'title', type: 'text', localized: true, defaultValue: 'Core Team' },
        { name: 'intro', type: 'textarea', localized: true },
        {
            name: 'members',
            type: 'relationship',
            relationTo: 'team-members',
            hasMany: true,
            required: true,
        },
        backgroundField,
    ],
};

export default CoreTeamBlock;
