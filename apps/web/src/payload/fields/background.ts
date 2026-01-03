import type { Field } from 'payload';

export const backgroundField: Field = {
    name: 'background',
    type: 'group',
    admin: {
        description: 'Adjust the background, overlay, and motion settings for this section.',
    },
    fields: [
        {
            name: 'type',
            type: 'select',
            defaultValue: 'color',
            options: [
                { label: 'Solid Color', value: 'color' },
                { label: 'Image / Photo', value: 'image' },
                { label: 'Gradient', value: 'gradient' },
            ],
        },
        {
            name: 'color',
            type: 'select',
            defaultValue: 'white',
            options: [
                { label: 'White', value: 'white' },
                { label: 'Light Gray', value: 'gray' },
                { label: 'Dark (Ink)', value: 'dark' },
                { label: 'Brand Ocean', value: 'ocean' },
            ],
            admin: {
                condition: (_, siblingData) => siblingData?.type === 'color',
            },
        },
        {
            name: 'gradient',
            type: 'select',
            defaultValue: 'brand',
            options: [
                { label: 'Brand (Ocean -> Teal)', value: 'brand' },
                { label: 'Subtle (White -> Gray)', value: 'subtle' },
                { label: 'Dark (Ink -> Ocean)', value: 'dark' },
            ],
            admin: {
                condition: (_, siblingData) => siblingData?.type === 'gradient',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            admin: {
                condition: (_, siblingData) => siblingData?.type === 'image',
            },
        },
        {
            type: 'row',
            admin: {
                condition: (_, siblingData) => siblingData?.type === 'image',
            },
            fields: [
                {
                    name: 'overlay',
                    type: 'select',
                    defaultValue: 'none',
                    options: [
                        { label: 'None', value: 'none' },
                        { label: 'Black Overlay', value: 'black' },
                        { label: 'White Overlay', value: 'white' },
                        { label: 'Brand Gradient Overlay', value: 'brand' },
                    ],
                },
                {
                    name: 'opacity',
                    type: 'select',
                    defaultValue: '50',
                    options: [
                        { label: '10%', value: '10' },
                        { label: '30%', value: '30' },
                        { label: '50%', value: '50' },
                        { label: '70%', value: '70' },
                        { label: '90%', value: '90' },
                    ],
                    admin: {
                        condition: (_, siblingData) => siblingData?.overlay && siblingData?.overlay !== 'none',
                    },
                },
            ],
        },
        {
            name: 'settings',
            type: 'group',
            admin: {
                condition: (_, siblingData) => siblingData?.type === 'image',
            },
            fields: [
                {
                    name: 'parallax',
                    type: 'checkbox',
                    label: 'Enable Parallax Effect',
                    defaultValue: false,
                },
                {
                    name: 'slightMotion',
                    type: 'checkbox',
                    label: 'Enable Slow Zoom/Motion',
                    defaultValue: false,
                },
            ]
        },
    ],
};
