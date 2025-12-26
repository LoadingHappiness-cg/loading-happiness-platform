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

  const heroImage = await ensureMedia(payload, 'Hero Contact');
  const supportImage = await ensureMedia(payload, 'Contact Support');

  const layoutPt = [
    {
      blockType: 'hero',
      enabled: true,
      anchorId: 'top',
      variant: 'A',
      theme: 'brandGradient',
      eyebrow: 'Contacto',
      h1Title: 'Fale connosco com clareza e sem burocracia',
      heading: 'Fale connosco com clareza e sem burocracia',
      subheadline:
        'Conte-nos o seu contexto. Respondemos com um plano direto, prazos realistas e uma proposta transparente.',
      subheading:
        'Conte-nos o seu contexto. Respondemos com um plano direto, prazos realistas e uma proposta transparente.',
      trustLine: 'Resposta em 1 dia útil | Portugal e remoto',
      primaryCTA: { label: 'Enviar mensagem', link: '#form', trackingId: 'contact-hero-primary' },
      secondaryCTA: { label: 'Ver serviços', link: '/services' },
      heroImage,
      image: heroImage,
      mediaType: 'illustration',
      badges: [
        { label: 'Atendimento humano e direto' },
        { label: 'Sem vendas agressivas' },
        { label: 'Foco em estabilidade' },
      ],
    },
    {
      blockType: 'splitContent',
      enabled: true,
      anchorId: 'expectations',
      title: 'O que pode esperar',
      sectionTitle: 'O que pode esperar',
      bodyRichText:
        'O primeiro contacto serve para alinhar prioridades. Explicamos o que faria mais impacto e o que pode esperar em custos e prazos.',
      items: [
        { item: 'Diagnóstico rápido do contexto' },
        { item: 'Plano inicial com prioridades claras' },
        { item: 'Transparência total em custos e prazos' },
      ],
      ctaLabel: 'Agendar chamada',
      ctaHref: '/contact',
      secondaryLinkLabel: 'Conhecer a equipa',
      secondaryLinkHref: '/about',
      image: supportImage,
      layout: 'imageRight',
    },
    {
      blockType: 'contactForm',
      sectionId: 'form',
      title: 'Conte-nos o essencial',
      intro: 'Responderemos normalmente em 1 dia útil.',
      submitLabel: 'Enviar mensagem',
      topics: [
        { label: 'TI Gerida' },
        { label: 'Cibersegurança' },
        { label: 'Infraestrutura e Cloud' },
        { label: 'Projetos e Consultoria' },
        { label: 'Outro' },
      ],
    },
    {
      blockType: 'faq',
      sectionId: 'faq',
      title: 'Perguntas frequentes',
      items: [
        {
          question: 'Qual o tempo normal de resposta?',
          answer: 'Respondemos no mesmo dia útil sempre que possível. Em casos urgentes, priorizamos o contacto.',
        },
        {
          question: 'Trabalham com equipas remotas?',
          answer: 'Sim. Operamos remotamente e fazemos visitas planeadas quando faz sentido.',
        },
        {
          question: 'Podem apoiar apenas um projeto específico?',
          answer: 'Sim. Atuamos por projeto ou em regime contínuo, conforme a necessidade.',
        },
      ],
    },
  ];

  const layoutEn = [
    {
      blockType: 'hero',
      enabled: true,
      anchorId: 'top',
      variant: 'A',
      theme: 'brandGradient',
      eyebrow: 'Contact',
      h1Title: 'Talk to us with clarity and no bureaucracy',
      heading: 'Talk to us with clarity and no bureaucracy',
      subheadline:
        'Share your context. We reply with a direct plan, realistic timelines, and transparent pricing.',
      subheading:
        'Share your context. We reply with a direct plan, realistic timelines, and transparent pricing.',
      trustLine: 'Reply within 1 business day | Portugal and remote',
      primaryCTA: { label: 'Send a message', link: '#form', trackingId: 'contact-hero-primary' },
      secondaryCTA: { label: 'See services', link: '/services' },
      heroImage,
      image: heroImage,
      mediaType: 'illustration',
      badges: [
        { label: 'Human, direct support' },
        { label: 'No aggressive sales' },
        { label: 'Stability first' },
      ],
    },
    {
      blockType: 'splitContent',
      enabled: true,
      anchorId: 'expectations',
      title: 'What to expect',
      sectionTitle: 'What to expect',
      bodyRichText:
        'The first contact aligns priorities. We explain where the biggest impact is and what to expect in cost and timing.',
      items: [
        { item: 'Quick diagnostic of the context' },
        { item: 'Initial plan with clear priorities' },
        { item: 'Full transparency on cost and timeline' },
      ],
      ctaLabel: 'Schedule a call',
      ctaHref: '/contact',
      secondaryLinkLabel: 'Meet the team',
      secondaryLinkHref: '/about',
      image: supportImage,
      layout: 'imageRight',
    },
    {
      blockType: 'contactForm',
      sectionId: 'form',
      title: 'Share the essentials',
      intro: 'We typically reply within one business day.',
      submitLabel: 'Send message',
      topics: [
        { label: 'Managed IT' },
        { label: 'Cybersecurity' },
        { label: 'Infrastructure and Cloud' },
        { label: 'Projects and Consulting' },
        { label: 'Other' },
      ],
    },
    {
      blockType: 'faq',
      sectionId: 'faq',
      title: 'Common questions',
      items: [
        {
          question: 'How fast do you reply?',
          answer: 'We reply on the same business day whenever possible. Urgent requests are prioritized.',
        },
        {
          question: 'Do you support remote teams?',
          answer: 'Yes. We work remotely and schedule visits when they add value.',
        },
        {
          question: 'Can you help with a single project?',
          answer: 'Yes. We work on projects or as an ongoing partner, depending on what you need.',
        },
      ],
    },
  ];

  const seoPt = {
    title: 'Contacto | Loading Happiness',
    description: 'Fale connosco para uma resposta clara, humana e orientada ao seu negócio.',
    image: heroImage,
  };

  const seoEn = {
    title: 'Contact | Loading Happiness',
    description: 'Reach out for a clear, human, and customer-first response.',
    image: heroImage,
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
    locale: 'pt',
  });

  let pageId = existing.docs?.[0]?.id;
  if (pageId) {
    await payload.update({
      collection: 'pages',
      id: pageId,
      locale: 'pt',
      data: {
        title: 'Contacto',
        slug: 'contact',
        status: 'published',
        layout: layoutPt,
        seo: seoPt,
      },
    });
  } else {
    const created = await payload.create({
      collection: 'pages',
      locale: 'pt',
      data: {
        title: 'Contacto',
        slug: 'contact',
        status: 'published',
        layout: layoutPt,
        seo: seoPt,
      },
    });
    pageId = created.id;
  }

  await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'en',
    data: {
      title: 'Contact',
      slug: 'contact',
      status: 'published',
      layout: layoutEn,
      seo: seoEn,
    },
  });

  // eslint-disable-next-line no-console
  console.log('Contact page seeded (PT and EN).');
  process.exit(0);
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
