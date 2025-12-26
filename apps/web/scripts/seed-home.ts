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

  const layoutPt: any = [
    {
      blockType: 'hero',
      enabled: true,
      anchorId: 'top',
      variant: 'A',
      theme: 'brandGradient',
      eyebrow: 'TI com um coracao humano',
      h1Title: 'Servicos de TI geridos e ciberseguranca para empresas em Portugal',
      heading: 'Servicos de TI geridos e ciberseguranca para empresas em Portugal',
      subheadline:
        'Mantemos a tua operacao estavel, segura e produtiva - com suporte rapido, processos claros e decisoes tecnicas sem conversa fiada.',
      subheading:
        'Mantemos a tua operacao estavel, segura e produtiva - com suporte rapido, processos claros e decisoes tecnicas sem conversa fiada.',
      trustLine: 'Portugal - PME e equipas IT - Resposta rapida',
      keywordsInline: 'TI gerida / ciberseguranca / suporte / cloud',
      primaryCTA: { label: 'Pedir diagnostico', link: '/contact', trackingId: 'hero-primary' },
      secondaryCTA: { label: 'Ver servicos', link: '/services' },
      heroImage,
      image: heroImage,
      mediaType: 'illustration',
      badges: [
        { text: 'Suporte rapido e pragmatico', label: 'Suporte rapido e pragmatico', icon: 'FAST' },
        { text: 'Seguranca por desenho', label: 'Seguranca por desenho', icon: 'SEC' },
        { text: 'Parceria de longo prazo', label: 'Parceria de longo prazo', icon: 'PARTNER' },
      ],
    },
    {
      blockType: 'servicesGrid',
      enabled: true,
      anchorId: 'services',
      title: 'O que fazemos',
      sectionTitle: 'O que fazemos',
      sectionIntro: 'Servicos focados em continuidade, seguranca e suporte que resolve.',
      services: [
        {
          title: 'TI Gerida (Managed IT)',
          description: 'Operacao proativa que reduz paragens e ruido.',
          icon: 'IT',
          link: '/services/managed-it',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/managed-it',
          serviceCategory: 'TI Gerida',
          bulletPoints: [
            { text: 'Monitorizacao' },
            { text: 'Manutencao preventiva' },
            { text: 'Gestao de endpoints' },
            { text: 'Suporte ao utilizador' },
          ],
        },
        {
          title: 'Ciberseguranca',
          description: 'Controlos praticos que reduzem o risco real.',
          icon: 'SEC',
          link: '/services/cybersecurity',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/cybersecurity',
          serviceCategory: 'Ciberseguranca',
          bulletPoints: [
            { text: 'Hardening' },
            { text: 'MFA e acesso' },
            { text: 'EDR' },
            { text: 'Resposta a incidentes' },
          ],
        },
        {
          title: 'Infraestrutura e Cloud',
          description: 'Bases solidas para crescer com seguranca.',
          icon: 'CLOUD',
          link: '/services/infrastructure-cloud',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/infrastructure-cloud',
          serviceCategory: 'Infraestrutura e Cloud',
          bulletPoints: [
            { text: 'Redes' },
            { text: 'Virtualizacao' },
            { text: 'Backups' },
            { text: 'Migracoes' },
          ],
        },
        {
          title: 'Consultoria e Projetos',
          description: 'Decisoes tecnicas com impacto no negocio.',
          icon: 'CONSULT',
          link: '/services/consulting',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/consulting',
          serviceCategory: 'Consultoria e Projetos',
          bulletPoints: [
            { text: 'Arquitetura' },
            { text: 'Roadmaps' },
            { text: 'Auditorias' },
            { text: 'Otimizacao de custos' },
          ],
        },
      ],
      ctaLabel: 'Ver todos os servicos',
      ctaHref: '/services',
    },
    {
      blockType: 'trustPartners',
      enabled: true,
      anchorId: 'partners',
      sectionTitle: 'Parceiros e tecnologias',
      trustCopy: 'Selecionamos ferramentas pela fiabilidade e suporte - nao por moda.',
      logos: logoIds.map((id, index) => ({
        logo: id,
        name: `Parceiro ${index + 1}`,
        alt: 'Logo de parceiro',
      })),
    },
    {
      blockType: 'pillars',
      enabled: true,
      anchorId: 'pillars',
      title: 'Como trabalhamos',
      sectionTitle: 'Como trabalhamos',
      items: [
        {
          title: 'Rigor tecnico',
          content: 'Decisoes por evidencia, documentacao e boas praticas.',
          description: 'Decisoes por evidencia, documentacao e boas praticas.',
          proofPoint: 'Processos e checklists em cada entrega.',
          icon: 'RIGOR',
        },
        {
          title: 'Seguranca pragmatica',
          content: 'Menos risco real, nao so relatorios.',
          description: 'Menos risco real, nao so relatorios.',
          proofPoint: 'MFA + backups testados + hardening.',
          icon: 'SEC',
        },
        {
          title: 'Toque humano',
          content: 'Comunicacao clara e respeito pelo teu negocio.',
          description: 'Comunicacao clara e respeito pelo teu negocio.',
          proofPoint: 'Sem jargao, sem jogos.',
          icon: 'PARTNER',
        },
      ],
    },
    {
      blockType: 'process',
      enabled: true,
      anchorId: 'process',
      title: 'O processo',
      sectionTitle: 'O processo',
      steps: [
        {
          stepNumber: 1,
          title: 'Diagnostico rapido',
          content: 'Entendemos contexto, riscos e prioridades.',
        },
        {
          stepNumber: 2,
          title: 'Plano de acao',
          content: 'Proposta objetiva com impacto, custo e prazo.',
        },
        {
          stepNumber: 3,
          title: 'Implementacao',
          content: 'Mudancas controladas, com validacao.',
        },
        {
          stepNumber: 4,
          title: 'Operacao e melhoria continua',
          content: 'Monitorizacao, suporte e evolucao.',
        },
      ],
      ctaLabel: 'Agendar diagnostico',
      ctaHref: '/contact',
      image: processImage,
    },
    {
      blockType: 'impactTeaser',
      enabled: true,
      anchorId: 'impact',
      title: 'Impacto no dia a dia',
      sectionTitle: 'Impacto no dia a dia',
      content: 'Equipas mais calmas, menos incidentes e operacao previsivel.',
      metrics: [
        { value: 'Menos paragens', label: 'Operacao mais estavel' },
        { value: 'Menos risco', label: 'Controlos essenciais implementados' },
        { value: 'Mais previsibilidade', label: 'Processos e suporte estruturados' },
      ],
      miniCase:
        'Reduzimos falhas recorrentes ao padronizar endpoints, backups testados e hardening - com suporte mais rapido e menos ruido.',
      cta: {
        label: 'Ver impacto',
        link: '/impact',
      },
      ctaLabel: 'Ver impacto',
      ctaHref: '/impact',
      image: impactImage,
    },
    {
      blockType: 'videoEmbed',
      enabled: true,
      anchorId: 'video',
      title: 'Em 90 segundos: o que a Loading Happiness resolve',
      sectionTitle: 'Em 90 segundos: o que a Loading Happiness resolve',
      intro: 'Se preferes falar com pessoas e nao com "tickets", estas no sitio certo.',
      videoProvider: 'youtube',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'Visao geral da Loading Happiness',
      transcript:
        'Em 90 segundos explicamos como estabilizamos operacoes, reduzimos risco e damos suporte com clareza. O foco e tirar peso as equipas e devolver previsibilidade.',
      ctaLabel: 'Falar connosco',
      ctaHref: '/contact',
    },
    {
      blockType: 'imageGallery',
      enabled: true,
      anchorId: 'gallery',
      title: 'Bastidores e equipa',
      sectionTitle: 'Bastidores e equipa',
      images: [
        { image: galleryOne, alt: 'Equipa em reuniao', caption: 'Colaboracao no dia a dia.' },
        { image: galleryTwo, alt: 'Revisao de infraestrutura', caption: 'Planeamento e melhoria continua.' },
      ],
      galleryNote: 'Preferimos imagens reais sempre que possivel.',
    },
    {
      blockType: 'splitContent',
      enabled: true,
      anchorId: 'about',
      title: 'Tecnologia com um coracao humano',
      sectionTitle: 'Tecnologia com um coracao humano',
      bodyRichText:
        'A Loading Happiness existe para tirar peso as empresas: menos falhas, menos stress, mais previsibilidade.\n\nTrabalhamos com processos, documentacao e prioridades claras. Se algo nao faz sentido, dizemos.',
      items: [
        { item: 'Suporte que resolve (e explica)' },
        { item: 'Seguranca aplicada ao terreno' },
        { item: 'Decisoes tecnicas com impacto no negocio' },
      ],
      ctaLabel: 'Conhecer a empresa',
      ctaHref: '/about',
      secondaryLinkLabel: 'Ver servicos',
      secondaryLinkHref: '/services',
      image: splitImage,
      layout: 'imageRight',
    },
    {
      blockType: 'featureGrid',
      enabled: true,
      anchorId: 'features',
      title: 'O que esta incluido',
      sectionTitle: 'O que esta incluido',
      columns: 3,
      items: [
        {
          title: 'Monitorizacao e alertas',
          content: 'Observabilidade e resposta antes de virar crise.',
          icon: 'MON',
        },
        {
          title: 'Backups com testes',
          content: 'Nao basta ter backup. Tem de recuperar.',
          icon: 'BKP',
        },
        {
          title: 'Gestao de acessos e MFA',
          content: 'Protecao basica com grande impacto.',
          icon: 'MFA',
        },
        {
          title: 'Gestao de patches',
          content: 'Atualizacoes planeadas, menos surpresas.',
          icon: 'PATCH',
        },
        {
          title: 'Inventario e padroes',
          content: 'Visibilidade real e consistencia tecnica.',
          icon: 'INV',
        },
        {
          title: 'Relatorios simples e uteis',
          content: 'O que interessa para decidir.',
          icon: 'REPORT',
        },
      ],
    },
    {
      blockType: 'finalCTA',
      enabled: true,
      anchorId: 'contact',
      title: 'Queres por a tua TI a funcionar sem drama?',
      content: 'Diz-nos o contexto. Nos dizemos-te o caminho - com prioridades e custo estimado.',
      subtitle: 'Diz-nos o contexto. Nos dizemos-te o caminho - com prioridades e custo estimado.',
      primaryCTA: { label: 'Falar connosco', link: '/contact' },
      secondaryCTA: { label: 'Ver servicos', link: '/services' },
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
      eyebrow: 'IT with a human heart',
      h1Title: 'Managed IT services and cybersecurity for businesses in Portugal',
      heading: 'Managed IT services and cybersecurity for businesses in Portugal',
      subheadline:
        'We keep your operations stable, secure, and productive - with fast support, clear processes, and plain-spoken technical decisions.',
      subheading:
        'We keep your operations stable, secure, and productive - with fast support, clear processes, and plain-spoken technical decisions.',
      trustLine: 'Portugal - SMEs and IT teams - Fast response',
      keywordsInline: 'managed IT / cybersecurity / support / cloud',
      primaryCTA: { label: 'Request a diagnostic', link: '/contact', trackingId: 'hero-primary' },
      secondaryCTA: { label: 'See services', link: '/services' },
      heroImage,
      image: heroImage,
      mediaType: 'illustration',
      badges: [
        { text: 'Fast, pragmatic support', label: 'Fast, pragmatic support', icon: 'FAST' },
        { text: 'Security by design', label: 'Security by design', icon: 'SEC' },
        { text: 'Long-term partner', icon: 'PARTNER' },
      ],
    },
    {
      blockType: 'servicesGrid',
      enabled: true,
      anchorId: 'services',
      title: 'What we do',
      sectionTitle: 'What we do',
      sectionIntro: 'Services focused on continuity, security, and support that resolves.',
      services: [
        {
          title: 'Managed IT',
          description: 'Proactive operations that reduce downtime and noise.',
          icon: 'IT',
          link: '/services/managed-it',
          ctaLabel: 'Learn more',
          ctaHref: '/services/managed-it',
          serviceCategory: 'Managed IT',
          bulletPoints: [
            { text: 'Monitoring' },
            { text: 'Preventive maintenance' },
            { text: 'Endpoint management' },
            { text: 'User support' },
          ],
        },
        {
          title: 'Cybersecurity',
          description: 'Practical controls that reduce real risk.',
          icon: 'SEC',
          link: '/services/cybersecurity',
          ctaLabel: 'Learn more',
          ctaHref: '/services/cybersecurity',
          serviceCategory: 'Cybersecurity',
          bulletPoints: [
            { text: 'Hardening' },
            { text: 'MFA and access' },
            { text: 'EDR' },
            { text: 'Incident response' },
          ],
        },
        {
          title: 'Infrastructure and Cloud',
          description: 'Solid foundations to grow with confidence.',
          icon: 'CLOUD',
          link: '/services/infrastructure-cloud',
          ctaLabel: 'Learn more',
          ctaHref: '/services/infrastructure-cloud',
          serviceCategory: 'Infrastructure and Cloud',
          bulletPoints: [
            { text: 'Networks' },
            { text: 'Virtualization' },
            { text: 'Backups' },
            { text: 'Migrations' },
          ],
        },
        {
          title: 'Consulting and Projects',
          description: 'Technical decisions with business impact.',
          icon: 'CONSULT',
          link: '/services/consulting',
          ctaLabel: 'Learn more',
          ctaHref: '/services/consulting',
          serviceCategory: 'Consulting and Projects',
          bulletPoints: [
            { text: 'Architecture' },
            { text: 'Roadmaps' },
            { text: 'Audits' },
            { text: 'Cost optimization' },
          ],
        },
      ],
      ctaLabel: 'View all services',
      ctaHref: '/services',
    },
    {
      blockType: 'trustPartners',
      enabled: true,
      anchorId: 'partners',
      sectionTitle: 'Partners and technologies',
      trustCopy: 'We choose tools for reliability and support - not for hype.',
      logos: logoIds.map((id, index) => ({
        logo: id,
        name: `Partner ${index + 1}`,
        alt: 'Partner logo',
      })),
    },
    {
      blockType: 'pillars',
      enabled: true,
      anchorId: 'pillars',
      title: 'How we work',
      sectionTitle: 'How we work',
      items: [
        {
          title: 'Technical rigor',
          content: 'Evidence-based decisions, documentation, and good practices.',
          description: 'Evidence-based decisions, documentation, and good practices.',
          proofPoint: 'Processes and checklists in every delivery.',
          icon: 'RIGOR',
        },
        {
          title: 'Pragmatic security',
          content: 'Less real risk, not just reports.',
          description: 'Less real risk, not just reports.',
          proofPoint: 'MFA + tested backups + hardening.',
          icon: 'SEC',
        },
        {
          title: 'Human touch',
          content: 'Clear communication and respect for your business.',
          description: 'Clear communication and respect for your business.',
          proofPoint: 'No jargon, no games.',
          icon: 'PARTNER',
        },
      ],
    },
    {
      blockType: 'process',
      enabled: true,
      anchorId: 'process',
      title: 'The process',
      sectionTitle: 'The process',
      steps: [
        {
          stepNumber: 1,
          title: 'Quick diagnostic',
          content: 'We understand context, risks, and priorities.',
        },
        {
          stepNumber: 2,
          title: 'Action plan',
          content: 'Objective proposal with impact, cost, and timing.',
        },
        {
          stepNumber: 3,
          title: 'Implementation',
          content: 'Controlled changes, with validation.',
        },
        {
          stepNumber: 4,
          title: 'Operations and continuous improvement',
          content: 'Monitoring, support, and evolution.',
        },
      ],
      ctaLabel: 'Schedule a diagnostic',
      ctaHref: '/contact',
      image: processImage,
    },
    {
      blockType: 'impactTeaser',
      enabled: true,
      anchorId: 'impact',
      title: 'Everyday impact',
      sectionTitle: 'Everyday impact',
      content: 'Calmer teams, fewer incidents, and predictable operations.',
      metrics: [
        { value: 'Less downtime', label: 'More stable operations' },
        { value: 'Less risk', label: 'Essential controls in place' },
        { value: 'More predictability', label: 'Structured processes and support' },
      ],
      miniCase:
        'We reduced recurring failures by standardizing endpoints, testing backups, and hardening - with faster support and less noise.',
      cta: {
        label: 'See impact',
        link: '/impact',
      },
      ctaLabel: 'See impact',
      ctaHref: '/impact',
      image: impactImage,
    },
    {
      blockType: 'videoEmbed',
      enabled: true,
      anchorId: 'video',
      title: 'In 90 seconds: what Loading Happiness solves',
      sectionTitle: 'In 90 seconds: what Loading Happiness solves',
      intro: 'If you prefer to talk to people instead of "tickets", you are in the right place.',
      videoProvider: 'youtube',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'Loading Happiness overview',
      transcript:
        'In under two minutes we explain how we stabilize operations, reduce risk, and deliver support with clarity. The goal is less weight on teams and more predictable outcomes.',
      ctaLabel: 'Talk to us',
      ctaHref: '/contact',
    },
    {
      blockType: 'imageGallery',
      enabled: true,
      anchorId: 'gallery',
      title: 'Behind the scenes',
      sectionTitle: 'Behind the scenes',
      images: [
        { image: galleryOne, alt: 'Team meeting', caption: 'Everyday collaboration.' },
        { image: galleryTwo, alt: 'Infrastructure review', caption: 'Planning and continuous improvement.' },
      ],
      galleryNote: 'Real photos build trust - we use them whenever possible.',
    },
    {
      blockType: 'splitContent',
      enabled: true,
      anchorId: 'about',
      title: 'Technology with a human heart',
      sectionTitle: 'Technology with a human heart',
      bodyRichText:
        'Loading Happiness exists to lift weight from teams: fewer failures, less stress, more predictability.\n\nWe work with processes, documentation, and clear priorities. If something does not make sense, we say it.',
      items: [
        { item: 'Support that resolves (and explains)' },
        { item: 'Security applied in the field' },
        { item: 'Technical decisions with business impact' },
      ],
      ctaLabel: 'Learn about the company',
      ctaHref: '/about',
      secondaryLinkLabel: 'See services',
      secondaryLinkHref: '/services',
      image: splitImage,
      layout: 'imageRight',
    },
    {
      blockType: 'featureGrid',
      enabled: true,
      anchorId: 'features',
      title: 'What is included',
      sectionTitle: 'What is included',
      columns: 3,
      items: [
        {
          title: 'Monitoring and alerts',
          content: 'Visibility and response before it becomes a crisis.',
          icon: 'MON',
        },
        {
          title: 'Backups with testing',
          content: 'Backups only matter when they restore.',
          icon: 'BKP',
        },
        {
          title: 'Access management and MFA',
          content: 'Baseline protection with high impact.',
          icon: 'MFA',
        },
        {
          title: 'Patch management',
          content: 'Planned updates, fewer surprises.',
          icon: 'PATCH',
        },
        {
          title: 'Inventory and standards',
          content: 'Real visibility and technical consistency.',
          icon: 'INV',
        },
        {
          title: 'Simple, useful reporting',
          content: 'What matters for decision-making.',
          icon: 'REPORT',
        },
      ],
    },
    {
      blockType: 'finalCTA',
      enabled: true,
      anchorId: 'contact',
      title: 'Want IT that runs without drama?',
      content: 'Tell us the context. We will outline the path - with priorities and estimated cost.',
      subtitle: 'Tell us the context. We will outline the path - with priorities and estimated cost.',
      primaryCTA: { label: 'Talk to us', link: '/contact' },
      secondaryCTA: { label: 'See services', link: '/services' },
      microcopy: 'Typical response within 1 business day.',
    },
  ];

  const seoPt = {
    title: 'Loading Happiness | TI gerida, Ciberseguranca e Suporte com coracao humano',
    description:
      'Servicos de TI geridos, ciberseguranca e consultoria em Portugal. Reduzimos riscos, aumentamos produtividade e damos suporte rapido com um toque humano.',
    image: heroImage,
  };

  const seoEn = {
    title: 'Loading Happiness | Managed IT, Cybersecurity, and Human-Centered Support',
    description:
      'Managed IT services, cybersecurity, and consulting in Portugal. We reduce risk, boost productivity, and provide fast support with a human touch.',
    image: heroImage,
  };

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
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
        title: 'Home',
        slug: 'home',
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
        title: 'Home',
        slug: 'home',
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
      title: 'Home',
      slug: 'home',
      status: 'published',
      layout: layoutEn,
      seo: seoEn,
    },
  });

  // eslint-disable-next-line no-console
  console.log('Home page seeded (PT and EN).');
  process.exit(0);
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
