import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadEnvFile = async () => {
  const envPath = path.resolve(__dirname, '../.env.local');
  try {
    const contents = await fs.readFile(envPath, 'utf8');
    for (const line of contents.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      if (!key) continue;
      const value = rest.join('=').trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // Ignore missing env file.
  }
};

const main = async () => {
  await loadEnvFile();
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    throw new Error('DATABASE_URI and PAYLOAD_SECRET must be set before creating an admin.');
  }

  const config = (await import('../payload.config.ts')).default;
  const payload = await getPayload({ config });

  const email = process.env.ADMIN_EMAIL || 'admin@loadinghappiness.local';
  const password = process.env.ADMIN_PASSWORD || 'LoadingHappiness!123';

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.docs?.[0]) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
    },
  });

  console.log('Admin created.');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
