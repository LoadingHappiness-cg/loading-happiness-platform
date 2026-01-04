import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import type { Content, Page } from '@/payload-types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type PageLayout = NonNullable<Page['layout']>;
type ServiceTemplateData = NonNullable<Page['serviceTemplateData']>;
type ContentBody = Content['body'];
type ContentSeedItem = {
  slugPt: string;
  slugEn: string;
  contentType: Content['contentType'];
  titlePt: string;
  titleEn: string;
  excerptPt: string;
  excerptEn: string;
  tags?: Content['tags'];
  categories?: Content['categories'];
  authors: Content['authors'];
  bodyPt: ContentBody;
  bodyEn: ContentBody;
  videoDataPt?: Content['videoData'];
  videoDataEn?: Content['videoData'];
};

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

const upsertLocalizedBySlug = async (
  payload: any,
  collection: string,
  slugPt: string,
  dataPt: Record<string, any>,
  dataEn?: Record<string, any>
) => {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slugPt } },
    limit: 1,
    locale: 'pt',
  });

  let id = existing.docs?.[0]?.id;
  if (!id) {
    const created = await payload.create({ collection, data: dataPt, locale: 'pt' });
    id = created.id;
  } else {
    await payload.update({ collection, id, data: dataPt, locale: 'pt' });
  }

  if (dataEn) {
    await payload.update({ collection, id, data: dataEn, locale: 'en' });
  }

  return id;
};

const upsertByName = async (
  payload: any,
  collection: string,
  namePt: string,
  dataPt: Record<string, any>,
  dataEn?: Record<string, any>
) => {
  const existing = await payload.find({
    collection,
    where: { name: { equals: namePt } },
    limit: 1,
    locale: 'pt',
  });

  let id = existing.docs?.[0]?.id;
  if (!id) {
    const created = await payload.create({ collection, data: dataPt, locale: 'pt' });
    id = created.id;
  } else {
    await payload.update({ collection, id, data: dataPt, locale: 'pt' });
  }

  if (dataEn) {
    await payload.update({ collection, id, data: dataEn, locale: 'en' });
  }

  return id;
};

