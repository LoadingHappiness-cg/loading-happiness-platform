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

const upsertPage = async (
  payload: any,
  slug: string,
  dataEn: any,
  dataPt: any = undefined
) => {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    locale: 'pt',
  });

  let pageId = existing.docs?.[0]?.id;
  if (pageId) {
    await payload.update({
      collection: 'pages',
      id: pageId,
      locale: 'pt',
      data: dataPt || dataEn,
    });
  } else {
    const created = await payload.create({
      collection: 'pages',
      locale: 'pt',
      data: dataPt || dataEn,
    });
    pageId = created.id;
  }

  await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'en',
    data: dataEn,
  });
};

const main = async () => {
  await loadEnvFile();
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    throw new Error('DATABASE_URI and PAYLOAD_SECRET must be set before seeding.');
  }

  const config = (await import('../payload.config.ts')).default;
  const payload = await getPayload({ config });

  const aboutHero = await ensureMedia(payload, 'About Hero');
  const aboutStory = await ensureMedia(payload, 'About Story');
  const serviceHero = await ensureMedia(payload, 'IT Support Hero');
  const serviceProactive = await ensureMedia(payload, 'IT Support Proactive');
  const serviceHuman = await ensureMedia(payload, 'IT Support Human');
  const serviceSecurity = await ensureMedia(payload, 'IT Support Security');

  const aboutLayout = [
    {
      blockType: 'hero',
      enabled: true,
      anchorId: 'top',
      variant: 'A',
      theme: 'brandGradient',
      eyebrow: 'About',
      h1Title: 'Calm, reliable IT for SMEs in Portugal',
      heading: 'Calm, reliable IT for SMEs in Portugal',
      subheadline:
        'Loading Happiness is a senior-led IT services company with 25+ years of experience. We keep businesses stable, secure, and productive with clear communication and proactive care.',
      subheading:
        'Loading Happiness is a senior-led IT services company with 25+ years of experience. We keep businesses stable, secure, and productive with clear communication and proactive care.',
      trustLine: 'Sintra / Lisbon | Portugal + remote EU',
      primaryCTA: { label: 'Book a Call', link: '/contact', trackingId: 'about-hero-primary' },
      secondaryCTA: { label: 'Download Company Presentation', link: '/contact' },
      heroImage: aboutHero,
      image: aboutHero,
      mediaType: 'illustration',
      badges: [
        { label: 'Senior-led delivery' },
        { label: 'Security-first mindset' },
        { label: 'Long-term partner' },
      ],
    },
    {
      blockType: 'richText',
      sectionId: 'intro',
      content:
        'We exist to remove noise from operations: fewer incidents, clearer decisions, and support that respects your time.\n\nOur focus is simple. We listen first, stabilize fast, and then improve with measurable steps. No jargon, no surprises, and no hype.',
    },
    {
      blockType: 'valueCards',
      sectionId: 'values',
      title: 'The principles that guide us',
      intro: 'Human communication and disciplined delivery, every time.',
      cards: [
        { title: 'Reliability', text: 'Proactive maintenance and fast response when it matters.' },
        { title: 'Security-first', text: 'Practical controls that reduce real risk without slowing teams down.' },
        { title: 'Clarity', text: 'Plain-language updates and clear expectations from day one.' },
        { title: 'Partnership', text: 'Long-term stability over quick fixes.' },
      ],
    },
    {
      blockType: 'splitContent',
      anchorId: 'story',
      title: '25+ years of calm operations',
      sectionTitle: '25+ years of calm operations',
      bodyRichText:
        'Our team has been supporting Portuguese businesses for over two decades. We have seen the cost of quick fixes and the value of disciplined maintenance. Today, we bring that experience to SMEs that need stability without enterprise complexity.',
      items: [
        { item: 'Senior-led service delivery' },
        { item: 'Proactive maintenance and monitoring' },
        { item: 'Aligned to business goals and budgets' },
      ],
      ctaLabel: 'Talk to us',
      ctaHref: '/contact',
      image: aboutStory,
      layout: 'imageRight',
    },
    {
      blockType: 'steps',
      sectionId: 'journey',
      title: 'Our journey',
      intro: 'A steady focus on stability and trust.',
      steps: [
        { title: '1999 - Founded', text: 'Started as a local IT partner for growing SMEs.' },
        { title: '2010s - Security focus', text: 'Expanded services into practical cybersecurity.' },
        { title: '2021-2023 - Top 5% Best SME', text: 'Recognized for consistent service delivery.' },
        { title: '2024 - CEO of the Year Awards', text: 'Awarded for leadership and business impact.' },
      ],
    },
    {
      blockType: 'valueCards',
      sectionId: 'recognition',
      title: 'Recognition and commitments',
      cards: [
        { title: 'Top 5% Best SME', text: '2021, 2022, 2023 - Consistent service excellence.' },
        { title: 'European CEO of the Year Awards', text: '2024 - Leadership and impact.' },
        { title: 'Compromisso Pagamento Pontual', text: 'Ongoing commitment to fair payments.' },
      ],
    },
    {
      blockType: 'twoColumnList',
      sectionId: 'boundaries',
      title: 'What we do and what we do not do',
      intro: 'A clear boundary keeps outcomes stable.',
      leftTitle: 'We do',
      leftItems: [
        { text: 'Prevent issues through proactive maintenance' },
        { text: 'Communicate clearly and document decisions' },
        { text: 'Build long-term stability' },
      ],
      rightTitle: 'We do not do',
      rightItems: [
        { text: 'Reckless shortcuts that create hidden risk' },
        { text: 'Opaque pricing or surprise costs' },
        { text: 'Over-engineering that adds complexity' },
      ],
    },
    {
      blockType: 'testimonials',
      sectionId: 'testimonials',
      title: 'What clients say',
      intro: 'Real outcomes without the hype.',
      items: [
        {
          quote: 'They reduced recurring issues quickly and kept us informed at every step.',
          name: 'Ana Moreira',
          role: 'Operations Manager',
          company: 'RetailNova',
        },
        {
          quote: 'Clear communication and steady improvements. We finally feel in control of IT.',
          name: 'Miguel Santos',
          role: 'Managing Director',
          company: 'LusoHealth',
        },
        {
          quote: 'Support is fast and human. We know exactly who to call and what to expect.',
          name: 'Rita Marques',
          role: 'Office Manager',
          company: 'UrbanFlow',
        },
      ],
    },
    {
      blockType: 'faq',
      sectionId: 'faq',
      title: 'About Loading Happiness',
      items: [
        {
          question: 'Where are you based?',
          answer: 'We are based in the Sintra/Lisbon area and support teams across Portugal and the EU.',
        },
        {
          question: 'Do you replace existing IT teams?',
          answer: 'Not necessarily. We can complement internal teams or take full ownership as needed.',
        },
        {
          question: 'How do you keep security practical?',
          answer: 'We prioritize high-impact controls like MFA, backups, and endpoint protection.',
        },
      ],
    },
    {
      blockType: 'finalCTA',
      sectionId: 'cta',
      title: 'Ready for calmer IT operations?',
      content: 'Tell us your context. We will outline next steps with clarity and realism.',
      primaryCTA: { label: 'Book a Call', link: '/contact' },
      secondaryCTA: { label: 'Contact Us', link: '/contact' },
    },
  ];

  const aboutSeo = {
    title: 'About Loading Happiness | Human-Centered IT',
    description:
      'Meet Loading Happiness. 25+ years of reliable IT support, cybersecurity, and managed services for SMEs in Portugal and the EU.',
    image: aboutHero,
  };

  const serviceLayout = [
    {
      blockType: 'hero',
      enabled: true,
      anchorId: 'top',
      variant: 'A',
      theme: 'brandGradient',
      eyebrow: 'IT Support & Maintenance',
      h1Title: 'Stable IT operations with fast, human support',
      heading: 'Stable IT operations with fast, human support',
      subheadline:
        'We keep systems healthy, users supported, and work moving. Proactive maintenance and clear communication, without the noise.',
      subheading:
        'We keep systems healthy, users supported, and work moving. Proactive maintenance and clear communication, without the noise.',
      trustLine: 'Same-day response when possible',
      primaryCTA: { label: 'Request an Assessment', link: '/contact', trackingId: 'service-hero-primary' },
      secondaryCTA: { label: 'Book a Call', link: '/contact' },
      heroImage: serviceHero,
      image: serviceHero,
      mediaType: 'illustration',
      badges: [
        { label: 'Proactive maintenance' },
        { label: 'Security-minded support' },
        { label: 'Clear reporting' },
      ],
    },
    {
      blockType: 'richText',
      sectionId: 'overview',
      content:
        'Our IT Support & Maintenance service is built for SMEs that need stability without complexity. We prevent issues before they grow, respond quickly when they do, and keep everything documented so you are never in the dark.',
    },
    {
      blockType: 'featureGrid',
      sectionId: 'included',
      title: 'What is included',
      sectionTitle: 'What is included',
      columns: 3,
      items: [
        { title: 'Monitoring and alerts', content: 'Early detection before issues impact users.', icon: 'MON' },
        { title: 'Preventive maintenance', content: 'Regular checks and updates to keep systems healthy.', icon: 'MAINT' },
        { title: 'User support', content: 'Fast, human helpdesk for your team.', icon: 'HELP' },
        { title: 'Endpoint management', content: 'Consistent configuration, updates, and visibility.', icon: 'ENDP' },
        { title: 'Security hygiene', content: 'MFA, patching, and access reviews as a baseline.', icon: 'SEC' },
        { title: 'Clear reporting', content: 'Simple reporting focused on decisions.', icon: 'REPORT' },
      ],
    },
    {
      blockType: 'splitContent',
      anchorId: 'proactive',
      title: 'Proactive by default',
      sectionTitle: 'Proactive by default',
      bodyRichText:
        'Reactive IT is expensive. We monitor, patch, and maintain systems continuously to prevent downtime and reduce firefighting.',
      items: [
        { item: 'Early detection and resolution' },
        { item: 'Less disruption for your team' },
        { item: 'Predictable IT operations' },
      ],
      image: serviceProactive,
      layout: 'imageLeft',
    },
    {
      blockType: 'splitContent',
      anchorId: 'communication',
      title: 'Human, direct communication',
      sectionTitle: 'Human, direct communication',
      bodyRichText:
        'We explain what is happening in plain language, set expectations clearly, and keep you updated throughout every intervention.',
      items: [
        { item: 'No jargon, no confusion' },
        { item: 'Clear timelines and ownership' },
        { item: 'Single point of contact' },
      ],
      image: serviceHuman,
      layout: 'imageRight',
    },
    {
      blockType: 'splitContent',
      anchorId: 'security',
      title: 'Security mindset built-in',
      sectionTitle: 'Security mindset built-in',
      bodyRichText:
        'Support without security is incomplete. We apply practical controls to reduce risk without slowing your business.',
      items: [
        { item: 'MFA and access reviews' },
        { item: 'Patch management discipline' },
        { item: 'Backups tested and verified' },
      ],
      image: serviceSecurity,
      layout: 'imageLeft',
    },
    {
      blockType: 'steps',
      sectionId: 'process',
      title: 'How we start',
      intro: 'Simple, fast onboarding with clear expectations.',
      steps: [
        { title: 'Quick assessment', text: 'We review your setup, pain points, and priorities.' },
        { title: 'Stabilization plan', text: 'We define first actions and expected impact.' },
        { title: 'Ongoing support', text: 'We maintain, monitor, and improve with reporting.' },
      ],
    },
    {
      blockType: 'twoColumnList',
      sectionId: 'boundaries',
      title: 'What we do and what we do not do',
      intro: 'We keep support disciplined and sustainable.',
      leftTitle: 'We do',
      leftItems: [
        { text: 'Resolve incidents quickly and calmly' },
        { text: 'Document decisions and configurations' },
        { text: 'Prioritize stability over shortcuts' },
      ],
      rightTitle: 'We do not do',
      rightItems: [
        { text: 'Reckless fixes that add future risk' },
        { text: 'Hidden changes without approval' },
        { text: 'Unnecessary complexity' },
      ],
    },
    {
      blockType: 'testimonials',
      sectionId: 'testimonials',
      title: 'Client feedback',
      items: [
        {
          quote: 'Support is fast and clear. We always know what is happening.',
          name: 'Joana Pereira',
          role: 'Office Manager',
          company: 'GreenPulse',
        },
        {
          quote: 'They stabilized our operations and reduced incidents within weeks.',
          name: 'Pedro Leite',
          role: 'COO',
          company: 'Mercado Azul',
        },
      ],
    },
    {
      blockType: 'faq',
      sectionId: 'faq',
      title: 'IT Support & Maintenance FAQ',
      items: [
        {
          question: 'What is included in IT support and maintenance?',
          answer:
            'Monitoring, preventive maintenance, endpoint management, user support, and incident response with clear reporting.',
        },
        {
          question: 'How fast do you respond?',
          answer: 'We respond the same business day when possible and prioritize urgent requests.',
        },
        {
          question: 'Do you support Microsoft 365?',
          answer: 'Yes. We manage M365 environments and common SaaS tools as part of support.',
        },
        {
          question: 'What do you not do?',
          answer: 'We avoid reckless shortcuts and changes that create hidden risk.',
        },
      ],
    },
    {
      blockType: 'finalCTA',
      sectionId: 'cta',
      title: 'Want stable IT support that feels human?',
      content: 'Tell us where you are today. We will propose a clear, realistic plan.',
      primaryCTA: { label: 'Request an Assessment', link: '/contact' },
      secondaryCTA: { label: 'Contact Us', link: '/contact' },
    },
  ];

  const serviceSeo = {
    title: 'IT Support & Maintenance | Loading Happiness',
    description:
      'Proactive IT support and maintenance for SMEs in Portugal. Fast response, clear processes, and stability-first service.',
    image: serviceHero,
  };

  await upsertPage(
    payload,
    'about',
    {
      title: 'About',
      slug: 'about',
      status: 'published',
      layout: aboutLayout,
      seo: aboutSeo,
    }
  );

  await upsertPage(
    payload,
    'services/it-support-maintenance',
    {
      title: 'IT Support & Maintenance',
      slug: 'services/it-support-maintenance',
      status: 'published',
      layout: serviceLayout,
      seo: serviceSeo,
    }
  );

  // eslint-disable-next-line no-console
  console.log('About and IT Support pages seeded (EN + PT fallback).');
  process.exit(0);
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
