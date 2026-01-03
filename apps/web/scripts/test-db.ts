import { getPayload } from 'payload';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

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

    try {
        const result = await (payload.db as any).drizzle.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'pages_blocks_hero'");
        console.log('Columns in pages_blocks_hero:', result.rows.map((r: any) => r.column_name));
    } catch (e: any) {
        console.error('Query failed:', e.message);
    }

    process.exit(0);
};

main();
