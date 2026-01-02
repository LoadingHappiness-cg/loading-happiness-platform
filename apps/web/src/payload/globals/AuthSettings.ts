import type { GlobalConfig } from 'payload';

const AuthSettings: GlobalConfig = {
  slug: 'auth-settings',
  label: 'Auth Settings',
  access: {
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'entra',
      label: 'Entra ID (OAuth/OIDC)',
      type: 'group',
      fields: [
        {
          name: 'tenantId',
          label: 'Tenant ID',
          type: 'text',
          admin: {
            description: 'Azure Entra tenant ID (GUID).',
          },
        },
        {
          name: 'clientId',
          label: 'Client ID',
          type: 'text',
          admin: {
            description: 'Azure Entra application (client) ID.',
          },
        },
        {
          name: 'clientSecret',
          label: 'Client Secret',
          type: 'text',
          admin: {
            description: 'Store securely. Rotate in Entra when needed.',
          },
        },
        {
          name: 'redirectUri',
          label: 'Redirect URI',
          type: 'text',
          admin: {
            description: 'Callback URL configured in Entra (e.g. http://127.0.0.1:3000/auth/entra/callback).',
          },
        },
        {
          name: 'allowedGroupId',
          label: 'Allowed Group ID',
          type: 'text',
          admin: {
            description: 'Optional: only allow users in this Entra group. Requires the groups claim in the token.',
          },
        },
        {
          name: 'enabled',
          label: 'Enabled',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
};

export default AuthSettings;
