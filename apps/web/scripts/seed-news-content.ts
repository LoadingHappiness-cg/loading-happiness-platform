import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const placeholderPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
  'base64',
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

const upsertSimple = async (payload: any, collection: string, slug: string, data: any) => {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    locale: 'pt',
  });
  if (existing.totalDocs > 0) {
    const id = existing.docs[0].id;
    await payload.update({ collection, id, data, locale: 'pt' });
    return id;
  }
  const created = await payload.create({ collection, data, locale: 'pt' });
  return created.id;
};

const upsertAuthor = async (payload: any, name: string, data: any) => {
  const existing = await payload.find({
    collection: 'authors',
    where: { name: { equals: name } },
    limit: 1,
    locale: 'pt',
  });
  if (existing.totalDocs > 0) {
    const id = existing.docs[0].id;
    await payload.update({ collection: 'authors', id, data, locale: 'pt' });
    return id;
  }
  const created = await payload.create({ collection: 'authors', data, locale: 'pt' });
  return created.id;
};

const upsertCategory = async (payload: any, slug: string, data: any) => upsertSimple(payload, 'categories', slug, data);
const upsertTag = async (payload: any, slug: string, data: any) => upsertSimple(payload, 'tags', slug, data);

const upsertContent = async (
  payload: any,
  slug: string,
  dataPt: any,
  dataEn: any,
) => {
  const existing = await payload.find({
    collection: 'content',
    where: { slug: { equals: slug } },
    limit: 1,
    locale: 'pt',
  });

  const common = {
    status: 'published',
    heroStyle: 'Large',
    contentType: dataPt.contentType,
    authors: dataPt.authors,
    categories: dataPt.categories,
    tags: dataPt.tags,
    featuredImage: dataPt.featuredImage,
    highlightLevel: dataPt.highlightLevel,
    highlightOrder: dataPt.highlightOrder,
    publishedAt: dataPt.publishedAt,
    seo: dataPt.seo,
  };

  if (existing.totalDocs > 0) {
    const id = existing.docs[0].id;
    await payload.update({
      collection: 'content',
      id,
      data: {
        ...common,
        title: dataPt.title,
        slug: dataPt.slug,
        excerpt: dataPt.excerpt,
        body: dataPt.body,
      },
      locale: 'pt',
    });

    await payload.update({
      collection: 'content',
      id,
      data: {
        ...common,
        title: dataEn.title,
        slug: dataEn.slug,
        excerpt: dataEn.excerpt,
        body: dataEn.body,
        seo: dataEn.seo,
      },
      locale: 'en',
    });
    return id;
  }

  const created = await payload.create({
    collection: 'content',
    data: {
      ...common,
      title: dataPt.title,
      slug: dataPt.slug,
      excerpt: dataPt.excerpt,
      body: dataPt.body,
    },
    locale: 'pt',
  });

  await payload.update({
    collection: 'content',
    id: created.id,
    data: {
      ...common,
      title: dataEn.title,
      slug: dataEn.slug,
      excerpt: dataEn.excerpt,
      body: dataEn.body,
      seo: dataEn.seo,
    },
    locale: 'en',
  });

  return created.id;
};

const updateNewsPageOverrides = async (payload: any, primaryId: string, secondaryIds: string[]) => {
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'news' } },
    limit: 1,
    locale: 'pt',
  });
  if (!page.docs[0]) return;
  const id = page.docs[0].id;
  const data = {
    newsHighlights: {
      primary: primaryId,
      secondary: secondaryIds,
    },
  };
  await payload.update({ collection: 'pages', id, data, locale: 'pt' });
  await payload.update({ collection: 'pages', id, data, locale: 'en' });
};

const setNewsLayout = async (payload: any) => {
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'news' } },
    limit: 1,
    locale: 'pt',
  });
  if (!page.docs[0]) return;
  const id = page.docs[0].id;

  const baseLayout = (locale: 'pt' | 'en') => [
    {
      blockType: 'hero',
      variant: 'B',
      theme: 'brandGradient',
      heading:
        locale === 'pt'
          ? 'Notícias, insights e segurança para PME'
          : 'News, insights, and security for SMEs',
      subheading:
        locale === 'pt'
          ? 'Análises curtas, guias práticos e novidades sobre operação de TI, cloud e segurança.'
          : 'Short analyses, practical guides, and updates on IT operations, cloud, and security.',
      primaryCTA: { label: locale === 'pt' ? 'Subscrever' : 'Subscribe', link: '/contact' },
      secondaryCTA: { label: locale === 'pt' ? 'Falar connosco' : 'Talk to us', link: '/contact' },
    },
    {
      blockType: 'richText',
      content:
        locale === 'pt'
          ? 'Destacamos riscos reais, práticas testadas e aprendizados de projetos com PMEs em Portugal.'
          : 'We highlight real risks, proven practices, and lessons from SME projects in Portugal.',
    },
    {
      blockType: 'finalCTA',
      sectionId: 'cta',
      title: locale === 'pt' ? 'Precisas de ajuda agora?' : 'Need help right now?',
      content:
        locale === 'pt'
          ? 'Fala connosco para avaliar a tua situação e priorizar o que dá mais impacto já.'
          : 'Talk to us to assess your situation and prioritize what moves the needle now.',
      primaryCTA: { label: locale === 'pt' ? 'Marcar conversa' : 'Book a call', link: '/contact' },
      secondaryCTA: { label: locale === 'pt' ? 'Enviar mensagem' : 'Send a message', link: '/contact#form' },
    },
  ];

  await payload.update({
    collection: 'pages',
    id,
    data: { layout: baseLayout('pt') },
    locale: 'pt',
  });
  await payload.update({
    collection: 'pages',
    id,
    data: { layout: baseLayout('en') },
    locale: 'en',
  });
};

