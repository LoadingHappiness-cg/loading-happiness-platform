
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import Pages from './src/payload/collections/Pages.ts';
import ContactSubmissions from './src/payload/collections/ContactSubmissions.ts';
import NewsletterSignups from './src/payload/collections/NewsletterSignups.ts';
import Content from './src/payload/collections/Content.ts';
import Authors from './src/payload/collections/Authors.ts';
import Categories from './src/payload/collections/Categories.ts';
import Tags from './src/payload/collections/Tags.ts';
import SiteSettings from './src/payload/globals/SiteSettings.ts';
import AuthSettings from './src/payload/globals/AuthSettings.ts';
import { s3Storage } from '@payloadcms/storage-s3';

const databaseUri = process.env.DATABASE_URI;
const payloadSecret = process.env.PAYLOAD_SECRET;

if (!databaseUri) {
  throw new Error('DATABASE_URI is required for Payload.');
}

if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET is required for Payload.');
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  secret: payloadSecret,
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
  }),
  localization: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    fallback: true,
  },
  admin: {
    user: 'users',
    components: {
      beforeDashboard: ['/app/(payload)/admin/components/CustomDashboard#default'],
      beforeLogin: ['/app/(payload)/admin/components/EntraLogin#EntraLogin'],
      logout: {
        Button: '/app/(payload)/admin/components/LogoutButton#LogoutButton',
      },
    },
    importMap: {
      baseDir: path.resolve(process.cwd()),
      autoGenerate: false,
    },
  },
  routes: {
    admin: '/admin',
    api: '/api',
  },
  collections: [
    Pages,
    Content,
    Authors,
    Categories,
    Tags,
    ContactSubmissions,
    NewsletterSignups,
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [
        {
          name: 'entraId',
          type: 'text',
          unique: true,
          admin: { position: 'sidebar' },
        },
      ],
    },
    {
      slug: 'media',
      access: {
        create: ({ req: { user } }) => !!user,
        read: () => true,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
      },
      upload: {
        staticURL: process.env.MEDIA_PUBLIC_URL || 'https://media.loadinghappiness.com',
        disableLocalStorage: true,
        imageSizes: [
          { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [{ name: 'alt', type: 'text' }],
    },
  ],
  globals: [SiteSettings, AuthSettings],
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || 'public-media',
      config: {
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
        endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
        forcePathStyle: true,
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(process.cwd(), 'src/payload-types.ts'),
    autoGenerate: false,
  },
  graphQL: {
    schemaOutputFile: path.resolve(process.cwd(), 'src/generated-schema.graphql'),
  },
});
