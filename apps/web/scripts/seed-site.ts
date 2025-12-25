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
          variant: 'A',
          theme: 'brandGradient',
          heading: 'About Loading Happiness',
          subheading: 'We build reliable, secure IT environments — with clarity, accountability, and a human approach.',
          primaryCTA: { label: 'Book a call', link: '/contact' },
          secondaryCTA: { label: 'Explore services', link: '/services' },
          image: heroImage,
          badges: [
            { text: 'Senior-led' },
            { text: 'Security-first' },
            { text: 'Documented decisions' },
            { text: 'Built for SMEs' },
          ],
        },
        {
          blockType: 'splitOverview',
          sectionId: 'company-overview',
          title: 'Company overview',
          content:
            'Loading Happiness is an IT partner focused on stability, security, and long-term clarity. We help organizations reduce operational noise, strengthen their foundations, and modernize systems without disrupting day-to-day work.\n\nWe’re at our best when expectations are clear: what matters, what’s realistic, and what the next steps are.',
          sideTitle: 'Quick facts',
          sideItems: [
            { text: 'Based in Portugal · Working with EU teams' },
            { text: 'Focus: IT operations, cybersecurity, infrastructure, support' },
            { text: 'Method: pragmatic delivery, documented decisions, measurable progress' },
          ],
        },
        {
          blockType: 'valueCards',
          sectionId: 'philosophy-values',
          title: 'Philosophy and Values',
          intro: 'We believe technology should serve people — not the other way around. Strong systems require both technical discipline and human clarity.',
          cards: [
            { title: 'Integrity', text: 'We say what’s true, even when it’s uncomfortable.', icon: '⚖️' },
            { title: 'Empathy', text: 'Support is about people under pressure, not just tickets.', icon: '🤝' },
            { title: 'Pragmatism', text: 'Secure and stable beats fancy and fragile.', icon: '🛠️' },
            { title: 'Responsibility', text: 'Our work should leave a positive footprint.', icon: '🌍' },
          ],
        },
        {
          blockType: 'twoColumnList',
          sectionId: 'partnership',
          title: 'The Right Kind of Partnership',
          intro: 'We’re not a “yes to everything” vendor. We work as a partner: we ask hard questions, document choices, and focus on outcomes. That’s how IT becomes predictable.',
          leftTitle: 'What you get',
          leftItems: [
            { text: 'Clear priorities and scope' },
            { text: 'Ownership and accountability' },
            { text: 'Documentation that survives change' },
            { text: 'Security improvements without drama' },
          ],
          rightTitle: 'What we need',
          rightItems: [
            { text: 'A point of contact and alignment on priorities' },
            { text: 'Realistic timelines' },
            { text: 'Willingness to fix root causes' },
            { text: 'Respect for people and process' },
          ],
        },
        {
          blockType: 'process',
          sectionId: 'our-approach',
          title: 'Our approach',
          steps: [
            { title: 'Assess', content: 'We map risks, pain points, dependencies, and priorities.' },
            { title: 'Stabilize', content: 'We fix what breaks daily flow and reduce incidents.' },
            { title: 'Evolve', content: 'We improve, automate, and secure continuously.' },
          ],
          note: 'No surprises. Decisions are documented. Progress is measurable.',
          image: processImage,
        },
        {
          blockType: 'bulletsWithProof',
          sectionId: 'why-choose-us',
          title: 'Why choose us',
          bullets: [
            { text: 'Senior-level expertise with practical decisions' },
            { text: 'Security as a foundation, not a sales pitch' },
            { text: 'Vendor-neutral recommendations' },
            { text: 'Clear communication and documented choices' },
            { text: 'Systems built for continuity and recovery' },
          ],
          proofTitle: 'Mini-proof',
          proofText:
            'If you want calm operations, you need more than tools — you need discipline, clarity, and follow-through.',
        },
        {
          blockType: 'logoCloud',
          sectionId: 'partners',
          title: 'Partners',
          text:
            'Partnerships are a tool — not a cage. We partner with vendors and specialists when it improves outcomes, support paths, and delivery speed. Our priority is always the right solution for your context.',
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
          title: 'Our team',
          text:
            'Loading Happiness is led by senior IT professionals with decades of experience in operations, infrastructure, and security. For specialized needs, we work with a trusted network — so you get the right expertise without unnecessary overhead.',
          cards: [
            {
              title: 'Leadership & Delivery',
              text: 'Operations, security, infrastructure.',
              tags: [{ text: 'Operations' }, { text: 'Security' }, { text: 'Infrastructure' }],
            },
            {
              title: 'Trusted network',
              text: 'Cloud, development, specialized security, and vendor escalation paths.',
              tags: [{ text: 'Cloud' }, { text: 'Security' }, { text: 'Vendor' }],
            },
          ],
          ctaLabel: 'Book a call',
          ctaLink: '/contact',
        },
      ],
      seo: {
        title: 'About Loading Happiness',
        description: 'Reliable, secure IT environments with clarity and accountability.',
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
          heading: 'About Loading Happiness',
          subheading: 'We build reliable, secure IT environments — with clarity, accountability, and a human approach.',
          primaryCTA: { label: 'Book a call', link: '/contact' },
          secondaryCTA: { label: 'Explore services', link: '/services' },
          image: heroImage,
          badges: [
            { text: 'Senior-led' },
            { text: 'Security-first' },
            { text: 'Documented decisions' },
            { text: 'Built for SMEs' },
          ],
        },
        {
          blockType: 'splitOverview',
          sectionId: 'company-overview',
          title: 'Company overview',
          content:
            'Loading Happiness is an IT partner focused on stability, security, and long-term clarity. We help organizations reduce operational noise, strengthen their foundations, and modernize systems without disrupting day-to-day work.\n\nWe’re at our best when expectations are clear: what matters, what’s realistic, and what the next steps are.',
          sideTitle: 'Quick facts',
          sideItems: [
            { text: 'Based in Portugal · Working with EU teams' },
            { text: 'Focus: IT operations, cybersecurity, infrastructure, support' },
            { text: 'Method: pragmatic delivery, documented decisions, measurable progress' },
          ],
        },
        {
          blockType: 'valueCards',
          sectionId: 'philosophy-values',
          title: 'Philosophy and Values',
          intro: 'We believe technology should serve people — not the other way around. Strong systems require both technical discipline and human clarity.',
          cards: [
            { title: 'Integrity', text: 'We say what’s true, even when it’s uncomfortable.', icon: '⚖️' },
            { title: 'Empathy', text: 'Support is about people under pressure, not just tickets.', icon: '🤝' },
            { title: 'Pragmatism', text: 'Secure and stable beats fancy and fragile.', icon: '🛠️' },
            { title: 'Responsibility', text: 'Our work should leave a positive footprint.', icon: '🌍' },
          ],
        },
        {
          blockType: 'twoColumnList',
          sectionId: 'partnership',
          title: 'The Right Kind of Partnership',
          intro: 'We’re not a “yes to everything” vendor. We work as a partner: we ask hard questions, document choices, and focus on outcomes. That’s how IT becomes predictable.',
          leftTitle: 'What you get',
          leftItems: [
            { text: 'Clear priorities and scope' },
            { text: 'Ownership and accountability' },
            { text: 'Documentation that survives change' },
            { text: 'Security improvements without drama' },
          ],
          rightTitle: 'What we need',
          rightItems: [
            { text: 'A point of contact and alignment on priorities' },
            { text: 'Realistic timelines' },
            { text: 'Willingness to fix root causes' },
            { text: 'Respect for people and process' },
          ],
        },
        {
          blockType: 'process',
          sectionId: 'our-approach',
          title: 'Our approach',
          steps: [
            { title: 'Assess', content: 'We map risks, pain points, dependencies, and priorities.' },
            { title: 'Stabilize', content: 'We fix what breaks daily flow and reduce incidents.' },
            { title: 'Evolve', content: 'We improve, automate, and secure continuously.' },
          ],
          note: 'No surprises. Decisions are documented. Progress is measurable.',
          image: processImage,
        },
        {
          blockType: 'bulletsWithProof',
          sectionId: 'why-choose-us',
          title: 'Why choose us',
          bullets: [
            { text: 'Senior-level expertise with practical decisions' },
            { text: 'Security as a foundation, not a sales pitch' },
            { text: 'Vendor-neutral recommendations' },
            { text: 'Clear communication and documented choices' },
            { text: 'Systems built for continuity and recovery' },
          ],
          proofTitle: 'Mini-proof',
          proofText:
            'If you want calm operations, you need more than tools — you need discipline, clarity, and follow-through.',
        },
        {
          blockType: 'logoCloud',
          sectionId: 'partners',
          title: 'Partners',
          text:
            'Partnerships are a tool — not a cage. We partner with vendors and specialists when it improves outcomes, support paths, and delivery speed. Our priority is always the right solution for your context.',
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
          title: 'Our team',
          text:
            'Loading Happiness is led by senior IT professionals with decades of experience in operations, infrastructure, and security. For specialized needs, we work with a trusted network — so you get the right expertise without unnecessary overhead.',
          cards: [
            {
              title: 'Leadership & Delivery',
              text: 'Operations, security, infrastructure.',
              tags: [{ text: 'Operations' }, { text: 'Security' }, { text: 'Infrastructure' }],
            },
            {
              title: 'Trusted network',
              text: 'Cloud, development, specialized security, and vendor escalation paths.',
              tags: [{ text: 'Cloud' }, { text: 'Security' }, { text: 'Vendor' }],
            },
          ],
          ctaLabel: 'Book a call',
          ctaLink: '/contact',
        },
      ],
      seo: {
        title: 'About Loading Happiness',
        description: 'Reliable, secure IT environments with clarity and accountability.',
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
          title: 'Frequently asked questions',
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
          title: 'Ready for calmer IT operations?',
          content: 'Tell us what’s breaking your flow. We’ll propose a practical plan — no fluff, no drama.',
          primaryCTA: { label: 'Book a call', link: '/contact' },
          secondaryCTA: { label: 'Send a message', link: '/contact' },
        },
      ],
      seo: {
        title: 'IT services | Loading Happiness',
        description: 'Managed IT, security, cloud, and roadmaps with clear execution.',
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
      title: 'Managed IT & Helpdesk',
      hero: 'Reliable support, proactive maintenance, and clear ownership — so small issues don’t become big outages.',
      bullets: [
        'need predictable support and faster resolution',
        'want fewer recurring incidents',
        'need documentation and clear accountability',
        'don’t have time to manage vendors and tools',
      ],
      deliverables: [
        { title: 'Incident response and escalation', text: 'Clear severity paths and accountable ownership.' },
        { title: 'Proactive monitoring and maintenance', text: 'Prevent repeats with early alerts.' },
        { title: 'Patch management approach', text: 'Aligned with business hours and change windows.' },
        { title: 'Asset and access baseline', text: 'Who has access to what, and why.' },
        { title: 'Monthly health notes', text: 'What changed, what improved, what’s next.' },
      ],
      outcomes: [
        { title: 'Fewer repeated issues', text: 'Root causes addressed, not just symptoms.' },
        { title: 'Faster recovery', text: 'Clear roles and documented steps.' },
        { title: 'Better visibility', text: 'You know what’s happening and why.' },
        { title: 'Calmer operations', text: 'Less firefighting, more focus.' },
      ],
      steps: [
        { title: 'Quick discovery call', text: 'Align goals, scope, and urgency.' },
        { title: 'Access + inventory baseline', text: 'Map systems, users, and risks.' },
        { title: 'Quick wins (first 30 days)', text: 'Remove immediate friction.' },
        { title: 'Operational rhythm', text: 'Ticketing, reporting, reviews.' },
      ],
    },
    {
      slug: 'services/cybersecurity',
      template: 'cybersecurity',
      title: 'Cybersecurity Baseline & Hardening',
      hero: 'Controls that reduce risk without slowing people down.',
      bullets: [
        'need clarity on your real risk surface',
        'want practical controls without enterprise overhead',
        'need stronger identity and access discipline',
        'must be audit-ready with minimal disruption',
      ],
      deliverables: [
        { title: 'Security baseline and policy mapping', text: 'What exists vs. what is needed.' },
        { title: 'Identity hardening', text: 'MFA, conditional access, least privilege.' },
        { title: 'Endpoint and email protection', text: 'Sane defaults, measurable coverage.' },
        { title: 'Backups and recovery validation', text: 'Tested restores, not assumptions.' },
        { title: 'Security awareness guidance', text: 'Short, practical enablement for teams.' },
      ],
      outcomes: [
        { title: 'Lower incident exposure', text: 'High-risk gaps closed first.' },
        { title: 'Clearer ownership', text: 'Access and responsibility are explicit.' },
        { title: 'Audit-ready evidence', text: 'Policies and controls you can show.' },
        { title: 'Reduced response stress', text: 'Playbooks and escalation paths.' },
      ],
      steps: [
        { title: 'Risk discovery', text: 'Find high-risk gaps first.' },
        { title: 'Hardening plan', text: 'Prioritize controls by impact.' },
        { title: 'Implementation', text: 'Roll out changes with minimal disruption.' },
        { title: 'Ongoing review', text: 'Measure and improve quarterly.' },
      ],
    },
    {
      slug: 'services/m365-cloud',
      template: 'm365-cloud',
      title: 'Microsoft 365 & Cloud',
      hero: 'Governance, identity, migrations, licensing sanity.',
      bullets: [
        'need clarity around M365 licensing and usage',
        'want governance and security in place',
        'must migrate with low downtime',
        'need fewer support tickets and confusion',
      ],
      deliverables: [
        { title: 'Tenant governance and policies', text: 'Ownership, retention, and safe defaults.' },
        { title: 'Identity and access standardization', text: 'Consistent roles and access models.' },
        { title: 'Migration planning and execution', text: 'Clear timelines, minimal downtime.' },
        { title: 'Licensing and cost hygiene', text: 'Remove waste, align to real use.' },
        { title: 'Documentation and enablement', text: 'Reduce confusion and tickets.' },
      ],
      outcomes: [
        { title: 'Lower licensing waste', text: 'Spend aligns with usage.' },
        { title: 'Fewer access issues', text: 'Predictable permission models.' },
        { title: 'Clear tenant ownership', text: 'Governance survives staff changes.' },
        { title: 'Safer migrations', text: 'No surprises during cutover.' },
      ],
      steps: [
        { title: 'Discovery', text: 'Assess tenant health and gaps.' },
        { title: 'Governance setup', text: 'Define rules and ownership.' },
        { title: 'Migration or cleanup', text: 'Execute with clear milestones.' },
        { title: 'Stabilization', text: 'Reduce ticket load and document.' },
      ],
    },
    {
      slug: 'services/networking',
      template: 'networking',
      title: 'Networking & Connectivity',
      hero: 'Wi-Fi, segmentation, VPN, monitoring, performance.',
      bullets: [
        'need reliable Wi-Fi and secure segmentation',
        'want visibility into network performance',
        'require stable VPN access for remote teams',
        'need to reduce outages across locations',
      ],
      deliverables: [
        { title: 'Network assessment and mapping', text: 'Inventory, risk hotspots, bottlenecks.' },
        { title: 'Segmentation and firewall rules', text: 'Reduce lateral movement and blast radius.' },
        { title: 'Wi-Fi redesign and tuning', text: 'Coverage, density, and performance fixes.' },
        { title: 'VPN and remote access optimization', text: 'Reliable access without slowdown.' },
        { title: 'Monitoring and alerting baselines', text: 'Know before users complain.' },
      ],
      outcomes: [
        { title: 'Fewer outages', text: 'Better segmentation and monitoring.' },
        { title: 'Predictable remote access', text: 'Stable VPN experience for teams.' },
        { title: 'Clearer visibility', text: 'Network health is measurable.' },
        { title: 'Better performance', text: 'Tuned for real usage patterns.' },
      ],
      steps: [
        { title: 'Network audit', text: 'Map devices, risks, and bottlenecks.' },
        { title: 'Design fixes', text: 'Plan segmentation and improvements.' },
        { title: 'Implementation', text: 'Deploy changes with minimal downtime.' },
        { title: 'Monitoring', text: 'Track stability and performance.' },
      ],
    },
    {
      slug: 'services/infrastructure',
      template: 'infrastructure',
      title: 'Infrastructure & Virtualization',
      hero: 'Virtualization, storage, backups, recovery testing.',
      bullets: [
        'run on aging infrastructure or mixed environments',
        'need clear backup and recovery confidence',
        'want more predictable performance',
        'need documentation that survives growth',
      ],
      deliverables: [
        { title: 'Infrastructure assessment and sizing', text: 'Right-sizing and risk mapping.' },
        { title: 'Virtualization and storage tuning', text: 'Performance and resilience improvements.' },
        { title: 'Backup and recovery testing', text: 'Prove recovery before it’s needed.' },
        { title: 'Lifecycle and patch planning', text: 'Plan upgrades, reduce surprise outages.' },
        { title: 'Operational documentation', text: 'Runbooks and system maps.' },
      ],
      outcomes: [
        { title: 'Fewer outages', text: 'Less fragility in core systems.' },
        { title: 'Faster recovery', text: 'Tested restore paths.' },
        { title: 'Capacity clarity', text: 'Know what to scale and when.' },
        { title: 'Documented baseline', text: 'Knowledge is reusable.' },
      ],
      steps: [
        { title: 'Assess environment', text: 'Map hardware, risk, and load.' },
        { title: 'Stabilize', text: 'Address the biggest fragilities.' },
        { title: 'Optimize', text: 'Tune for performance and safety.' },
        { title: 'Document', text: 'Keep knowledge out of people’s heads.' },
      ],
    },
    {
      slug: 'services/strategy-roadmaps',
      template: 'strategy-roadmaps',
      title: 'Strategy & Roadmaps',
      hero: 'A realistic 12–24 month plan: what to fix now, what to invest in next.',
      bullets: [
        'need clarity on what to fix now vs later',
        'want a realistic investment plan',
        'need stakeholder alignment and visibility',
        'want to stop reactive spending',
      ],
      deliverables: [
        { title: 'Operational baseline and risk map', text: 'Where you are and what’s fragile.' },
        { title: 'Priority roadmap (12–24 months)', text: 'Sequence fixes by impact and cost.' },
        { title: 'Budget and investment guidance', text: 'Spend where it changes outcomes.' },
        { title: 'Quick wins with measurable impact', text: 'Stability improvements you can show.' },
        { title: 'Leadership-ready reporting', text: 'Translate ops into decisions.' },
      ],
      outcomes: [
        { title: 'Clear priorities', text: 'Fix the right things first.' },
        { title: 'Predictable investments', text: 'No surprise spending.' },
        { title: 'Less reactive spend', text: 'Reduce firefighting budgets.' },
        { title: 'Aligned stakeholders', text: 'Everyone knows the plan.' },
      ],
      steps: [
        { title: 'Discovery', text: 'Understand context and constraints.' },
        { title: 'Roadmap design', text: 'Sequence fixes and investments.' },
        { title: 'Alignment', text: 'Agree on scope and ownership.' },
        { title: 'Execution support', text: 'Keep momentum with reviews.' },
      ],
    },
  ];

  for (const service of servicePages) {
    const templateData = {
      hero: {
        heading: service.title,
        subheading: service.hero,
        primaryCTA: { label: 'Request an assessment', link: '/contact' },
        secondaryCTA: { label: 'Download scope PDF', link: '/service-scope.pdf' },
        badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
        image: servicesHero,
      },
      whoItsFor: {
        title: 'Best for teams that…',
        items: service.bullets.map((text) => ({ text })),
      },
      deliverables: {
        title: 'What we deliver',
        items: service.deliverables,
      },
      outcomes: {
        title: 'Outcomes you can expect',
        items: service.outcomes,
      },
      steps: {
        title: 'How we onboard',
        items: service.steps,
      },
      cta: {
        title: 'Want support that feels predictable?',
        content: 'We’ll align on your context and propose a practical plan.',
        primaryCTA: { label: 'Book a call', link: '/contact' },
        secondaryCTA: { label: 'Send a message', link: '/contact' },
      },
    };

    if (service.template === 'cybersecurity') {
      templateData.checklist = {
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
      templateData.stats = {
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
        title: service.title,
        slug: service.slug,
        status: 'published',
        serviceTemplate: service.template,
        serviceTemplateData: templateData,
        layout: [
          {
            blockType: 'hero',
            sectionId: 'intro',
            variant: 'C',
            theme: 'brandGradient',
            heading: service.title,
            subheading: service.hero,
            primaryCTA: { label: 'Request an assessment', link: '/contact' },
            secondaryCTA: { label: 'Download scope PDF', link: '/service-scope.pdf' },
            image: servicesHero,
            badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
          },
          {
            blockType: 'bullets',
            sectionId: 'who-its-for',
            title: 'Best for teams that…',
            items: service.bullets.map((text) => ({ text })),
          },
          {
            blockType: 'deliverables',
            sectionId: 'deliverables',
            title: 'What we deliver',
            items: service.deliverables,
          },
          {
            blockType: 'outcomesCards',
            sectionId: 'outcomes',
            title: 'Outcomes you can expect',
            cards: service.outcomes,
          },
          {
            blockType: 'steps',
            sectionId: 'onboarding',
            title: 'How we onboard',
            steps: service.steps,
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
          title: service.title,
          description: service.hero,
        },
      },
      {
        title: service.title,
        slug: service.slug,
        status: 'published',
        serviceTemplate: service.template,
        serviceTemplateData: templateData,
        layout: [
          {
            blockType: 'hero',
            sectionId: 'intro',
            variant: 'C',
            theme: 'brandGradient',
            heading: service.title,
            subheading: service.hero,
            primaryCTA: { label: 'Request an assessment', link: '/contact' },
            secondaryCTA: { label: 'Download scope PDF', link: '/service-scope.pdf' },
            image: servicesHero,
            badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
          },
          {
            blockType: 'bullets',
            sectionId: 'who-its-for',
            title: 'Best for teams that…',
            items: service.bullets.map((text) => ({ text })),
          },
          {
            blockType: 'deliverables',
            sectionId: 'deliverables',
            title: 'What we deliver',
            items: service.deliverables,
          },
          {
            blockType: 'outcomesCards',
            sectionId: 'outcomes',
            title: 'Outcomes you can expect',
            cards: service.outcomes,
          },
          {
            blockType: 'steps',
            sectionId: 'onboarding',
            title: 'How we onboard',
            steps: service.steps,
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
          title: service.title,
          description: service.hero,
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