const main = async () => {
  await loadEnvFile();
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    throw new Error('DATABASE_URI and PAYLOAD_SECRET must be set before seeding.');
  }

  const config = (await import('../payload.config.ts')).default;
  const payload = await getPayload({ config });
  const now = new Date().toISOString();

  const heroImage = await ensureMedia(payload, 'Hero About');
  const servicesHero = await ensureMedia(payload, 'Hero Services');
  const impactHero = await ensureMedia(payload, 'Hero Impact');
  const contactHero = await ensureMedia(payload, 'Hero Contact');
  const processImage = await ensureMedia(payload, 'Process Services');
  const testimonialLogo = await ensureMedia(payload, 'Client Logo');
  const newsImage = await ensureMedia(payload, 'News Feature');

  const tagSecurity = await upsertLocalizedBySlug(
    payload,
    'tags',
    'seguranca',
    {
      name: 'Segurança',
      slug: 'seguranca',
      description: 'Boas práticas e alertas para manter o negócio seguro.',
      color: '#236D9C',
      seo: { title: 'Segurança | Loading Happiness', description: 'Insights de cibersegurança para equipas.' },
    },
    {
      name: 'Security',
      slug: 'security',
      description: 'Practical guidance to keep your business secure.',
      color: '#236D9C',
      seo: { title: 'Security | Loading Happiness', description: 'Cybersecurity insights for teams.' },
    }
  );

  const tagOperations = await upsertLocalizedBySlug(
    payload,
    'tags',
    'operacoes',
    {
      name: 'Operações',
      slug: 'operacoes',
      description: 'Menos ruído operacional, mais previsibilidade.',
      color: '#332570',
    },
    {
      name: 'Operations',
      slug: 'operations',
      description: 'Reduce noise, increase stability.',
      color: '#332570',
    }
  );

  const tagCloud = await upsertLocalizedBySlug(
    payload,
    'tags',
    'cloud-m365',
    {
      name: 'Cloud & M365',
      slug: 'cloud-m365',
      description: 'Governança e segurança para ambientes cloud.',
      color: '#698FFE',
    },
    {
      name: 'Cloud & M365',
      slug: 'cloud-m365',
      description: 'Governed, secure cloud environments.',
      color: '#698FFE',
    }
  );

  const categorySecurity = await upsertLocalizedBySlug(
    payload,
    'categories',
    'seguranca',
    {
      name: 'Segurança',
      slug: 'seguranca',
      description: 'Risco, conformidade, continuidade.',
    },
    {
      name: 'Security',
      slug: 'security',
      description: 'Risk, compliance, resilience.',
    }
  );

  const categoryOperations = await upsertLocalizedBySlug(
    payload,
    'categories',
    'operacoes',
    {
      name: 'Operações',
      slug: 'operacoes',
      description: 'Eficiência operacional e suporte.',
    },
    {
      name: 'Operations',
      slug: 'operations',
      description: 'Operational efficiency and support.',
    }
  );

  const authorMaria = await upsertByName(
    payload,
    'authors',
    'Maria Sousa',
    {
      name: 'Maria Sousa',
      role: 'Security Lead',
      bio: 'Especialista em cibersegurança e resposta a incidentes.',
      photo: testimonialLogo,
    },
    {
      name: 'Maria Sousa',
      role: 'Security Lead',
      bio: 'Cybersecurity specialist focused on incident response.',
      photo: testimonialLogo,
    }
  );

  const authorTiago = await upsertByName(
    payload,
    'authors',
    'Tiago Almeida',
    {
      name: 'Tiago Almeida',
      role: 'Operations Lead',
      bio: 'Aposta em processos claros e infraestruturas resilientes.',
      photo: testimonialLogo,
    },
    {
      name: 'Tiago Almeida',
      role: 'Operations Lead',
      bio: 'Focused on clear processes and resilient infrastructure.',
      photo: testimonialLogo,
    }
  );

  await upsertLocalizedBySlug(
    payload,
    'pages',
    'about',
    {
      title: 'Sobre',
      slug: 'about',
      status: 'published',
      layout: [
        {
          blockType: 'hero',
          sectionId: 'intro',
          variant: 'A',
          theme: 'brandGradient',
          heading: 'Tecnologia com coração humano.',
          subheading:
            'Criamos ambientes de TI fiáveis e seguros — com clareza, responsabilidade e um toque humano.',
          primaryCTA: { label: 'Marcar chamada', link: '/contact' },
          secondaryCTA: { label: 'Explorar serviços', link: '/services' },
          image: heroImage,
          badges: [
            { text: 'Equipa sénior' },
            { text: 'Segurança em primeiro lugar' },
            { text: 'Decisões documentadas' },
            { text: 'Feito para PMEs' },
          ],
        },
        {
          blockType: 'splitOverview',
          sectionId: 'company-overview',
          title: 'Visão geral da empresa',
          content:
            'A Loading Happiness é uma parceira de TI focada em estabilidade, segurança e clareza de longo prazo. Ajudamos organizações a reduzir ruído operacional, fortalecer bases e modernizar sistemas sem interromper o dia a dia.\n\nEstamos no nosso melhor quando as expectativas são claras: o que importa, o que é realista e quais os próximos passos.',
          sideTitle: 'Factos rápidos',
          sideItems: [
            { text: 'Base em Portugal · Equipas na UE' },
            { text: 'Foco: operações de TI, cibersegurança, infraestruturas, suporte' },
            { text: 'Método: entrega pragmática, decisões documentadas, progresso mensurável' },
          ],
        },
        {
          blockType: 'valueCards',
          sectionId: 'philosophy-values',
          title: 'Filosofia e valores',
          intro:
            'Acreditamos que a tecnologia deve servir pessoas — e não o contrário. Sistemas fortes exigem disciplina técnica e clareza humana.',
          cards: [
            { title: 'Integridade', text: 'Dizemos a verdade, mesmo quando é desconfortável.', icon: '⚖️' },
            { title: 'Empatia', text: 'Suporte é sobre pessoas sob pressão, não apenas tickets.', icon: '🤝' },
            { title: 'Pragmatismo', text: 'Seguro e estável vence o frágil e vistoso.', icon: '🛠️' },
            { title: 'Responsabilidade', text: 'O nosso trabalho deve deixar um impacto positivo.', icon: '🌍' },
          ],
        },
        {
          blockType: 'twoColumnList',
          sectionId: 'partnership',
          title: 'A parceria certa',
          intro:
            'Não somos um fornecedor de “sim a tudo”. Trabalhamos como parceiro: fazemos perguntas difíceis, documentamos escolhas e focamo-nos em resultados. É assim que a TI se torna previsível.',
          leftTitle: 'O que recebe',
          leftItems: [
            { text: 'Prioridades e escopo claros' },
            { text: 'Ownership e responsabilidade' },
            { text: 'Documentação que resiste a mudanças' },
            { text: 'Melhorias de segurança sem drama' },
          ],
          rightTitle: 'O que precisamos',
          rightItems: [
            { text: 'Ponto de contacto e alinhamento de prioridades' },
            { text: 'Prazos realistas' },
            { text: 'Vontade de atacar causas raiz' },
            { text: 'Respeito por pessoas e processo' },
          ],
        },
        {
          blockType: 'process',
          sectionId: 'our-approach',
          title: 'A nossa abordagem',
          steps: [
            { title: 'Avaliar', content: 'Mapeamos riscos, dores, dependências e prioridades.' },
            { title: 'Estabilizar', content: 'Corrigimos o que quebra o fluxo diário e reduzimos incidentes.' },
            { title: 'Evoluir', content: 'Melhoramos, automatizamos e reforçamos segurança continuamente.' },
          ],
          note: 'Sem surpresas. Decisões documentadas. Progresso mensurável.',
          image: processImage,
        },
        {
          blockType: 'bulletsWithProof',
          sectionId: 'why-choose-us',
          title: 'Por que nos escolher',
          bullets: [
            { text: 'Experiência sénior com decisões práticas' },
            { text: 'Segurança como base, não como discurso' },
            { text: 'Recomendações neutras a fornecedores' },
            { text: 'Comunicação clara e escolhas documentadas' },
            { text: 'Sistemas preparados para continuidade e recuperação' },
          ],
          proofTitle: 'Prova rápida',
          proofText:
            'Se quer operações calmas, precisa de mais do que ferramentas — precisa de disciplina, clareza e execução.',
        },
        {
          blockType: 'logoCloud',
          sectionId: 'partners',
          title: 'Parceiros',
          text:
            'Parcerias são uma ferramenta — não uma prisão. Trabalhamos com fornecedores e especialistas quando isso melhora resultados, suporte e velocidade de entrega. A prioridade é sempre a solução certa para o seu contexto.',
          logos: [
            { logo: testimonialLogo, alt: 'Partner logo' },
            { logo: testimonialLogo, alt: 'Partner logo' },
            { logo: testimonialLogo, alt: 'Partner logo' },
            { logo: testimonialLogo, alt: 'Partner logo' },
          ],
        },
        {
          blockType: 'teamIntro',
          sectionId: 'our-team',
          title: 'A nossa equipa',
          text:
            'A Loading Happiness é liderada por profissionais séniores de TI com décadas de experiência em operações, infraestruturas e segurança. Para necessidades específicas, trabalhamos com uma rede de confiança — para que tenha a competência certa sem custos desnecessários.',
          cards: [
            {
              title: 'Liderança & Entrega',
              text: 'Operações, segurança, infraestruturas.',
              tags: [{ text: 'Operações' }, { text: 'Segurança' }, { text: 'Infraestruturas' }],
            },
            {
              title: 'Rede de confiança',
              text: 'Cloud, desenvolvimento, segurança especializada e escalamento de fornecedores.',
              tags: [{ text: 'Cloud' }, { text: 'Segurança' }, { text: 'Fornecedor' }],
            },
          ],
          ctaLabel: 'Marcar chamada',
          ctaLink: '/contact',
        },
      ],
      seo: {
        title: 'Sobre a Loading Happiness',
        description: 'Ambientes de TI fiáveis e seguros com clareza e responsabilidade.',
      },
    },
    {
      title: 'About',
      slug: 'about',
      status: 'published',
      layout: [
        {
          blockType: 'hero',
          sectionId: 'intro',
          variant: 'A',
          theme: 'brandGradient',
          eyebrow: 'ABOUT LOADING HAPPINESS',
          h1Title: 'Technology with a human heart. Built for real businesses.',
          heading: 'Technology with a human heart. Built for real businesses.',
          subheadline:
            'We help organizations run smoother, safer, and smarter — with IT that feels clear, dependable, and genuinely supportive. We combine senior technical expertise with a very simple principle: people come first.',
          subheading:
            'We help organizations run smoother, safer, and smarter — with IT that feels clear, dependable, and genuinely supportive. We combine senior technical expertise with a very simple principle: people come first.',
          trustLine: 'No jargon for show. No “IT theatre”. Just honest work, done properly.',
          primaryCTA: { label: 'Talk to us →', link: '/contact' },
          secondaryCTA: { label: 'Explore our Impact', link: '/impact' },
          image: heroImage,
        },
        {
          blockType: 'splitContent',
          sectionId: 'our-story',
          title: 'From Sintra, with a practical mission',
          sectionTitle: 'From Sintra, with a practical mission',
          content:
            'Loading Happiness was founded in October 2016, in Sintra, with a clear idea: give Portuguese small and mid-sized businesses the same quality of IT guidance and service usually reserved for big organizations.\n\nWe grew steadily by doing the basics exceptionally well: listening carefully, designing solutions that fit the real context, and staying close after delivery. That “stay close” part matters — because technology only works when people feel supported using it.',
        },
        {
          blockType: 'splitOverview',
          sectionId: 'why-loading-happiness',
          title: 'A name that became a promise',
          content:
            '“Loading Happiness” started as a name on a list — and became the best summary of how we want clients to feel after working with us: lighter, more confident, and in control.\n\nHappiness here isn’t a slogan. It’s the result of systems that work, problems that don’t repeat, and relationships built on trust.',
          sideTitle: 'How it should feel',
          sideItems: [
            { text: 'Lighter' },
            { text: 'More confident' },
            { text: 'In control' },
          ],
        },
        {
          blockType: 'splitContent',
          sectionId: 'philosophy',
          title: 'Our philosophy',
          sectionTitle: 'Our philosophy',
          content:
            'We believe the best IT is not just advanced — it’s human, clear, and responsible. Innovation matters, but not at the cost of confusion, stress, or unnecessary risk.\n\nOur approach is holistic: infrastructure, cloud, security, operations, and business systems should fit together like one coherent story — not a pile of tools.',
        },
        {
          blockType: 'valueCards',
          sectionId: 'values',
          title: 'Values that show up in the work',
          cards: [
            {
              title: 'Excellence, without arrogance',
              text: 'We deliver enterprise-grade thinking, adapted to real constraints. No overengineering. No shortcuts.',
            },
            {
              title: 'Proximity and accountability',
              text: 'We stay close, speak plainly, and take ownership. Solutions aren’t finished when they go live — they’re finished when they work in real life.',
            },
            {
              title: 'Responsibility and care',
              text: 'We treat clients, partners, and colleagues with respect — and we take social responsibility seriously, inside the company and beyond it.',
            },
            {
              title: 'Courage to improve',
              text: 'We face hard realities (risk culture, limited training, uncertainty) with patience and practical education — not blame.',
            },
          ],
        },
        {
          blockType: 'richText',
          content: 'We don’t sell complexity. We build confidence.',
        },
        {
          blockType: 'bullets',
          sectionId: 'what-to-expect',
          title: 'What you can expect from us',
          items: [
            { text: 'Clarity: you’ll understand what’s happening and why.' },
            { text: 'Pragmatism: solutions designed for your reality, not a brochure.' },
            { text: 'Security by default: safety is not an extra — it’s the baseline.' },
            { text: 'Long-term thinking: we aim for stability, not constant firefighting.' },
          ],
        },
        {
          blockType: 'splitContent',
          sectionId: 'social-responsibility',
          title: 'A business should be a positive force',
          sectionTitle: 'A business should be a positive force',
          content:
            'For us, social responsibility isn’t a side project — it’s part of how we define success. We invest in people, promote healthy growth inside the company, and contribute to community and environmental initiatives when we can create real value.',
          secondaryLinkLabel: 'Want the concrete actions and measurable outcomes? See Impact',
          secondaryLinkHref: '/impact',
        },
        {
          blockType: 'splitContent',
          sectionId: 'team',
          title: 'The people behind the work',
          sectionTitle: 'The people behind the work',
          content:
            'We’re a small team by choice — senior, hands-on, and close to the ground. That’s how we stay fast, honest, and accountable.',
        },
        {
          blockType: 'splitContent',
          sectionId: 'looking-ahead',
          title: 'A more human future for technology',
          sectionTitle: 'A more human future for technology',
          content:
            'We’re focused on practical innovation: cloud, automation, cybersecurity, AI, and modern business systems — always applied with care, and always tied to outcomes.\n\nWe want to grow sustainably, without losing what makes the work good: quality, closeness, and responsibility.',
        },
        {
          blockType: 'finalCTA',
          sectionId: 'cta',
          title: 'Ready to build calmer, safer IT?',
          content:
            'Tell us where you are today — and where you want to be. We’ll give you a clear next step, without pressure and without fluff.',
          primaryCTA: { label: 'Talk to us →', link: '/contact' },
          secondaryCTA: { label: 'Explore our services', link: '/services' },
        },
      ],
      seo: {
        title: 'About Loading Happiness',
        description: 'Technology with a human heart for calmer, safer IT.',
      },
    }
  );

  await upsertLocalizedBySlug(
    payload,
    'pages',
    'services',
    {
      title: 'Serviços',
      slug: 'services',
      status: 'published',
      layout: [
        {
          blockType: 'hero',
          sectionId: 'intro',
          variant: 'A',
          theme: 'brandGradient',
          heading: 'Serviços de TI que reduzem ruído e risco.',
          subheading:
            'Estabilizamos operações, reforçamos segurança e modernizamos infraestruturas — com comunicação clara e execução previsível.',
          primaryCTA: { label: 'Marcar chamada', link: '/contact' },
          secondaryCTA: { label: 'Pedir diagnóstico', link: '/contact' },
          image: servicesHero,
          badges: [{ text: 'Equipa sénior' }, { text: 'Segurança em primeiro lugar' }, { text: 'Onboarding rápido' }],
        },
        {
          blockType: 'valueCards',
          sectionId: 'value',
          title: 'O que recebe ao trabalhar connosco',
          cards: [
            {
              title: 'Clareza',
              text: 'Sabe o que estamos a fazer, porquê, e o que vem a seguir.',
              icon: '🧭',
            },
            {
              title: 'Operações calmas',
              text: 'Menos incidentes, recuperação mais rápida, menos firefighting diário.',
              icon: '🌊',
            },
            {
              title: 'Continuidade',
              text: 'Sistemas e documentação que resistem a crescimento e mudanças de equipa.',
              icon: '📘',
            },
          ],
        },
        {
          blockType: 'servicesGrid',
          sectionId: 'services',
          title: 'Serviços',
          intro: 'Escolha o que precisa hoje — ajustamos o escopo conforme a operação amadurece.',
          services: [
            {
              title: 'Managed IT & Helpdesk',
              description: 'Resposta rápida, manutenção proativa e ownership claro.',
              icon: '💻',
              tag: 'Managed IT',
              link: '/services/managed-it',
            },
            {
              title: 'Cybersecurity Baseline & Hardening',
              description: 'Controlo de risco sem travar pessoas.',
              icon: '🛡️',
              tag: 'Segurança',
              link: '/services/cybersecurity',
            },
            {
              title: 'Microsoft 365 & Cloud',
              description: 'Governança, identidade, migrações e licenciamento sob controlo.',
              icon: '☁️',
              tag: 'Cloud',
              link: '/services/m365-cloud',
            },
            {
              title: 'Networking & Connectivity',
              description: 'Wi-Fi, segmentação, VPN, monitorização, performance.',
              icon: '📡',
              tag: 'Rede',
              link: '/services/networking',
            },
            {
              title: 'Infrastructure & Virtualization',
              description: 'Virtualização, storage, backups e testes de recuperação.',
              icon: '🧱',
              tag: 'Infraestrutura',
              link: '/services/infrastructure',
            },
            {
              title: 'Strategy & Roadmaps',
              description: 'Plano realista de 12–24 meses: o que corrigir agora, o que investir depois.',
              icon: '🧭',
              tag: 'Estratégia',
              link: '/services/strategy-roadmaps',
            },
          ],
        },
        {
          blockType: 'process',
          sectionId: 'engagement',
          title: 'Como trabalhamos',
          steps: [
            { title: 'Avaliar', content: 'Mapeamos riscos, dores e prioridades.' },
            { title: 'Estabilizar', content: 'Corrigimos o que quebra o fluxo do dia a dia.' },
            { title: 'Evoluir', content: 'Melhoramos, automatizamos e reforçamos segurança continuamente.' },
          ],
          note: 'Sem surpresas. Decisões documentadas. Progresso mensurável.',
          image: processImage,
        },
        {
          blockType: 'faq',
          sectionId: 'faq',
          title: 'Perguntas frequentes',
          items: [
            {
              question: 'Trabalham com equipas pequenas?',
              answer: 'Sim. Somos focados em PMEs que precisam de clareza sénior sem overhead corporativo.',
            },
            {
              question: 'Substituem a TI interna?',
              answer: 'Não necessariamente. Podemos complementar a equipa ou gerir tudo.',
            },
            {
              question: 'Oferecem suporte de emergência?',
              answer: 'Sim, com limites claros e caminhos de escalonamento.',
            },
            {
              question: 'Podemos começar pequeno?',
              answer: 'Sim. Um diagnóstico de base é normalmente o primeiro passo mais rápido.',
            },
          ],
        },
        {
          blockType: 'finalCTA',
          sectionId: 'cta',
          title: 'Pronto para operações mais calmas?',
          content: 'Conta-nos o que está a travar o fluxo. Propomos um plano prático — sem ruído.',
          primaryCTA: { label: 'Marcar chamada', link: '/contact' },
          secondaryCTA: { label: 'Enviar mensagem', link: '/contact' },
        },
      ],
      seo: {
        title: 'Serviços de TI | Loading Happiness',
        description: 'Managed IT, segurança, cloud e roadmaps com execução clara.',
      },
    },
    {
      title: 'Services',
      slug: 'services',
      status: 'published',
      layout: [
        {
          blockType: 'hero',
          sectionId: 'intro',
          variant: 'A',
          theme: 'brandGradient',
          heading: 'IT services that reduce noise and risk.',
          subheading: 'We stabilize operations, strengthen security, and modernize infrastructure — with clear communication and predictable execution.',
          primaryCTA: { label: 'Book a call', link: '/contact' },
          secondaryCTA: { label: 'Request an assessment', link: '/contact' },
          image: servicesHero,
          badges: [{ text: 'Senior-led' }, { text: 'Security-first' }, { text: 'Fast onboarding' }],
        },
        {
          blockType: 'valueCards',
          sectionId: 'value',
          title: 'What you get from working with us',
          cards: [
            {
              title: 'Clarity',
              text: 'You’ll know what we’re doing, why we’re doing it, and what comes next.',
              icon: '🧭',
            },
            {
              title: 'Calm operations',
              text: 'Fewer incidents, faster recovery, less daily firefighting.',
              icon: '🌊',
            },
            {
              title: 'Continuity',
              text: 'Systems and documentation that survive growth and staff changes.',
              icon: '📘',
            },
          ],
        },
        {
          blockType: 'servicesGrid',
          sectionId: 'services',
          title: 'Services',
          intro: 'Choose what you need today — we can scale the scope as your operations mature.',
          services: [
            {
              title: 'Managed IT & Helpdesk',
              description: 'Fast response, proactive maintenance, clear ownership.',
              icon: '💻',
              tag: 'Managed IT',
              link: '/services/managed-it',
            },
            {
              title: 'Cybersecurity Baseline & Hardening',
              description: 'Controls that reduce risk without slowing people down.',
              icon: '🛡️',
              tag: 'Security',
              link: '/services/cybersecurity',
            },
            {
              title: 'Microsoft 365 & Cloud',
              description: 'Governance, identity, migrations, licensing sanity.',
              icon: '☁️',
              tag: 'Cloud',
              link: '/services/m365-cloud',
            },
            {
              title: 'Networking & Connectivity',
              description: 'Wi-Fi, segmentation, VPN, monitoring, performance.',
              icon: '📡',
              tag: 'Network',
              link: '/services/networking',
            },
            {
              title: 'Infrastructure & Virtualization',
              description: 'Virtualization, storage, backups, recovery testing.',
              icon: '🧱',
              tag: 'Infrastructure',
              link: '/services/infrastructure',
            },
            {
              title: 'Strategy & Roadmaps',
              description: 'A realistic 12–24 month plan: what to fix now, what to invest in next.',
              icon: '🧭',
              tag: 'Strategy',
              link: '/services/strategy-roadmaps',
            },
          ],
        },
        {
          blockType: 'process',
          sectionId: 'engagement',
          title: 'How we work',
          steps: [
            { title: 'Assess', content: 'We map risks, pain points, and priorities.' },
            { title: 'Stabilize', content: 'We fix what breaks your day-to-day flow.' },
            { title: 'Evolve', content: 'We improve, automate, and secure continuously.' },
          ],
          note: 'No surprises. Decisions are documented. Progress is measurable.',
          image: processImage,
        },
        {
          blockType: 'faq',
          sectionId: 'faq',
          title: 'FAQ',
          items: [
            {
              question: 'Do you work with small teams?',
              answer: 'Yes. We’re built for SMEs that need senior-level clarity without enterprise overhead.',
            },
            {
              question: 'Do you replace internal IT?',
              answer: 'Not necessarily. We can complement your team or fully manage operations.',
            },
            {
              question: 'Do you offer emergency support?',
              answer: 'Yes, with clear boundaries and escalation paths.',
            },
            {
              question: 'Can we start small?',
              answer: 'Yes. A baseline assessment is usually the fastest first step.',
            },
          ],
        },
        {
          blockType: 'finalCTA',
          sectionId: 'cta',
          title: 'Ready for real stability?',
          content: 'Tell us what’s breaking your flow. We’ll propose a practical plan — no fluff, no drama.',
          primaryCTA: { label: 'Book a call', link: '/contact' },
          secondaryCTA: { label: 'Send a message', link: '/contact' },
        },
      ],
      seo: {
        title: 'IT Services | Loading Happiness',
        description: 'Managed IT, cybersecurity, cloud, and roadmaps with clear execution.',
      },
    }
  );

  const servicePages = [
    {
      slug: 'services/managed-it',
      template: 'managed-it',
      titlePt: 'Managed IT & Helpdesk',
      titleEn: 'Managed IT & Helpdesk',
      heroPt:
        'Suporte fiável, manutenção proativa e ownership claro — para que pequenos problemas não virem grandes paragens.',
      heroEn: 'Reliable support, proactive maintenance, and clear ownership — so small issues don’t become big outages.',
      bulletsPt: [
        'precisam de suporte previsível e resolução rápida',
        'querem menos incidentes recorrentes',
        'precisam de documentação e responsabilidade claras',
        'não têm tempo para gerir fornecedores e ferramentas',
      ],
      bulletsEn: [
        'need predictable support and faster resolution',
        'want fewer recurring incidents',
        'need documentation and clear accountability',
        'don’t have time to manage vendors and tools',
      ],
      deliverablesPt: [
        { title: 'Resposta a incidentes e escalonamento', text: 'Severidade clara e ownership responsável.' },
        { title: 'Monitorização e manutenção proativa', text: 'Evitar repetições com alertas antecipados.' },
        { title: 'Gestão de patches alinhada', text: 'Alinhada com horários e janelas de mudança.' },
        { title: 'Baseline de ativos e acessos', text: 'Quem acede a quê, e porquê.' },
        { title: 'Notas mensais de saúde', text: 'O que mudou, o que melhorou, o que vem a seguir.' },
      ],
      deliverablesEn: [
        { title: 'Incident response and escalation', text: 'Clear severity paths and accountable ownership.' },
        { title: 'Proactive monitoring and maintenance', text: 'Prevent repeats with early alerts.' },
        { title: 'Patch management approach', text: 'Aligned with business hours and change windows.' },
        { title: 'Asset and access baseline', text: 'Who has access to what, and why.' },
        { title: 'Monthly health notes', text: 'What changed, what improved, what’s next.' },
      ],
      outcomesPt: [
        { title: 'Menos problemas repetidos', text: 'Atacamos causas raiz, não apenas sintomas.' },
        { title: 'Recuperação mais rápida', text: 'Papéis claros e passos documentados.' },
        { title: 'Visibilidade real', text: 'Sabe o que acontece e porquê.' },
        { title: 'Operações mais calmas', text: 'Menos firefighting, mais foco.' },
      ],
      outcomesEn: [
        { title: 'Fewer repeated issues', text: 'Root causes addressed, not just symptoms.' },
        { title: 'Faster recovery', text: 'Clear roles and documented steps.' },
        { title: 'Better visibility', text: 'You know what’s happening and why.' },
        { title: 'Calmer operations', text: 'Less firefighting, more focus.' },
      ],
      stepsPt: [
        { title: 'Chamada de descoberta rápida', text: 'Alinhar objetivos, escopo e urgência.' },
        { title: 'Baseline de acessos + inventário', text: 'Mapear sistemas, utilizadores e riscos.' },
        { title: 'Quick wins (primeiros 30 dias)', text: 'Remover fricção imediata.' },
        { title: 'Ritmo operacional', text: 'Ticketing, reporting e revisões.' },
      ],
      stepsEn: [
        { title: 'Quick discovery call', text: 'Align goals, scope, and urgency.' },
        { title: 'Access + inventory baseline', text: 'Map systems, users, and risks.' },
        { title: 'Quick wins (first 30 days)', text: 'Remove immediate friction.' },
        { title: 'Operational rhythm', text: 'Ticketing, reporting, reviews.' },
      ],
    },
    {
      slug: 'services/cybersecurity',
      template: 'cybersecurity',
      titlePt: 'Cibersegurança Base & Hardening',
      titleEn: 'Cybersecurity Baseline & Hardening',
      heroPt: 'Controlo de risco sem travar pessoas.',
      heroEn: 'Controls that reduce risk without slowing people down.',
      bulletsPt: [
        'precisam de clareza sobre a superfície real de risco',
        'querem controlos práticos sem overhead corporativo',
        'precisam de disciplina de identidade e acesso',
        'precisam de estar preparados para auditorias com mínima fricção',
      ],
      bulletsEn: [
        'need clarity on your real risk surface',
        'want practical controls without enterprise overhead',
        'need stronger identity and access discipline',
        'must be audit-ready with minimal disruption',
      ],
      deliverablesPt: [
        { title: 'Baseline e mapeamento de políticas', text: 'O que existe vs. o que falta.' },
        { title: 'Hardening de identidade', text: 'MFA, acesso condicional, least privilege.' },
        { title: 'Proteção de endpoint e email', text: 'Defaults sólidos e cobertura mensurável.' },
        { title: 'Backups e validação de recuperação', text: 'Restores testados, não suposições.' },
        { title: 'Enablement de segurança', text: 'Orientação curta e prática para equipas.' },
      ],
      deliverablesEn: [
        { title: 'Security baseline and policy mapping', text: 'What exists vs. what is needed.' },
        { title: 'Identity hardening', text: 'MFA, conditional access, least privilege.' },
        { title: 'Endpoint and email protection', text: 'Sane defaults, measurable coverage.' },
        { title: 'Backups and recovery validation', text: 'Tested restores, not assumptions.' },
        { title: 'Security awareness guidance', text: 'Short, practical enablement for teams.' },
      ],
      outcomesPt: [
        { title: 'Menor exposição a incidentes', text: 'Fechamos primeiro os maiores riscos.' },
        { title: 'Ownership claro', text: 'Acessos e responsabilidades explícitos.' },
        { title: 'Evidência para auditorias', text: 'Políticas e controlos demonstráveis.' },
        { title: 'Menos stress de resposta', text: 'Playbooks e escalamentos definidos.' },
      ],
      outcomesEn: [
        { title: 'Lower incident exposure', text: 'High-risk gaps closed first.' },
        { title: 'Clearer ownership', text: 'Access and responsibility are explicit.' },
        { title: 'Audit-ready evidence', text: 'Policies and controls you can show.' },
        { title: 'Reduced response stress', text: 'Playbooks and escalation paths.' },
      ],
      stepsPt: [
        { title: 'Descoberta de risco', text: 'Encontrar os gaps críticos primeiro.' },
        { title: 'Plano de hardening', text: 'Priorizar controlos por impacto.' },
        { title: 'Implementação', text: 'Aplicar mudanças com mínima disrupção.' },
        { title: 'Revisão contínua', text: 'Medir e melhorar trimestralmente.' },
      ],
      stepsEn: [
        { title: 'Risk discovery', text: 'Find high-risk gaps first.' },
        { title: 'Hardening plan', text: 'Prioritize controls by impact.' },
        { title: 'Implementation', text: 'Roll out changes with minimal disruption.' },
        { title: 'Ongoing review', text: 'Measure and improve quarterly.' },
      ],
    },
    {
      slug: 'services/m365-cloud',
      template: 'm365-cloud',
      titlePt: 'Microsoft 365 & Cloud',
      titleEn: 'Microsoft 365 & Cloud',
      heroPt: 'Governança, identidade, migrações e licenciamento sob controlo.',
      heroEn: 'Governance, identity, migrations, licensing sanity.',
      bulletsPt: [
        'precisam de clareza sobre licenças e uso de M365',
        'querem governança e segurança no lugar',
        'precisam de migrar com pouco downtime',
        'querem menos tickets e confusão',
      ],
      bulletsEn: [
        'need clarity around M365 licensing and usage',
        'want governance and security in place',
        'must migrate with low downtime',
        'need fewer support tickets and confusion',
      ],
      deliverablesPt: [
        { title: 'Governança de tenant e políticas', text: 'Ownership, retenção e defaults seguros.' },
        { title: 'Standardização de identidade e acessos', text: 'Modelos consistentes de roles e acessos.' },
        { title: 'Planeamento e execução de migrações', text: 'Timelines claros e mínimo downtime.' },
        { title: 'Higiene de licenças e custos', text: 'Remover desperdício e alinhar com uso real.' },
        { title: 'Documentação e enablement', text: 'Reduzir confusão e tickets.' },
      ],
      deliverablesEn: [
        { title: 'Tenant governance and policies', text: 'Ownership, retention, and safe defaults.' },
        { title: 'Identity and access standardization', text: 'Consistent roles and access models.' },
        { title: 'Migration planning and execution', text: 'Clear timelines, minimal downtime.' },
        { title: 'Licensing and cost hygiene', text: 'Remove waste, align to real use.' },
        { title: 'Documentation and enablement', text: 'Reduce confusion and tickets.' },
      ],
      outcomesPt: [
        { title: 'Menos desperdício em licenças', text: 'Gasto alinhado com uso.' },
        { title: 'Menos problemas de acesso', text: 'Modelos previsíveis de permissões.' },
        { title: 'Ownership claro do tenant', text: 'Governança que resiste a mudanças.' },
        { title: 'Migrações seguras', text: 'Sem surpresas no cutover.' },
      ],
      outcomesEn: [
        { title: 'Lower licensing waste', text: 'Spend aligns with usage.' },
        { title: 'Fewer access issues', text: 'Predictable permission models.' },
        { title: 'Clear tenant ownership', text: 'Governance survives staff changes.' },
        { title: 'Safer migrations', text: 'No surprises during cutover.' },
      ],
      stepsPt: [
        { title: 'Descoberta', text: 'Avaliar saúde do tenant e gaps.' },
        { title: 'Governança', text: 'Definir regras e ownership.' },
        { title: 'Migração ou limpeza', text: 'Executar com milestones claros.' },
        { title: 'Estabilização', text: 'Reduzir tickets e documentar.' },
      ],
      stepsEn: [
        { title: 'Discovery', text: 'Assess tenant health and gaps.' },
        { title: 'Governance setup', text: 'Define rules and ownership.' },
        { title: 'Migration or cleanup', text: 'Execute with clear milestones.' },
        { title: 'Stabilization', text: 'Reduce ticket load and document.' },
      ],
    },
    {
      slug: 'services/networking',
      template: 'networking',
      titlePt: 'Networking & Connectivity',
      titleEn: 'Networking & Connectivity',
      heroPt: 'Wi-Fi, segmentação, VPN, monitorização e performance.',
      heroEn: 'Wi-Fi, segmentation, VPN, monitoring, performance.',
      bulletsPt: [
        'precisam de Wi-Fi fiável e segmentação segura',
        'querem visibilidade sobre performance de rede',
        'precisam de VPN estável para equipas remotas',
        'querem reduzir outages entre localizações',
      ],
      bulletsEn: [
        'need reliable Wi-Fi and secure segmentation',
        'want visibility into network performance',
        'require stable VPN access for remote teams',
        'need to reduce outages across locations',
      ],
      deliverablesPt: [
        { title: 'Avaliação e mapeamento de rede', text: 'Inventário, hotspots de risco, bottlenecks.' },
        { title: 'Segmentação e regras de firewall', text: 'Reduzir movimento lateral e blast radius.' },
        { title: 'Redesign e tuning de Wi-Fi', text: 'Cobertura, densidade e performance.' },
        { title: 'Otimização de VPN e acesso remoto', text: 'Acesso fiável sem lentidão.' },
        { title: 'Baseline de monitorização e alertas', text: 'Saber antes dos utilizadores.' },
      ],
      deliverablesEn: [
        { title: 'Network assessment and mapping', text: 'Inventory, risk hotspots, bottlenecks.' },
        { title: 'Segmentation and firewall rules', text: 'Reduce lateral movement and blast radius.' },
        { title: 'Wi-Fi redesign and tuning', text: 'Coverage, density, and performance fixes.' },
        { title: 'VPN and remote access optimization', text: 'Reliable access without slowdown.' },
        { title: 'Monitoring and alerting baselines', text: 'Know before users complain.' },
      ],
      outcomesPt: [
        { title: 'Menos outages', text: 'Segmentação e monitorização melhores.' },
        { title: 'Acesso remoto previsível', text: 'VPN estável para equipas.' },
        { title: 'Mais visibilidade', text: 'Saúde de rede mensurável.' },
        { title: 'Melhor performance', text: 'Afinado para padrões reais de uso.' },
      ],
      outcomesEn: [
        { title: 'Fewer outages', text: 'Better segmentation and monitoring.' },
        { title: 'Predictable remote access', text: 'Stable VPN experience for teams.' },
        { title: 'Clearer visibility', text: 'Network health is measurable.' },
        { title: 'Better performance', text: 'Tuned for real usage patterns.' },
      ],
      stepsPt: [
        { title: 'Auditoria de rede', text: 'Mapear dispositivos, riscos e bottlenecks.' },
        { title: 'Design de melhorias', text: 'Planear segmentação e upgrades.' },
        { title: 'Implementação', text: 'Executar mudanças com mínimo downtime.' },
        { title: 'Monitorização', text: 'Acompanhar estabilidade e performance.' },
      ],
      stepsEn: [
        { title: 'Network audit', text: 'Map devices, risks, and bottlenecks.' },
        { title: 'Design fixes', text: 'Plan segmentation and improvements.' },
        { title: 'Implementation', text: 'Deploy changes with minimal downtime.' },
        { title: 'Monitoring', text: 'Track stability and performance.' },
      ],
    },
    {
      slug: 'services/infrastructure',
      template: 'infrastructure',
      titlePt: 'Infrastructure & Virtualization',
      titleEn: 'Infrastructure & Virtualization',
      heroPt: 'Virtualização, storage, backups e testes de recuperação.',
      heroEn: 'Virtualization, storage, backups, recovery testing.',
      bulletsPt: [
        'operam com infraestruturas antigas ou ambientes mistos',
        'precisam de confiança clara em backups e recovery',
        'querem performance mais previsível',
        'precisam de documentação que resista ao crescimento',
      ],
      bulletsEn: [
        'run on aging infrastructure or mixed environments',
        'need clear backup and recovery confidence',
        'want more predictable performance',
        'need documentation that survives growth',
      ],
      deliverablesPt: [
        { title: 'Avaliação e dimensionamento', text: 'Right-sizing e mapeamento de risco.' },
        { title: 'Tuning de virtualização e storage', text: 'Melhorias de performance e resiliência.' },
        { title: 'Backups e testes de recuperação', text: 'Provar recuperação antes de precisar.' },
        { title: 'Planeamento de ciclo de vida e patches', text: 'Reduzir outages surpresa.' },
        { title: 'Documentação operacional', text: 'Runbooks e mapas de sistema.' },
      ],
      deliverablesEn: [
        { title: 'Infrastructure assessment and sizing', text: 'Right-sizing and risk mapping.' },
        { title: 'Virtualization and storage tuning', text: 'Performance and resilience improvements.' },
        { title: 'Backup and recovery testing', text: 'Prove recovery before it’s needed.' },
        { title: 'Lifecycle and patch planning', text: 'Plan upgrades, reduce surprise outages.' },
        { title: 'Operational documentation', text: 'Runbooks and system maps.' },
      ],
      outcomesPt: [
        { title: 'Menos outages', text: 'Menos fragilidade nos sistemas core.' },
        { title: 'Recuperação mais rápida', text: 'Restores testados.' },
        { title: 'Clareza de capacidade', text: 'Saber o que escalar e quando.' },
        { title: 'Baseline documentada', text: 'Conhecimento reutilizável.' },
      ],
      outcomesEn: [
        { title: 'Fewer outages', text: 'Less fragility in core systems.' },
        { title: 'Faster recovery', text: 'Tested restore paths.' },
        { title: 'Capacity clarity', text: 'Know what to scale and when.' },
        { title: 'Documented baseline', text: 'Knowledge is reusable.' },
      ],
      stepsPt: [
        { title: 'Avaliar ambiente', text: 'Mapear hardware, risco e carga.' },
        { title: 'Estabilizar', text: 'Resolver as fragilidades maiores.' },
        { title: 'Otimizar', text: 'Ajustar performance e segurança.' },
        { title: 'Documentar', text: 'Manter conhecimento fora da cabeça das pessoas.' },
      ],
      stepsEn: [
        { title: 'Assess environment', text: 'Map hardware, risk, and load.' },
        { title: 'Stabilize', text: 'Address the biggest fragilities.' },
        { title: 'Optimize', text: 'Tune for performance and safety.' },
        { title: 'Document', text: 'Keep knowledge out of people’s heads.' },
      ],
    },
    {
      slug: 'services/strategy-roadmaps',
      template: 'strategy-roadmaps',
      titlePt: 'Strategy & Roadmaps',
      titleEn: 'Strategy & Roadmaps',
      heroPt: 'Plano realista de 12–24 meses: o que corrigir agora, o que investir depois.',
      heroEn: 'A realistic 12–24 month plan: what to fix now, what to invest in next.',
      bulletsPt: [
        'precisam de clareza sobre o que corrigir agora vs depois',
        'querem um plano de investimento realista',
        'precisam de alinhamento e visibilidade para stakeholders',
        'querem parar o gasto reativo',
      ],
      bulletsEn: [
        'need clarity on what to fix now vs later',
        'want a realistic investment plan',
        'need stakeholder alignment and visibility',
        'want to stop reactive spending',
      ],
      deliverablesPt: [
        { title: 'Baseline operacional e mapa de risco', text: 'Onde estão e o que é frágil.' },
        { title: 'Roadmap prioritário (12–24 meses)', text: 'Sequenciar correções por impacto e custo.' },
        { title: 'Orientação de budget e investimento', text: 'Gastar onde muda resultados.' },
        { title: 'Quick wins mensuráveis', text: 'Melhorias de estabilidade que se vêem.' },
        { title: 'Reporting para liderança', text: 'Traduzir operações em decisões.' },
      ],
      deliverablesEn: [
        { title: 'Operational baseline and risk map', text: 'Where you are and what’s fragile.' },
        { title: 'Priority roadmap (12–24 months)', text: 'Sequence fixes by impact and cost.' },
        { title: 'Budget and investment guidance', text: 'Spend where it changes outcomes.' },
        { title: 'Quick wins with measurable impact', text: 'Stability improvements you can show.' },
        { title: 'Leadership-ready reporting', text: 'Translate ops into decisions.' },
      ],
      outcomesPt: [
        { title: 'Prioridades claras', text: 'Corrigir as coisas certas primeiro.' },
        { title: 'Investimentos previsíveis', text: 'Sem despesas surpresa.' },
        { title: 'Menos gasto reativo', text: 'Reduzir budgets de firefighting.' },
        { title: 'Stakeholders alinhados', text: 'Toda a gente conhece o plano.' },
      ],
      outcomesEn: [
        { title: 'Clear priorities', text: 'Fix the right things first.' },
        { title: 'Predictable investments', text: 'No surprise spending.' },
        { title: 'Less reactive spend', text: 'Reduce firefighting budgets.' },
        { title: 'Aligned stakeholders', text: 'Everyone knows the plan.' },
      ],
      stepsPt: [
        { title: 'Descoberta', text: 'Entender contexto e constrangimentos.' },
        { title: 'Desenho do roadmap', text: 'Sequenciar correções e investimentos.' },
        { title: 'Alinhamento', text: 'Acordar escopo e ownership.' },
        { title: 'Apoio à execução', text: 'Manter ritmo com revisões.' },
      ],
      stepsEn: [
        { title: 'Discovery', text: 'Understand context and constraints.' },
        { title: 'Roadmap design', text: 'Sequence fixes and investments.' },
        { title: 'Alignment', text: 'Agree on scope and ownership.' },
        { title: 'Execution support', text: 'Keep momentum with reviews.' },
      ],
    },
  ];

  const allowedSlugs = new Set([
    'home',
    'about',
    'services',
    'impact',
    'contact',
    ...servicePages.map((service) => service.slug),
  ]);

  const existingPages = await payload.find({
    collection: 'pages',
    limit: 200,
    locale: 'pt',
  });

  for (const page of existingPages.docs ?? []) {
    const slug = typeof page.slug === 'string' ? page.slug : '';
    if (page.status === 'draft' || (slug && !allowedSlugs.has(slug))) {
      await payload.delete({
        collection: 'pages',
        id: page.id,
      });
    }
  }

  for (const service of servicePages) {
    const templateDataPt: ServiceTemplateData = {
      hero: {
        heading: service.titlePt,
        subheading: service.heroPt,
        primaryCTA: { label: 'Pedir diagnóstico', link: '/contact' },
        secondaryCTA: { label: 'Descarregar escopo (PDF)', link: '/service-scope.pdf' },
        badges: [{ text: 'Equipa sénior' }, { text: 'Segurança em primeiro lugar' }],
        image: servicesHero,
      },
      whoItsFor: {
        title: 'Ideal para equipas que…',
        items: service.bulletsPt.map((text) => ({ text })),
      },
      deliverables: {
        title: 'O que entregamos',
        items: service.deliverablesPt,
      },
      outcomes: {
        title: 'Resultados esperados',
        items: service.outcomesPt,
      },
      steps: {
        title: 'Como fazemos o onboarding',
        items: service.stepsPt,
      },
      cta: {
        title: 'Quer suporte previsível?',
        content: 'Alinhamos o contexto e propomos um plano prático.',
        primaryCTA: { label: 'Marcar chamada', link: '/contact' },
        secondaryCTA: { label: 'Enviar mensagem', link: '/contact' },
      },
    };

    const templateDataEn: ServiceTemplateData = {
      hero: {
        heading: service.titleEn,
        subheading: service.heroEn,
        primaryCTA: { label: 'Request an assessment', link: '/contact' },
        secondaryCTA: { label: 'Download scope PDF', link: '/service-scope.pdf' },
        badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
        image: servicesHero,
      },
      whoItsFor: {
        title: 'Best for teams that…',
        items: service.bulletsEn.map((text) => ({ text })),
      },
      deliverables: {
        title: 'What we deliver',
        items: service.deliverablesEn,
      },
      outcomes: {
        title: 'Outcomes you can expect',
        items: service.outcomesEn,
      },
      steps: {
        title: 'How we onboard',
        items: service.stepsEn,
      },
      cta: {
        title: 'Want support that feels predictable?',
        content: 'We’ll align on your context and propose a practical plan.',
        primaryCTA: { label: 'Book a call', link: '/contact' },
        secondaryCTA: { label: 'Send a message', link: '/contact' },
      },
    };

    if (service.template === 'cybersecurity') {
      templateDataPt.checklist = {
        title: 'Checklist base de segurança',
        items: [
          { item: 'MFA ativo em contas privilegiadas' },
          { item: 'Proteção de email e endpoint configurada' },
          { item: 'Backups testados e recuperação validada' },
          { item: 'Acesso condicional e least privilege' },
        ],
      };
      templateDataEn.checklist = {
        title: 'Security baseline checklist',
        items: [
          { item: 'MFA enforced for all privileged accounts' },
          { item: 'Email and endpoint protection configured' },
          { item: 'Backups tested and recovery verified' },
          { item: 'Conditional access and least privilege' },
        ],
      };
    }

    if (service.template === 'm365-cloud') {
      templateDataPt.stats = {
        title: 'Métricas de clareza cloud',
        intro: 'Resultados de base que procuramos atingir.',
        items: [
          { label: 'Desperdício de licenças', value: '↓ 25%' },
          { label: 'Problemas de acesso', value: '↓ 40%' },
          { label: 'Cobertura de políticas', value: '100%' },
        ],
      };
      templateDataEn.stats = {
        title: 'Cloud clarity metrics',
        intro: 'Baseline outcomes we aim to achieve.',
        items: [
          { label: 'Licensing waste', value: '↓ 25%' },
          { label: 'Access issues', value: '↓ 40%' },
          { label: 'Policy coverage', value: '100%' },
        ],
      };
    }

    await upsertLocalizedBySlug(
      payload,
      'pages',
      service.slug,
      {
        title: service.titlePt,
        slug: service.slug,
        status: 'published',
        serviceTemplate: service.template,
        serviceTemplateData: templateDataPt,
        layout: [
          {
            blockType: 'hero',
            sectionId: 'intro',
            variant: 'C',
            theme: 'brandGradient',
            heading: service.titlePt,
            subheading: service.heroPt,
            primaryCTA: { label: 'Pedir diagnóstico', link: '/contact' },
            secondaryCTA: { label: 'Descarregar escopo (PDF)', link: '/service-scope.pdf' },
            image: servicesHero,
            badges: [{ text: 'Equipa sénior' }, { text: 'Segurança em primeiro lugar' }],
          },
          {
            blockType: 'bullets',
            sectionId: 'who-its-for',
            title: 'Ideal para equipas que…',
            items: service.bulletsPt.map((text) => ({ text })),
          },
          {
            blockType: 'deliverables',
            sectionId: 'deliverables',
            title: 'O que entregamos',
            items: service.deliverablesPt,
          },
          {
            blockType: 'outcomesCards',
            sectionId: 'outcomes',
            title: 'Resultados esperados',
            cards: service.outcomesPt,
          },
          {
            blockType: 'steps',
            sectionId: 'onboarding',
            title: 'Como fazemos o onboarding',
            steps: service.stepsPt,
          },
          {
            blockType: 'finalCTA',
            sectionId: 'cta',
            title: 'Quer suporte previsível?',
            content: 'Alinhamos o contexto e propomos um plano prático.',
            primaryCTA: { label: 'Marcar chamada', link: '/contact' },
            secondaryCTA: { label: 'Enviar mensagem', link: '/contact' },
          },
        ],
        seo: {
          title: service.titlePt,
          description: service.heroPt,
        },
      },
      {
        title: service.titleEn,
        slug: service.slug,
        status: 'published',
        serviceTemplate: service.template,
        serviceTemplateData: templateDataEn,
        layout: [
          {
            blockType: 'hero',
            sectionId: 'intro',
            variant: 'C',
            theme: 'brandGradient',
            heading: service.titleEn,
            subheading: service.heroEn,
            primaryCTA: { label: 'Request an assessment', link: '/contact' },
            secondaryCTA: { label: 'Download scope PDF', link: '/service-scope.pdf' },
            image: servicesHero,
            badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
          },
          {
            blockType: 'bullets',
            sectionId: 'who-its-for',
            title: 'Best for teams that…',
            items: service.bulletsEn.map((text) => ({ text })),
          },
          {
            blockType: 'deliverables',
            sectionId: 'deliverables',
            title: 'What we deliver',
            items: service.deliverablesEn,
          },
          {
            blockType: 'outcomesCards',
            sectionId: 'outcomes',
            title: 'Outcomes you can expect',
            cards: service.outcomesEn,
          },
          {
            blockType: 'steps',
            sectionId: 'onboarding',
            title: 'How we onboard',
            steps: service.stepsEn,
          },
          {
            blockType: 'finalCTA',
            sectionId: 'cta',
            title: 'Want support that feels predictable?',
            content: 'We’ll align on your context and propose a practical plan.',
            primaryCTA: { label: 'Book a call', link: '/contact' },
            secondaryCTA: { label: 'Send a message', link: '/contact' },
          },
        ],
        seo: {
          title: service.titleEn,
          description: service.heroEn,
        },
      }
    );
  }

  await upsertLocalizedBySlug(
    payload,
    'pages',
    'impact',
    {
      title: 'Impacto',
      slug: 'impact',
      status: 'published',
      layout: [
        {
          blockType: 'hero',
          sectionId: 'intro',
          heading: 'Impacto real, sem marketing vazio.',
          subheading: 'Menos incidentes, mais previsibilidade e equipas mais calmas.',
          primaryCTA: { label: 'Marcar chamada', link: '/contact' },
          secondaryCTA: { label: 'Ver serviços', link: '/services' },
          image: impactHero,
          badges: [{ text: 'Equipa sénior' }, { text: 'Segurança em primeiro lugar' }, { text: 'Onboarding rápido' }],
        },
        {
          blockType: 'stats',
          sectionId: 'stats',
          title: 'Indicadores',
          intro: 'Resultados honestos ao fim de 90 dias.',
          items: [
            { label: 'Uptime', value: '99.99%' },
            { label: 'Incidentes críticos', value: '↓ 64%' },
            { label: 'Tempo de resposta', value: '< 15 min' },
          ],
        },
        {
          blockType: 'caseStudyTeaser',
          sectionId: 'cases',
          title: 'Casos reais',
          intro: 'Exemplos de operações estabilizadas.',
          items: [
            {
              title: 'HealthOps',
              industry: 'Saúde',
              challenge: 'Incidentes semanais e pouca visibilidade.',
              result: 'Incidentes críticos -58%',
              link: '/news',
            },
            {
              title: 'FinTech North',
              industry: 'FinTech',
              challenge: 'M365 sem governança e risco de compliance.',
              result: 'Auditorias sem findings',
              link: '/news',
            },
            {
              title: 'Retail Nova',
              industry: 'Retalho',
              challenge: 'Infraestrutura instável em lojas.',
              result: 'Uptime 99.95%',
              link: '/news',
            },
          ],
        },
        {
          blockType: 'testimonials',
          sectionId: 'testimonials',
          title: 'O que mudou',
          intro: 'Mais clareza, menos stress operacional.',
          items: [
            {
              quote: 'Finalmente temos um plano e métricas claras.',
              name: 'Carla Matos',
              role: 'Operations Director',
              company: 'Retail Nova',
              logo: testimonialLogo,
            },
          ],
        },
        {
          blockType: 'finalCTA',
          sectionId: 'cta',
          title: 'Queres medir impacto?',
          content: 'Definimos métricas e melhoramos mês a mês.',
          primaryCTA: { label: 'Falar connosco', link: '/contact' },
          secondaryCTA: { label: 'Ver serviços', link: '/services' },
        },
      ],
      seo: {
        title: 'Impacto | Loading Happiness',
        description: 'Resultados tangíveis em estabilidade, segurança e suporte.',
      },
    },
    {
      title: 'Impact',
      slug: 'impact',
      status: 'published',
      layout: [
        {
          blockType: 'hero',
          sectionId: 'intro',
          heading: 'Real impact without fluff.',
          subheading: 'Fewer incidents, more predictability, calmer teams.',
          primaryCTA: { label: 'Book a call', link: '/contact' },
          secondaryCTA: { label: 'Explore services', link: '/services' },
          image: impactHero,
          badges: [{ text: 'Senior-led' }, { text: 'Security-first' }, { text: 'Fast onboarding' }],
        },
        {
          blockType: 'stats',
          sectionId: 'stats',
          title: 'Indicators',
          intro: 'Honest results after 90 days.',
          items: [
            { label: 'Uptime', value: '99.99%' },
            { label: 'Critical incidents', value: '↓ 64%' },
            { label: 'Response time', value: '< 15 min' },
          ],
        },
        {
          blockType: 'caseStudyTeaser',
          sectionId: 'cases',
          title: 'Real cases',
          intro: 'Examples of stabilized operations.',
          items: [
            {
              title: 'HealthOps',
              industry: 'Healthcare',
              challenge: 'Weekly incidents with low visibility.',
              result: 'Critical incidents -58%',
              link: '/news',
            },
            {
              title: 'FinTech North',
              industry: 'FinTech',
              challenge: 'Ungoverned M365 and compliance risk.',
              result: 'Clean audits',
              link: '/news',
            },
            {
              title: 'Retail Nova',
              industry: 'Retail',
              challenge: 'Unstable store infrastructure.',
              result: 'Uptime 99.95%',
              link: '/news',
            },
          ],
        },
        {
          blockType: 'testimonials',
          sectionId: 'testimonials',
          title: 'What changed',
          intro: 'More clarity, less operational stress.',
          items: [
            {
              quote: 'We finally have a plan and clear metrics.',
              name: 'Carla Matos',
              role: 'Operations Director',
              company: 'Retail Nova',
              logo: testimonialLogo,
            },
          ],
        },
        {
          blockType: 'finalCTA',
          sectionId: 'cta',
          title: 'Want measurable impact?',
          content: 'We define metrics and improve month after month.',
          primaryCTA: { label: 'Talk to us', link: '/contact' },
          secondaryCTA: { label: 'Explore services', link: '/services' },
        },
      ],
      seo: {
        title: 'Impact | Loading Happiness',
        description: 'Tangible outcomes in stability, security, and support.',
      },
    }
  );

  await upsertLocalizedBySlug(
    payload,
    'pages',
    'contact',
    {
      title: 'Contacto',
      slug: 'contact',
      status: 'published',
      layout: [
        {
          blockType: 'hero',
          sectionId: 'intro',
          heading: 'Vamos criar estabilidade.',
          subheading: 'Explica o contexto e respondemos com um plano claro.',
          primaryCTA: { label: 'Enviar mensagem', link: '#form' },
          secondaryCTA: { label: 'Ver serviços', link: '/services' },
          image: contactHero,
          badges: [{ text: 'Equipa sénior' }, { text: 'Segurança em primeiro lugar' }, { text: 'Onboarding rápido' }],
        },
        {
          blockType: 'contactForm',
          sectionId: 'form',
          title: 'Fala connosco',
          intro: 'Respondemos normalmente em 1 dia útil.',
          submitLabel: 'Enviar mensagem',
          topics: [
            { label: 'Managed IT' },
            { label: 'Cybersecurity' },
            { label: 'Cloud & M365' },
            { label: 'Projects' },
            { label: 'General' },
          ],
        },
        {
          blockType: 'faq',
          sectionId: 'faq',
          title: 'Perguntas rápidas',
          items: [
            { question: 'Quanto tempo para começar?', answer: 'Normalmente entre 1 e 2 semanas.' },
            { question: 'Trabalham com equipas remotas?', answer: 'Sim, com suporte remoto e visitas planeadas.' },
          ],
        },
      ],
      seo: {
        title: 'Contacto | Loading Happiness',
        description: 'Fala connosco para estabilizar operações e segurança.',
      },
    },
    {
      title: 'Contact',
      slug: 'contact',
      status: 'published',
      layout: [
        {
          blockType: 'hero',
          sectionId: 'intro',
          heading: 'Let’s build stability.',
          subheading: 'Share your context and we’ll respond with a clear plan.',
          primaryCTA: { label: 'Send message', link: '#form' },
          secondaryCTA: { label: 'Explore services', link: '/services' },
          image: contactHero,
          badges: [{ text: 'Senior-led' }, { text: 'Security-first' }, { text: 'Fast onboarding' }],
        },
        {
          blockType: 'contactForm',
          sectionId: 'form',
          title: 'Talk to us',
          intro: 'We typically reply within one business day.',
          submitLabel: 'Send message',
          topics: [
            { label: 'Managed IT' },
            { label: 'Cybersecurity' },
            { label: 'Cloud & M365' },
            { label: 'Projects' },
            { label: 'General' },
          ],
        },
        {
          blockType: 'faq',
          sectionId: 'faq',
          title: 'Quick answers',
          items: [
            { question: 'How fast can we start?', answer: 'Typically within 1–2 weeks.' },
            { question: 'Do you support remote teams?', answer: 'Yes, with remote support and planned visits.' },
          ],
        },
      ],
      seo: {
        title: 'Contact | Loading Happiness',
        description: 'Reach out to stabilize operations and security.',
      },
    }
  );

  const contentSeed: ContentSeedItem[] = [
    {
      slugPt: 'checklist-seguranca-base',
      slugEn: 'security-basics-checklist',
      contentType: 'Guide',
      titlePt: 'Checklist de segurança base para PMEs',
      titleEn: 'Security basics checklist for SMEs',
      excerptPt: 'Os 10 controlos que evitam os incidentes mais comuns.',
      excerptEn: '10 controls that prevent the most common incidents.',
      tags: [tagSecurity, tagOperations],
      categories: [categorySecurity],
      authors: [authorMaria],
      bodyPt: [
        {
          blockType: 'richText',
          content:
            'Uma checklist simples para começar hoje. Não precisa de ferramentas complexas — precisa de disciplina e clareza.',
        },
        {
          blockType: 'checklist',
          title: 'Os 10 controlos essenciais',
          items: [
            { item: 'MFA em contas críticas' },
            { item: 'Backups testados trimestralmente' },
            { item: 'Inventário atualizado de ativos' },
            { item: 'Least privilege em todas as equipas' },
          ],
        },
        {
          blockType: 'callout',
          title: 'Dica rápida',
          content: 'Se não consegues restaurar um backup em 30 minutos, isso não é um backup.',
          type: 'tip',
        },
      ],
      bodyEn: [
        {
          blockType: 'richText',
          content:
            'A simple checklist to start today. You don’t need fancy tools — you need discipline and clarity.',
        },
        {
          blockType: 'checklist',
          title: 'The 10 essentials',
          items: [
            { item: 'MFA on critical accounts' },
            { item: 'Quarterly backup tests' },
            { item: 'Up-to-date asset inventory' },
            { item: 'Least privilege everywhere' },
          ],
        },
        {
          blockType: 'callout',
          title: 'Quick tip',
          content: 'If you can’t restore a backup in 30 minutes, it’s not a backup.',
          type: 'tip',
        },
      ],
    },
    {
      slugPt: 'm365-sem-caos',
      slugEn: 'm365-without-chaos',
      contentType: 'Article',
      titlePt: 'M365 sem caos: 5 decisões que evitam incidentes',
      titleEn: 'M365 without chaos: 5 decisions that prevent incidents',
      excerptPt: 'Governança simples que reduz tickets e erros humanos.',
      excerptEn: 'Simple governance that reduces tickets and human error.',
      tags: [tagCloud, tagOperations],
      categories: [categoryOperations],
      authors: [authorTiago],
      bodyPt: [
        {
          blockType: 'richText',
          content:
            'Antes de adicionar ferramentas, define regras claras: permissões, ownership e alertas.',
        },
        {
          blockType: 'pullQuote',
          quote: 'Governança não é burocracia — é previsibilidade.',
          author: 'Loading Happiness',
        },
      ],
      bodyEn: [
        {
          blockType: 'richText',
          content: 'Before adding tools, define rules: permissions, ownership, and alerts.',
        },
        {
          blockType: 'pullQuote',
          quote: 'Governance is not bureaucracy — it’s predictability.',
          author: 'Loading Happiness',
        },
      ],
    },
    {
      slugPt: 'video-incident-response',
      slugEn: 'incident-response-video',
      contentType: 'Video',
      titlePt: 'Vídeo: 3 passos para resposta a incidentes',
      titleEn: 'Video: 3-step incident response',
      excerptPt: 'Um fluxo simples para reduzir o tempo de recuperação.',
      excerptEn: 'A simple flow to reduce recovery time.',
      tags: [tagSecurity],
      categories: [categorySecurity],
      authors: [authorMaria],
      bodyPt: [
        {
          blockType: 'richText',
          content: 'O objetivo é reduzir o tempo de recuperação sem perder controlo.',
        },
      ],
      bodyEn: [
        {
          blockType: 'richText',
          content: 'The goal is to reduce recovery time without losing control.',
        },
      ],
      videoDataPt: {
        provider: 'YouTube',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '6:12',
        transcript: 'Passo 1: Isolar. Passo 2: Conter. Passo 3: Recuperar.',
      },
      videoDataEn: {
        provider: 'YouTube',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '6:12',
        transcript: 'Step 1: Isolate. Step 2: Contain. Step 3: Recover.',
      },
    },
  ];

  for (const item of contentSeed) {
    const existing = await payload.find({
      collection: 'content',
      where: { slug: { equals: item.slugPt } },
      limit: 1,
      locale: 'pt',
    });

    let id = existing.docs?.[0]?.id;
    const baseData: Pick<
      Content,
      | 'contentType'
      | 'status'
      | 'publishedAt'
      | 'featuredImage'
      | 'authors'
      | 'categories'
      | 'tags'
      | 'heroStyle'
    > = {
      contentType: item.contentType,
      status: 'published',
      publishedAt: now,
      featuredImage: newsImage,
      authors: item.authors,
      categories: item.categories,
      tags: item.tags,
      heroStyle: 'Large',
    };

    if (!id) {
      const created = await payload.create({
        collection: 'content',
        locale: 'pt',
        data: {
          ...baseData,
          title: item.titlePt,
          slug: item.slugPt,
          excerpt: item.excerptPt,
          body: item.bodyPt,
          seo: { title: item.titlePt, description: item.excerptPt },
          videoData: item.videoDataPt,
        },
      });
      id = created.id;
    } else {
      await payload.update({
        collection: 'content',
        id,
        locale: 'pt',
        data: {
          ...baseData,
          title: item.titlePt,
          slug: item.slugPt,
          excerpt: item.excerptPt,
          body: item.bodyPt,
          seo: { title: item.titlePt, description: item.excerptPt },
          videoData: item.videoDataPt,
        },
      });
    }

    await payload.update({
      collection: 'content',
      id,
      locale: 'en',
      data: {
        ...baseData,
        title: item.titleEn,
        slug: item.slugEn,
        excerpt: item.excerptEn,
        body: item.bodyEn,
        seo: { title: item.titleEn, description: item.excerptEn },
        videoData: item.videoDataEn,
      },
    });
  }

  console.log('Site pages and content seeded.');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
