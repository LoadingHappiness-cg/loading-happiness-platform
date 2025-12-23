
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import Pages from './src/payload/collections/Pages';
import ContactSubmissions from './src/payload/collections/ContactSubmissions';
import Content from './src/payload/collections/Content';
import Authors from './src/payload/collections/Authors';
import Categories from './src/payload/collections/Categories';
import Tags from './src/payload/collections/Tags';

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
    connectionString: databaseUri,
  }),
  admin: {
    user: 'users',
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
  typescript: {
    outputFile: path.resolve(process.cwd(), 'src/payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(process.cwd(), 'src/generated-schema.graphql'),
  },
});
