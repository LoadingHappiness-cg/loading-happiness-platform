
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import Pages from './src/payload/collections/Pages.ts';
import ContactSubmissions from './src/payload/collections/ContactSubmissions.ts';
import Content from './src/payload/collections/Content.ts';
import Authors from './src/payload/collections/Authors.ts';
import Categories from './src/payload/collections/Categories.ts';
import Tags from './src/payload/collections/Tags.ts';
import SiteSettings from './src/payload/globals/SiteSettings.ts';

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
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [],
    },
    {
      slug: 'media',
      upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
          { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [{ name: 'alt', type: 'text' }],
    },
  ],
  globals: [SiteSettings],
  typescript: {
    outputFile: path.resolve(process.cwd(), 'src/payload-types.ts'),
    autoGenerate: false,
  },
  graphQL: {
    schemaOutputFile: path.resolve(process.cwd(), 'src/generated-schema.graphql'),
  },
});
