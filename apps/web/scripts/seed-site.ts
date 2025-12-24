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
          heading: 'Tecnologia com coração humano.',
          subheading: 'Equipa sénior, foco em estabilidade e suporte humano para operações exigentes.',
          primaryCTA: { label: 'Marcar chamada', link: '/contact' },
          secondaryCTA: { label: 'Ver serviços', link: '/services' },
          image: heroImage,
          badges: [{ text: 'Senior-led' }, { text: 'Security-first' }, { text: 'Fast onboarding' }],
        },
        {
          blockType: 'splitContent',
          sectionId: 'overview',
          title: 'Como trabalhamos',
          content: 'Diagnóstico rápido, plano claro e execução com documentação real.',
          items: [
            { item: 'Mapeamos risco e prioridades em 2 semanas.' },
            { item: 'Reduzimos incidentes e criamos estabilidade.' },
            { item: 'Automatizamos o que bloqueia a equipa.' },
          ],
          cta: { label: 'Falar connosco', link: '/contact' },
          image: heroImage,
          reverse: true,
        },
        {
          blockType: 'pillars',
          sectionId: 'values',
          title: 'Valores',
          items: [
            { title: 'Integridade', content: 'Transparência total, mesmo quando é desconfortável.', icon: '⚖️' },
            { title: 'Empatia', content: 'Menos stress para as equipas, mais foco no trabalho.', icon: '🤝' },
            { title: 'Pragmatismo', content: 'Segurança e estabilidade antes de “fancy”.', icon: '🛠️' },
          ],
        },
        {
          blockType: 'featureGrid',
          sectionId: 'not-do',
          title: 'O que não fazemos',
          columns: 3,
          items: [
            { title: 'Projetos sem documentação', content: 'Nada fica só na memória.', icon: '✍️' },
            { title: 'Promessas vagas', content: 'Métricas reais e prazos claros.', icon: '📐' },
            { title: 'Suporte reativo', content: 'Agimos antes de quebrar.', icon: '🛡️' },
          ],
        },
        {
          blockType: 'testimonials',
          sectionId: 'testimonials',
          title: 'Equipas mais calmas',
          intro: 'Parceiros que reduziram ruído e ganharam previsibilidade.',
          items: [
            {
              quote: 'Passámos de apagões semanais para uma operação estável e documentada.',
              name: 'Joana Lopes',
              role: 'COO',
              company: 'HealthOps',
              logo: testimonialLogo,
            },
            {
              quote: 'A equipa passou a confiar na infraestrutura e no suporte.',
              name: 'Rui Martins',
              role: 'Head of IT',
              company: 'FinTech North',
              logo: testimonialLogo,
            },
          ],
        },
        {
          blockType: 'finalCTA',
          sectionId: 'cta',
          title: 'Pronto para estabilidade?',
          content: 'Falamos do teu contexto e desenhamos um plano claro.',
          primaryCTA: { label: 'Marcar chamada', link: '/contact' },
          secondaryCTA: { label: 'Ver serviços', link: '/services' },
        },
      ],
      seo: {
        title: 'Sobre a Loading Happiness',
        description: 'Equipa sénior de IT focada em estabilidade, segurança e clareza operacional.',
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
          heading: 'Technology with a human heart.',
          subheading: 'Senior-led delivery, stability-first, and support that respects real operations.',
          primaryCTA: { label: 'Book a call', link: '/contact' },
          secondaryCTA: { label: 'Explore services', link: '/services' },
          image: heroImage,
          badges: [{ text: 'Senior-led' }, { text: 'Security-first' }, { text: 'Fast onboarding' }],
        },
        {
          blockType: 'splitContent',
          sectionId: 'overview',
          title: 'How we work',
          content: 'Fast diagnosis, clear plan, documented execution.',
          items: [
            { item: 'We map risk and priorities in two weeks.' },
            { item: 'We stabilize operations and reduce incidents.' },
            { item: 'We automate what blocks your team.' },
          ],
          cta: { label: 'Talk to us', link: '/contact' },
          image: heroImage,
          reverse: true,
        },
        {
          blockType: 'pillars',
          sectionId: 'values',
          title: 'Values',
          items: [
            { title: 'Integrity', content: 'Transparent, even when it’s uncomfortable.', icon: '⚖️' },
            { title: 'Empathy', content: 'Less stress for teams, more focus on work.', icon: '🤝' },
            { title: 'Pragmatism', content: 'Stability before fancy.', icon: '🛠️' },
          ],
        },
        {
          blockType: 'featureGrid',
          sectionId: 'not-do',
          title: 'What we don’t do',
          columns: 3,
          items: [
            { title: 'Undocumented projects', content: 'Nothing lives only in people’s heads.', icon: '✍️' },
            { title: 'Vague promises', content: 'Real metrics, clear timelines.', icon: '📐' },
            { title: 'Reactive support', content: 'We prevent issues before they hit.', icon: '🛡️' },
          ],
        },
        {
          blockType: 'testimonials',
          sectionId: 'testimonials',
          title: 'Calmer teams',
          intro: 'Partners who reduced noise and gained predictability.',
          items: [
            {
              quote: 'We moved from weekly fire drills to a stable, documented operation.',
              name: 'Joana Lopes',
              role: 'COO',
              company: 'HealthOps',
              logo: testimonialLogo,
            },
            {
              quote: 'The team trusts the infrastructure and the support now.',
              name: 'Rui Martins',
              role: 'Head of IT',
              company: 'FinTech North',
              logo: testimonialLogo,
            },
          ],
        },
        {
          blockType: 'finalCTA',
          sectionId: 'cta',
          title: 'Ready for stability?',
          content: 'We’ll map your context and propose a clear plan.',
          primaryCTA: { label: 'Book a call', link: '/contact' },
          secondaryCTA: { label: 'View services', link: '/services' },
        },
      ],
      seo: {
        title: 'About Loading Happiness',
        description: 'Senior IT team focused on stability, security, and operational clarity.',
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
          heading: 'Serviços de IT para equipas reais.',
          subheading: 'Da operação diária à segurança, entregamos estabilidade e visibilidade.',
          primaryCTA: { label: 'Marcar chamada', link: '/contact' },
          secondaryCTA: { label: 'Ver impacto', link: '/impact' },
          image: servicesHero,
          badges: [{ text: 'Senior-led' }, { text: 'Security-first' }, { text: 'Fast onboarding' }],
        },
        {
          blockType: 'servicesGrid',
          sectionId: 'services',
          title: 'Fundamentos de estabilidade',
          services: [
            { title: 'Managed IT', description: 'Monitorização, suporte e infraestrutura com menos ruído.', icon: '💻' },
            { title: 'Cybersecurity', description: 'Controlos reais que protegem sem travar a equipa.', icon: '🛡️' },
            { title: 'Cloud Strategy', description: 'Governança e segurança em M365 e Azure.', icon: '☁️' },
            { title: 'IT Projects', description: 'Migrações e modernizações com documentação clara.', icon: '📦' },
            { title: 'Helpdesk', description: 'Suporte calmo, com métricas e transparência.', icon: '🎧' },
            { title: 'Compliance Readiness', description: 'Baselines e documentação para auditorias.', icon: '✅' },
          ],
          cta: { label: 'Falar connosco', link: '/contact' },
        },
        {
          blockType: 'process',
          sectionId: 'process',
          title: 'Como começamos',
          steps: [
            { title: 'Diagnóstico', content: 'Mapeamos riscos, dependências e prioridades.' },
            { title: 'Estabilização', content: 'Reduzimos incidentes e melhoramos o suporte.' },
            { title: 'Evolução', content: 'Automatizamos e criamos governança.' },
          ],
          image: processImage,
        },
        {
          blockType: 'stats',
          sectionId: 'impact',
          title: 'Impacto visível',
          intro: 'Resultados honestos, sem hype.',
          items: [
            { label: 'Uptime', value: '99.99%', note: 'Média em clientes com monitorização ativa.' },
            { label: 'Incidentes', value: '↓ 64%', note: 'Menos tickets críticos em 90 dias.' },
            { label: 'Resposta', value: '< 15 min', note: 'Tempo médio para incidentes urgentes.' },
          ],
        },
        {
          blockType: 'faq',
          sectionId: 'faq',
          title: 'FAQ',
          items: [
            { question: 'Trabalham com equipas pequenas?', answer: 'Sim. Adaptamos o plano à dimensão e maturidade.' },
            { question: 'Quanto tempo para começar?', answer: 'Normalmente 2 semanas até ao arranque.' },
            { question: 'Fazem migrações?', answer: 'Sim, com plano e comunicação detalhada.' },
          ],
        },
        {
          blockType: 'finalCTA',
          sectionId: 'cta',
          title: 'Queres estabilidade real?',
          content: 'Falamos do teu contexto e desenhamos um plano de ação.',
          primaryCTA: { label: 'Marcar chamada', link: '/contact' },
          secondaryCTA: { label: 'Ver sobre', link: '/about' },
        },
      ],
      seo: {
        title: 'Serviços de IT | Loading Happiness',
        description: 'Managed IT, cibersegurança, cloud e suporte com clareza operacional.',
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
          heading: 'IT services for real-world teams.',
          subheading: 'From daily operations to security, we deliver stability and visibility.',
          primaryCTA: { label: 'Book a call', link: '/contact' },
          secondaryCTA: { label: 'See impact', link: '/impact' },
          image: servicesHero,
          badges: [{ text: 'Senior-led' }, { text: 'Security-first' }, { text: 'Fast onboarding' }],
        },
        {
          blockType: 'servicesGrid',
          sectionId: 'services',
          title: 'Foundations for stability',
          services: [
            { title: 'Managed IT', description: 'Monitoring, support, and infrastructure with less noise.', icon: '💻' },
            { title: 'Cybersecurity', description: 'Practical controls that protect without slowdown.', icon: '🛡️' },
            { title: 'Cloud Strategy', description: 'Governed M365 and Azure environments.', icon: '☁️' },
            { title: 'IT Projects', description: 'Migrations and modernization with clear docs.', icon: '📦' },
            { title: 'Helpdesk', description: 'Calm, measurable support.', icon: '🎧' },
            { title: 'Compliance Readiness', description: 'Baselines and documentation for audits.', icon: '✅' },
          ],
          cta: { label: 'Talk to us', link: '/contact' },
        },
        {
          blockType: 'process',
          sectionId: 'process',
          title: 'How we start',
          steps: [
            { title: 'Diagnosis', content: 'We map risks, dependencies, and priorities.' },
            { title: 'Stabilization', content: 'We reduce incidents and improve support.' },
            { title: 'Evolution', content: 'We automate and add governance.' },
          ],
          image: processImage,
        },
        {
          blockType: 'stats',
          sectionId: 'impact',
          title: 'Visible impact',
          intro: 'Honest results, no hype.',
          items: [
            { label: 'Uptime', value: '99.99%', note: 'Average for monitored clients.' },
            { label: 'Incidents', value: '↓ 64%', note: 'Fewer critical tickets in 90 days.' },
            { label: 'Response', value: '< 15 min', note: 'Average urgent response time.' },
          ],
        },
        {
          blockType: 'faq',
          sectionId: 'faq',
          title: 'FAQ',
          items: [
            { question: 'Do you work with small teams?', answer: 'Yes. We adapt the plan to your size.' },
            { question: 'How fast can we start?', answer: 'Typically within two weeks.' },
            { question: 'Do you handle migrations?', answer: 'Yes, with a clear plan and communications.' },
          ],
        },
        {
          blockType: 'finalCTA',
          sectionId: 'cta',
          title: 'Ready for real stability?',
          content: 'We’ll map your context and build a focused action plan.',
          primaryCTA: { label: 'Book a call', link: '/contact' },
          secondaryCTA: { label: 'About us', link: '/about' },
        },
      ],
      seo: {
        title: 'IT Services | Loading Happiness',
        description: 'Managed IT, cybersecurity, cloud, and support with operational clarity.',
      },
    }
  );

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
          badges: [{ text: 'Senior-led' }, { text: 'Security-first' }, { text: 'Fast onboarding' }],
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
          badges: [{ text: 'Senior-led' }, { text: 'Security-first' }, { text: 'Fast onboarding' }],
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

  const contentSeed = [
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
    const baseData = {
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