const main = async () => {
  await loadEnvFile();
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    throw new Error('DATABASE_URI e PAYLOAD_SECRET têm de estar definidos antes de seed.');
  }

  const config = (await import('../payload.config.ts')).default;
  const payload = await getPayload({ config });

  // Media
  const heroImg = await ensureMedia(payload, 'News Hero');
  const secImg = await ensureMedia(payload, 'News Secondary');
  const gridImg = await ensureMedia(payload, 'News Grid');

  // Taxonomy
  const authorId = await upsertAuthor(payload, 'Equipa Loading Happiness', {
    name: 'Equipa Loading Happiness',
    role: 'Engineering & Security',
  });

  const categories = {
    insights: await upsertCategory(payload, 'insights', {
      name: 'Insights',
      slug: 'insights',
      description: 'Análises rápidas e tendências.',
    }),
    guides: await upsertCategory(payload, 'guias', {
      name: 'Guias',
      slug: 'guias',
      description: 'Passo a passo e checklists.',
    }),
  };

  const tags = {
    security: await upsertTag(payload, 'seguranca', {
      name: 'Segurança',
      slug: 'seguranca',
      color: '#0EA5E9',
    }),
    continuity: await upsertTag(payload, 'continuity', {
      name: 'Continuidade',
      slug: 'continuity',
      color: '#F59E0B',
    }),
    cloud: await upsertTag(payload, 'cloud', {
      name: 'Cloud',
      slug: 'cloud',
      color: '#7C3AED',
    }),
  };

  const now = new Date();
  const iso = (offsetDays: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() - offsetDays);
    return d.toISOString();
  };

  const postsData = [
    {
      slug: 'mfa-pragmatico-pme',
      highlightLevel: 'primary',
      highlightOrder: 10,
      title: {
        pt: 'MFA pragmático para PME: como fechar 80% do risco em 7 dias',
        en: 'Pragmatic MFA for SMEs: close 80% of risk in 7 days',
      },
      excerpt: {
        pt: 'Checklist curta para ativar MFA onde dói mais, sem bloquear utilizadores.',
        en: 'Short checklist to enable MFA where it matters most without blocking users.',
      },
      contentType: 'Guide',
      publishedAt: iso(2),
      featuredImage: heroImg,
      seo: {
        title: { pt: 'MFA para PME sem drama', en: 'Pragmatic MFA for SMEs' },
        description: {
          pt: 'Passos práticos para ativar MFA em contas críticas e reduzir risco já.',
          en: 'Practical steps to enable MFA on critical accounts and reduce risk now.',
        },
      },
      body: {
        pt: [
          {
            blockType: 'richText',
            content: 'Foca em contas admin, email e VPN. Comunica, testa e mede adesão.',
          },
        ],
        en: [
          {
            blockType: 'richText',
            content: 'Focus on admin, email, and VPN accounts. Communicate, test, and measure adoption.',
          },
        ],
      },
      tags: [tags.security],
      categories: [categories.guides],
      authors: [authorId],
    },
    {
      slug: 'backups-321-ransomware',
      highlightLevel: 'secondary',
      highlightOrder: 9,
      title: {
        pt: 'Backups 3-2-1: o que validar em cada trimestre',
        en: '3-2-1 backups: what to validate each quarter',
      },
      excerpt: {
        pt: 'Checklist rápida: imutabilidade, testes de restore e alerta de falhas.',
        en: 'Quick checklist: immutability, restore tests, and failure alerts.',
      },
      contentType: 'Guide',
      publishedAt: iso(7),
      featuredImage: secImg,
      seo: {
        title: { pt: 'Backups que restauram', en: 'Backups that actually restore' },
        description: {
          pt: 'Como garantir que o 3-2-1 está mesmo a funcionar e não é só teoria.',
          en: 'How to ensure 3-2-1 is actually working, not just theory.',
        },
      },
      body: {
        pt: [{ blockType: 'richText', content: 'Testa restauros trimestralmente e regista tempo e sucesso.' }],
        en: [{ blockType: 'richText', content: 'Test restores quarterly and log time and success.' }],
      },
      tags: [tags.continuity],
      categories: [categories.guides],
      authors: [authorId],
    },
    {
      slug: 'licencas-m365-sem-desperdicio',
      highlightLevel: 'secondary',
      highlightOrder: 8,
      title: {
        pt: 'Licenças M365 sem desperdício: 5 verificações mensais',
        en: 'No-waste M365 licensing: 5 monthly checks',
      },
      excerpt: {
        pt: 'Recolhe dados, remove contas órfãs e ajusta planos à realidade.',
        en: 'Pull data, remove orphaned accounts, and right-size plans.',
      },
      contentType: 'Article',
      publishedAt: iso(12),
      featuredImage: secImg,
      seo: {
        title: { pt: 'Licenciamento M365 eficiente', en: 'Efficient M365 licensing' },
        description: {
          pt: 'Checklist para reduzir 20–30% de desperdício em licenças.',
          en: 'Checklist to cut 20–30% of license waste.',
        },
      },
      body: {
        pt: [{ blockType: 'richText', content: 'Orfãos, downgrades e políticas de retenção alinhadas.' }],
        en: [{ blockType: 'richText', content: 'Orphans, downgrades, and retention policies aligned.' }],
      },
      tags: [tags.cloud],
      categories: [categories.insights],
      authors: [authorId],
    },
    {
      slug: 'rede-wifi-estavel-em-escritorios',
      highlightLevel: 'none',
      highlightOrder: 0,
      title: {
        pt: 'Rede e Wi-Fi estáveis: 4 passos para escritórios cheios',
        en: 'Stable Wi-Fi in busy offices: 4 practical steps',
      },
      excerpt: {
        pt: 'Site survey ligeiro, segmentação e tuning antes de comprar hardware novo.',
        en: 'Light site survey, segmentation, and tuning before buying new gear.',
      },
      contentType: 'Article',
      publishedAt: iso(18),
      featuredImage: gridImg,
      seo: {
        title: { pt: 'Wi-Fi estável com passos simples', en: 'Stable Wi-Fi with simple steps' },
        description: {
          pt: 'Como reduzir quedas e latência sem mudar tudo.',
          en: 'How to reduce drops and latency without replacing everything.',
        },
      },
      body: {
        pt: [{ blockType: 'richText', content: 'Mapeia zonas críticas, ajusta canais e potência, separa tráfego convidado.' }],
        en: [{ blockType: 'richText', content: 'Map critical zones, tune channels/power, separate guest traffic.' }],
      },
      tags: [tags.continuity],
      categories: [categories.insights],
      authors: [authorId],
    },
    {
      slug: 'resposta-incidentes-90-dias',
      highlightLevel: 'none',
      highlightOrder: 0,
      title: {
        pt: 'Resposta a incidentes em 90 dias: playbooks mínimos',
        en: 'Incident response in 90 days: minimum viable playbooks',
      },
      excerpt: {
        pt: 'Definir quem faz o quê, em que ordem e como comunicar.',
        en: 'Define who does what, in which order, and how to communicate.',
      },
      contentType: 'Guide',
      publishedAt: iso(25),
      featuredImage: gridImg,
      seo: {
        title: { pt: 'Playbooks rápidos de IR', en: 'Lean incident response playbooks' },
        description: {
          pt: 'Estrutura simples para reduzir caos em incidentes.',
          en: 'Simple structure to reduce chaos during incidents.',
        },
      },
      body: {
        pt: [{ blockType: 'richText', content: 'Playbooks para email comprometido, ransomware e perda de dispositivo.' }],
        en: [{ blockType: 'richText', content: 'Playbooks for compromised email, ransomware, and lost device.' }],
      },
      tags: [tags.security],
      categories: [categories.guides],
      authors: [authorId],
    },
  ];

  const createdIds: string[] = [];

  for (const post of postsData) {
    const id = await upsertContent(
      payload,
      post.slug,
      {
        title: post.title.pt,
        slug: post.slug,
        excerpt: post.excerpt.pt,
        body: post.body.pt,
        featuredImage: post.featuredImage,
        tags: post.tags,
        categories: post.categories,
        authors: post.authors,
        highlightLevel: post.highlightLevel,
        highlightOrder: post.highlightOrder,
        publishedAt: post.publishedAt,
        contentType: post.contentType,
        seo: {
          title: post.seo.title.pt,
          description: post.seo.description.pt,
        },
      },
      {
        title: post.title.en,
        slug: post.slug,
        excerpt: post.excerpt.en,
        body: post.body.en,
        featuredImage: post.featuredImage,
        tags: post.tags,
        categories: post.categories,
        authors: post.authors,
        highlightLevel: post.highlightLevel,
        highlightOrder: post.highlightOrder,
        publishedAt: post.publishedAt,
        contentType: post.contentType,
        seo: {
          title: post.seo.title.en,
          description: post.seo.description.en,
        },
      },
    );
    createdIds.push(id);
    console.log(`upserted post ${post.slug} (${id})`);
  }

  // Set overrides (primary + top 2 secondary)
  const primaryId = createdIds[0];
  const secondaryIds = createdIds.slice(1, 3);
  await updateNewsPageOverrides(payload, primaryId, secondaryIds);
  console.log('Updated news overrides', { primaryId, secondaryIds });

  await setNewsLayout(payload);
  console.log('Updated news layout for pt/en');

  process.exit(0);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
