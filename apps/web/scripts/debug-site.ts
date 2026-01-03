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
    } catch { }
};

const main = async () => {
    await loadEnvFile();
    const config = (await import('../payload.config.ts')).default;
    const payload = await getPayload({ config });

    const slug = 'about';
    const page = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        locale: 'pt',
    });

    console.log(`--- PAGE: ${slug} (pt) ---`);
    if (page.docs.length === 0) {
        console.log('Page not found');
    } else {
        const doc = page.docs[0];
        console.log('ID:', doc.id);
        console.log('Status:', doc.status);
        console.log('Layout Blocks:', doc.layout?.map((b: any) => b.blockType));
    }

    const teamPage = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'team' } },
        locale: 'pt',
    });

    console.log(`--- PAGE: team (pt) ---`);
    if (teamPage.docs.length === 0) {
        console.log('Page not found');
    } else {
        const doc = teamPage.docs[0];
        console.log('ID:', doc.id);
        console.log('Status:', doc.status);
        console.log('Layout Blocks:', doc.layout?.map((b: any) => b.blockType));
    }

    const settings = await payload.findGlobal({
        slug: 'site-settings',
        locale: 'pt',
    });
    console.log('--- GLOBAL: site-settings (pt) ---');
    console.log('Header Links:', JSON.stringify(settings.header?.links?.map((l: any) => ({ label: l.label, href: l.href, type: l.type, subItems: l.items?.length })), null, 2));

    process.exit(0);
};

main();
