import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import type { Page } from '../src/payload-types';

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
  const impactImage = await ensureMedia(payload, 'Impact Image');
  const splitImage = await ensureMedia(payload, 'Split Image');

  const logoIds = await Promise.all([
    ensureMedia(payload, 'Logo Microsoft'),
    ensureMedia(payload, 'Logo AWS'),
    ensureMedia(payload, 'Logo Apple'),
    ensureMedia(payload, 'Logo Slack'),
    ensureMedia(payload, 'Logo Google Cloud'),
  ]);

  const layoutPt: any = [
    {
      blockType: 'hero',
      enabled: true,
      anchorId: 'top',
      variant: 'A',
      theme: 'brandGradient',
      eyebrow: 'High-Tech, High-Touch',
      h1Title: 'Tecnologia com coracao humano.',
      heading: 'Tecnologia com coracao humano.',
      subheadline:
        'Solucoes de TI que servem pessoas. Transformamos sistemas complexos em crescimento sustentavel para o seu negocio.',
      subheading:
        'Solucoes de TI que servem pessoas. Transformamos sistemas complexos em crescimento sustentavel para o seu negocio.',
      trustLine: 'Tecnologia humanizada · Parceria · Clareza · Eficiencia',
      keywordsInline: 'Tecnologia humanizada / parceria / clareza / eficiencia / felicidade',
      primaryCTA: { label: 'Comecar projeto', link: '/contact', trackingId: 'hero-primary' },
      secondaryCTA: { label: 'O nosso manifesto', link: '/about' },
      heroImage,
      image: heroImage,
      mediaType: 'image',
    },
    {
      blockType: 'trustPartners',
      enabled: true,
      anchorId: 'partners',
      sectionTitle: 'A impulsionar a felicidade digital em empresas como:',
      trustCopy: 'Parcerias que valorizam clareza, eficiencia e tecnologia humanizada.',
      logos: logoIds.map((id, index) => ({
        logo: id,
        name: `Cliente ${index + 1}`,
        alt: 'Logo de cliente',
      })),
    },
    {
      blockType: 'servicesGrid',
      enabled: true,
      anchorId: 'services',
      title: 'O que fazemos',
      sectionTitle: 'O que fazemos',
      sectionIntro: 'Clareza na oferta, sem jargao e com foco no impacto.',
      services: [
        {
          title: 'Consultoria estrategica',
          description: 'Diagnostico e alinhamento de TI com objetivos de negocio.',
          icon: 'STRAT',
          link: '/services/strategy-roadmaps',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/strategy-roadmaps',
          serviceCategory: 'Consultoria estrategica',
        },
        {
          title: 'Desenvolvimento e automacao',
          description: 'ERPs a medida e plataformas que poupam tempo.',
          icon: 'AUTO',
          link: '/services/managed-it',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/managed-it',
          serviceCategory: 'Desenvolvimento e automacao',
        },
        {
          title: 'Ciberseguranca',
          description: 'Protecao de dados com foco na prevencao e continuidade.',
          icon: 'SEC',
          link: '/services/cybersecurity',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/cybersecurity',
          serviceCategory: 'Ciberseguranca',
        },
        {
          title: 'Suporte humanizado',
          description: 'Resposta rapida, sem tecnices, olhos nos olhos.',
          icon: 'SUP',
          link: '/services/managed-it',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/managed-it',
          serviceCategory: 'Suporte humanizado',
        },
      ],
      ctaLabel: 'Ver todos os servicos',
      ctaHref: '/services',
    },
    {
      blockType: 'splitContent',
      enabled: true,
      anchorId: 'partnership',
      title: 'A parceria certa.',
      sectionTitle: 'A parceria certa.',
      bodyRichText:
        'Pessoas primeiro, transparencia radical e excelencia tecnica. Trabalhamos como parceiros locais, com proximidade e rigor de engenharia.',
      items: [
        { item: 'Pessoas primeiro: o lucro e consequencia, nao o unico fim.' },
        { item: 'Transparencia radical: sem custos ocultos ou dependencias forcadas.' },
        { item: 'Excelencia tecnica: rigor de engenharia com proximidade local.' },
      ],
      cta: { label: 'Ver o manifesto', link: '/about' },
      secondaryLinkLabel: 'Conhecer a equipa',
      secondaryLinkHref: '/about',
      image: splitImage,
      layout: 'imageRight',
    },
    {
      blockType: 'impactTeaser',
      enabled: true,
      anchorId: 'impact',
      title: 'Impacto social',
      sectionTitle: 'Impacto social',
      content:
        'O nosso sucesso partilha-se. Apoiamos ativamente causas sociais e projetos pro bono, porque a tecnologia deve ser acessivel a todos.',
      metrics: [
        { value: 'Pro bono ativo', label: 'Compromisso' },
        { value: 'Projetos locais', label: 'Comunidade' },
        { value: 'Tecnologia inclusiva', label: 'Acesso' },
      ],
      miniCase: 'Fazemos parcerias com associacoes e escolas para reduzir a distancia digital.',
      cta: {
        label: 'Ver impacto social',
        link: '/impact',
      },
      ctaLabel: 'Ver impacto social',
      ctaHref: '/impact',
      image: impactImage,
    },
    {
      blockType: 'testimonials',
      enabled: true,
      anchorId: 'testimonials',
      title: 'O que dizem os nossos clientes',
      intro: 'Testemunhos curtos, diretos e humanos.',
      items: [
        {
          quote: 'Servico rapido, profissional e, acima de tudo, humano. Recomendo vivamente.',
          name: 'Ricardo Araujo',
          role: 'CEO',
          company: 'Flores no Cais',
          logo: logoIds[0],
        },
        {
          quote: 'Finalmente temos clareza e previsibilidade na nossa TI.',
          name: 'Ana Silva',
          role: 'COO',
          company: 'Florineve',
          logo: logoIds[1],
        },
      ],
    },
    {
      blockType: 'finalCTA',
      enabled: true,
      anchorId: 'contact',
      title: 'Pronto para comecar?',
      content: 'Conta-nos o contexto e delineamos o caminho mais simples.',
      subtitle: 'Conta-nos o contexto e delineamos o caminho mais simples.',
      primaryCTA: { label: 'Comecar projeto', link: '/contact' },
      secondaryCTA: { label: 'O nosso manifesto', link: '/about' },
      microcopy: 'Resposta tipica em 1 dia util.',
    },
  ];

  const layoutEn: any = [
    {
      blockType: 'hero',
      enabled: true,
      anchorId: 'top',
      variant: 'A',
      theme: 'brandGradient',
      eyebrow: 'High-Tech, High-Touch',
      h1Title: 'Technology with a human heart.',
      heading: 'Technology with a human heart.',
      subheadline:
        'IT solutions that serve people. We turn complex systems into sustainable growth for your business.',
      subheading:
        'IT solutions that serve people. We turn complex systems into sustainable growth for your business.',
      trustLine: 'Humanized technology · Partnership · Clarity · Efficiency',
      keywordsInline: 'humanized technology / partnership / clarity / efficiency / happiness',
      primaryCTA: { label: 'Start a project', link: '/contact', trackingId: 'hero-primary' },
      secondaryCTA: { label: 'Our manifesto', link: '/about' },
      heroImage,
      image: heroImage,
      mediaType: 'image',
    },
    {
      blockType: 'trustPartners',
      enabled: true,
      anchorId: 'partners',
      sectionTitle: 'Powering digital happiness in companies like:',
      trustCopy: 'Partners who value clarity, efficiency, and humanized technology.',
      logos: logoIds.map((id, index) => ({
        logo: id,
        name: `Client ${index + 1}`,
        alt: 'Client logo',
      })),
    },
    {
      blockType: 'servicesGrid',
      enabled: true,
      anchorId: 'services',
      title: 'What we do',
      sectionTitle: 'What we do',
      sectionIntro: 'Clear services, no jargon, focused on outcomes.',
      services: [
        {
          title: 'Strategic consulting',
          description: 'Diagnostics and IT alignment with business goals.',
          icon: 'STRAT',
          link: '/services/strategy-roadmaps',
          ctaLabel: 'Learn more',
          ctaHref: '/services/strategy-roadmaps',
          serviceCategory: 'Strategic consulting',
        },
        {
          title: 'Development and automation',
          description: 'Custom ERPs and platforms that save time.',
          icon: 'AUTO',
          link: '/services/managed-it',
          ctaLabel: 'Learn more',
          ctaHref: '/services/managed-it',
          serviceCategory: 'Development and automation',
        },
        {
          title: 'Cybersecurity',
          description: 'Data protection focused on prevention and continuity.',
          icon: 'SEC',
          link: '/services/cybersecurity',
          ctaLabel: 'Learn more',
          ctaHref: '/services/cybersecurity',
          serviceCategory: 'Cybersecurity',
        },
        {
          title: 'Human support',
          description: 'Fast response, plain language, eye to eye.',
          icon: 'SUP',
          link: '/services/managed-it',
          ctaLabel: 'Learn more',
          ctaHref: '/services/managed-it',
          serviceCategory: 'Human support',
        },
      ],
      ctaLabel: 'View all services',
      ctaHref: '/services',
    },
    {
      blockType: 'splitContent',
      enabled: true,
      anchorId: 'partnership',
      title: 'The right partnership.',
      sectionTitle: 'The right partnership.',
      bodyRichText:
        'People first, radical transparency, and technical excellence. We act as local partners with engineering-grade rigor.',
      items: [
        { item: 'People first: profit is a consequence, not the only goal.' },
        { item: 'Radical transparency: no hidden costs or forced lock-in.' },
        { item: 'Technical excellence: engineering rigor with local proximity.' },
      ],
      cta: { label: 'Read the manifesto', link: '/about' },
      secondaryLinkLabel: 'Meet the team',
      secondaryLinkHref: '/about',
      image: splitImage,
      layout: 'imageRight',
    },
    {
      blockType: 'impactTeaser',
      enabled: true,
      anchorId: 'impact',
      title: 'Social impact',
      sectionTitle: 'Social impact',
      content:
        'We share our success. We actively support social causes and pro bono projects because technology should be accessible to everyone.',
      metrics: [
        { value: 'Active pro bono', label: 'Commitment' },
        { value: 'Local projects', label: 'Community' },
        { value: 'Inclusive tech', label: 'Access' },
      ],
      miniCase: 'We partner with associations and schools to close the digital gap.',
      cta: {
        label: 'See social impact',
        link: '/impact',
      },
      ctaLabel: 'See social impact',
      ctaHref: '/impact',
      image: impactImage,
    },
    {
      blockType: 'testimonials',
      enabled: true,
      anchorId: 'testimonials',
      title: 'What our clients say',
      intro: 'Short, direct, and human feedback.',
      items: [
        {
          quote: 'Fast, professional, and above all human. Highly recommended.',
          name: 'Ricardo Araujo',
          role: 'CEO',
          company: 'Flores no Cais',
          logo: logoIds[0],
        },
        {
          quote: 'We finally have clarity and predictability in our IT.',
          name: 'Ana Silva',
          role: 'COO',
          company: 'Florineve',
          logo: logoIds[1],
        },
      ],
    },
    {
      blockType: 'finalCTA',
      enabled: true,
      anchorId: 'contact',
      title: 'Ready to get started?',
      content: 'Tell us the context and we will outline the simplest path forward.',
      subtitle: 'Tell us the context and we will outline the simplest path forward.',
      primaryCTA: { label: 'Start a project', link: '/contact' },
      secondaryCTA: { label: 'Our manifesto', link: '/about' },
      microcopy: 'Typical response within 1 business day.',
    },
  ];

  const seoPt = {
    title: 'Loading Happiness | Tecnologia com coracao humano',
    description:
      'Solucoes de TI com toque humano. Transformamos sistemas complexos em crescimento sustentavel com clareza, eficiencia e parceria.',
    image: heroImage,
  };

  const seoEn = {
    title: 'Loading Happiness | Technology with a human heart',
    description:
      'IT solutions with a human touch. We turn complex systems into sustainable growth with clarity, efficiency, and partnership.',
    image: heroImage,
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    locale: 'pt',
  });

  let pageId = existing.docs?.[0]?.id;
  const baseData: Partial<Page> = {
    title: 'Inicio',
    slug: 'home',
    status: 'published',
    layout: layoutPt,
    seo: seoPt,
  };

  if (!pageId) {
    const created = await payload.create({
      collection: 'pages',
      locale: 'pt',
      data: baseData as any,
      overrideAccess: true,
      disableTransaction: true,
    } as any);
    pageId = created.id;
  }

  await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'en',
    data: {
      title: 'Home',
      slug: 'home',
      status: 'published',
      layout: layoutEn,
      seo: seoEn,
    },
    overrideAccess: true,
    disableTransaction: true,
  } as any);

  const basePage = await payload.findByID({
    collection: 'pages',
    id: pageId,
    locale: 'en',
    fallbackLocale: false,
  });

  const mergeLocalizedFields = (baseValue: any, localizedValue: any): any => {
    if (typeof localizedValue === 'string') {
      return localizedValue;
    }
    if (Array.isArray(localizedValue)) {
      const baseArray = Array.isArray(baseValue) ? baseValue : [];
      const maxLength = Math.max(baseArray.length, localizedValue.length);
      return Array.from({ length: maxLength }, (_, idx) =>
        mergeLocalizedFields(baseArray[idx], localizedValue[idx])
      );
    }
    if (localizedValue && typeof localizedValue === 'object') {
      const baseObj = baseValue && typeof baseValue === 'object' ? { ...baseValue } : {};
      Object.entries(localizedValue).forEach(([key, value]) => {
        if (typeof value === 'string') {
          baseObj[key] = value;
          return;
        }
        if (Array.isArray(value) || (value && typeof value === 'object')) {
          baseObj[key] = mergeLocalizedFields(baseObj[key], value);
        }
      });
      return baseObj;
    }
    return baseValue;
  };

  const baseLayout = basePage?.layout || [];
  const layoutPtMerged = baseLayout.map((block: any, index: number) =>
    mergeLocalizedFields(block, layoutPt[index])
  );

  await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'pt',
    data: {
      ...baseData,
      layout: layoutPtMerged,
    } as any,
    overrideAccess: true,
    disableTransaction: true,
  } as any);

  // eslint-disable-next-line no-console
  console.log('Home page seeded (PT and EN).');
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
