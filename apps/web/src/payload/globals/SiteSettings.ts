import type { GlobalConfig } from 'payload/types';

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  fields: [
    {
      name: 'header',
      type: 'group',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'logoAlt',
          type: 'text',
          localized: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', localized: true, required: true },
            { name: 'href', type: 'text', required: true },
            {
              name: 'type',
              type: 'select',
              defaultValue: 'link',
              options: [
                { label: 'Link', value: 'link' },
                { label: 'Dropdown', value: 'dropdown' },
              ],
            },
            {
              name: 'items',
              type: 'array',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'dropdown',
              },
              fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'href', type: 'text' },
                { name: 'description', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'topBar',
          type: 'group',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: false },
            { name: 'businessHoursOnly', type: 'checkbox', defaultValue: true },
            { name: 'text', type: 'text', localized: true },
            { name: 'linkLabel', type: 'text', localized: true },
            { name: 'linkHref', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'logoAlt',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'email',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'columns',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', localized: true },
            {
              name: 'links',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'href', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'bottomText',
          type: 'text',
          localized: true,
        },
        {
          name: 'customHtml',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Optional HTML snippet rendered in the footer.',
          },
        },
      ],
    },
  ],
};

export default SiteSettings;
