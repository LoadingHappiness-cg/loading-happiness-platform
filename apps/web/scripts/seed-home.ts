import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const placeholderPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
  'base64'
);

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

const ensureMedia = async (payload: any, alt: string) => {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  });
  if (existing.docs?.[0]) {
    return existing.docs[0].id;
  }

  const tmpDir = path.join(__dirname, 'tmp');
  await fs.mkdir(tmpDir, { recursive: true });
  const filename = `${alt.replace(/\s+/g, '-').toLowerCase()}.png`;
  const filePath = path.join(tmpDir, filename);
  await fs.writeFile(filePath, placeholderPng);
  const fileData = await fs.readFile(filePath);

  const created = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: fileData,
      name: filename,
      mimetype: 'image/png',
      size: fileData.length,
    },
  });

  return created.id;
};

const main = async () => {
  await loadEnvFile();
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    throw new Error('DATABASE_URI and PAYLOAD_SECRET must be set before seeding.');
  }

  const config = (await import('../payload.config.ts')).default;
  const payload = await getPayload({ config });

  const heroImage = await ensureMedia(payload, 'Hero Image');
  const processImage = await ensureMedia(payload, 'Process Image');
  const impactImage = await ensureMedia(payload, 'Impact Image');
  const splitImage = await ensureMedia(payload, 'Split Image');
  const galleryOne = await ensureMedia(payload, 'Gallery One');
  const galleryTwo = await ensureMedia(payload, 'Gallery Two');

  const logoIds = await Promise.all([
    ensureMedia(payload, 'Logo Microsoft'),
    ensureMedia(payload, 'Logo AWS'),
    ensureMedia(payload, 'Logo Apple'),
    ensureMedia(payload, 'Logo Slack'),
    ensureMedia(payload, 'Logo Google Cloud'),
  ]);

  const layout = [
    {
      blockType: 'hero',
      variant: 'A',
      theme: 'brandGradient',
      heading: 'Technology with a human heart.',
      subheading: 'Reliable IT, clear security, and support that feels human—so your business can focus on what matters.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Explore services', link: '/services' },
      image: heroImage,
      badges: [{ text: 'Fast support' }, { text: 'Secure by design' }, { text: 'Built for SMEs' }],
    },
    {
      blockType: 'servicesGrid',
      title: 'Foundations for stability',
      services: [
        { title: 'Managed IT', description: 'Proactive support and infrastructure management that reduces noise.', icon: '💻' },
        { title: 'Cybersecurity', description: 'Practical security controls that protect without slowing you down.', icon: '🛡️' },
        { title: 'Cloud Strategy', description: 'Governed and secure M365 and Azure environments built for scale.', icon: '☁️' },
      ],
      cta: { label: 'All services', link: '/services' },
    },
    {
      blockType: 'trustPartners',
      text: 'Trusted by teams that value stability and clarity',
      logos: logoIds.map((id) => ({ logo: id, alt: 'Partner logo' })),
    },
    {
      blockType: 'pillars',
      title: 'Philosophy and Values',
      items: [
        { title: 'Integrity', content: 'We tell the truth, even when it’s uncomfortable.', icon: '⚖️' },
        { title: 'Empathy', content: 'Support isn’t just tickets. It’s people under pressure.', icon: '🤝' },
        { title: 'Pragmatism', content: 'Secure and stable beats fancy and fragile.', icon: '🛠️' },
      ],
    },
    {
      blockType: 'process',
      title: 'Our process',
      steps: [
        { title: 'Assess', content: 'We map risks, pain points, dependencies and priorities.' },
        { title: 'Stabilize', content: 'We fix what breaks the daily flow and reduce incidents.' },
        { title: 'Evolve', content: 'We improve, automate, secure, and keep things measurable.' },
      ],
      image: processImage,
    },
    {
      blockType: 'impactTeaser',
      title: 'Impact that compounds',
      content: 'Calmer teams, fewer incidents, and infrastructure that supports real work.',
      cta: { label: 'View impact', link: '/impact' },
      image: impactImage,
    },
    {
      blockType: 'videoEmbed',
      title: 'Hear how we work',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      caption: 'A short overview of how we stabilize and evolve IT environments.',
    },
    {
      blockType: 'imageGallery',
      title: 'A glimpse inside',
      images: [
        { image: galleryOne, alt: 'Team in session' },
        { image: galleryTwo, alt: 'Infrastructure review' },
      ],
    },
    {
      blockType: 'splitContent',
      title: 'Why choose us',
      content: 'We focus on stable outcomes, documented choices, and accountable support.',
      items: [
        { item: 'Senior-level expertise, practical decisions' },
        { item: 'Security as a foundation, not a sales pitch' },
        { item: 'Documentation that survives people changes' },
      ],
      cta: { label: 'Book a call', link: '/contact' },
      image: splitImage,
      reverse: true,
    },
    {
      blockType: 'featureGrid',
      title: 'What we deliver',
      columns: 3,
      items: [
        { title: 'Clarity', content: 'Clear priorities and documented choices.', icon: '🧭' },
        { title: 'Calm', content: 'Proactive support that reduces noise.', icon: '🌊' },
        { title: 'Continuity', content: 'Systems that survive people changes.', icon: '🔁' },
      ],
    },
    {
      blockType: 'finalCTA',
      title: 'Ready for calmer IT operations?',
      content: 'Let’s look at what’s breaking your flow and create a plan that works.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact' },
    },
  ];

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  });

  if (existing.docs?.[0]) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: {
        title: 'Home',
        slug: 'home',
        status: 'published',
        layout,
        seo: {
          title: 'Loading Happiness | Human-Centric IT',
          description: 'Reliable IT, clear security, and support that feels human.',
        },
      },
    });
  } else {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        status: 'published',
        layout,
        seo: {
          title: 'Loading Happiness | Human-Centric IT',
          description: 'Reliable IT, clear security, and support that feels human.',
        },
      },
    });
  }

  // eslint-disable-next-line no-console
  console.log('Home page seeded.');
  process.exit(0);
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
