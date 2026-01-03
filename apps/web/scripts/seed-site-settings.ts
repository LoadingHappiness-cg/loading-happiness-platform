import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import type { SiteSetting } from '@/payload-types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type HeaderLinks = NonNullable<NonNullable<SiteSetting['header']>['links']>;
type FooterSocials = NonNullable<NonNullable<SiteSetting['footer']>['socials']>;

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

const ensureMedia = async (payload: any, alt: string, filePath: string) => {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  });
  if (existing.docs?.[0]) {
    return existing.docs[0].id;
  }

  const fileData = await fs.readFile(filePath);
  const fileName = path.basename(filePath);

  const created = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: fileData,
      name: fileName,
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

  const projectRoot = path.resolve(__dirname, '../..', '..');
  const logoColorPath = path.join(projectRoot, 'logo_simples_small.png');
  const logoWhitePath = path.join(projectRoot, 'logo_simples_small_white.png');

  const config = (await import('../payload.config.ts')).default;
  const payload = await getPayload({ config });

  const logoColorId = await ensureMedia(payload, 'Loading Happiness Logo', logoColorPath);
  const logoWhiteId = await ensureMedia(payload, 'Loading Happiness Logo (White)', logoWhitePath);

  const headerLinks: HeaderLinks = [
    {
      label: 'Services',
      href: '/services',
      type: 'dropdown',
      items: [
        {
          label: 'Managed IT & Helpdesk',
          href: '/services/managed-it',
          description: 'Fast response, proactive maintenance.',
        },
        {
          label: 'Cybersecurity Baseline',
          href: '/services/cybersecurity',
          description: 'Controls that reduce real risk.',
        },
        {
          label: 'Microsoft 365 & Cloud',
          href: '/services/m365-cloud',
          description: 'Governance, identity, migrations.',
        },
        {
          label: 'Networking & Connectivity',
          href: '/services/networking',
          description: 'Wi-Fi, segmentation, VPN, monitoring.',
        },
        {
          label: 'Infrastructure & Virtualization',
          href: '/services/infrastructure',
          description: 'Storage, backups, recovery testing.',
        },
        {
          label: 'Strategy & Roadmaps',
          href: '/services/strategy-roadmaps',
          description: '12–24 month practical plan.',
        },
      ],
    },
    {
      label: 'News',
      href: '/news',
      type: 'link',
    },
    {
      label: 'Impact',
      href: '/impact',
      type: 'link',
    },
    {
      label: 'About',
      href: '/about',
      type: 'dropdown',
      items: [
        {
          label: 'Our story',
          href: '/about#our-story',
          description: 'Founded in Sintra, built for real businesses.',
        },
        {
          label: 'Why Loading Happiness',
          href: '/about#why-loading-happiness',
          description: 'A name that became a promise.',
        },
        {
          label: 'Our philosophy',
          href: '/about#philosophy',
          description: 'Human, clear, responsible.',
        },
        {
          label: 'Values',
          href: '/about#values',
          description: 'How we show up in the work.',
        },
        {
          label: 'What to expect',
          href: '/about#what-to-expect',
          description: 'Clarity, pragmatism, security by default.',
        },
        {
          label: 'Our team',
          href: '/about#team',
          description: 'Senior, hands-on, close to the ground.',
        },
      ],
    },
    {
      label: 'Contact',
      href: '/contact',
      type: 'link',
    },
  ];

  const footerColumns = [
    {
      title: 'Explore',
      links: [
        { label: 'Services', href: '/services' },
        { label: 'News', href: '/news' },
        { label: 'Impact', href: '/impact' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];
  const footerSocials: FooterSocials = [
    { platform: 'linkedin', url: 'https://www.linkedin.com/' },
    { platform: 'instagram', url: 'https://www.instagram.com/' },
  ];
  const footerLegalLinks = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
  ];

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      header: {
        logo: logoColorId,
        logoAlt: 'Loading Happiness',
        links: headerLinks,
        cta: { label: 'Book a call', href: '/contact' },
        topBar: {
          enabled: true,
          businessHoursOnly: true,
          text: 'Support hours: Mon–Fri, 9–18',
          linkLabel: 'Emergency support? → Contact',
          linkHref: '/contact',
        },
      },
      footer: {
        logo: logoWhiteId,
        logoAlt: 'Loading Happiness',
        description:
          'Technology with a human heart. Reliable IT, clear security, and calm support for teams that value stability.',
        tagline: 'Technology with a human heart.',
        aboutText:
          'We help teams stabilize IT, strengthen security, and modernize infrastructure with clear communication and predictable execution.',
        socials: footerSocials,
        contact: {
          location: 'Portugal · Serving teams across Europe',
          email: 'hello@loadinghappiness.com',
          phone: '+351 000 000 000',
          hours: 'Mon–Fri, 9–18',
          note: "We're based in Portugal, proudly supporting teams across Europe.",
        },
        email: 'hello@loadinghappiness.com',
        phone: '+351 000 000 000',
        newsletter: {
          title: 'Newsletter',
          text: 'Practical notes on IT stability, security, and calm operations.',
          placeholder: 'Your email address',
          buttonText: 'Sign up',
          formAction: '/api/newsletter',
        },
        awardsTitle: 'Awards',
        awards: [],
        columns: footerColumns,
        legalLinks: footerLegalLinks,
        bottomText: '© ' + new Date().getFullYear() + ' Loading Happiness. Engineered for Stability.',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'pt',
    data: {
      header: {
        logo: logoColorId,
        logoAlt: 'Loading Happiness',
        links: headerLinks,
        cta: { label: 'Marcar chamada', href: '/contact' },
        topBar: {
          enabled: true,
          businessHoursOnly: true,
          text: 'Horário de suporte: Seg–Sex, 9–18',
          linkLabel: 'Suporte urgente? → Contacto',
          linkHref: '/contact',
        },
      },
      footer: {
        logo: logoWhiteId,
        logoAlt: 'Loading Happiness',
        description:
          'Tecnologia com coração humano. IT fiável, segurança clara e suporte calmo para equipas que valorizam estabilidade.',
        tagline: 'Tecnologia com coração humano.',
        aboutText:
          'Ajudamos equipas a estabilizar o IT, reforçar a segurança e modernizar infraestrutura com comunicação clara e execução previsível.',
        socials: footerSocials,
        contact: {
          location: 'Portugal · A apoiar equipas na Europa',
          email: 'hello@loadinghappiness.com',
          phone: '+351 000 000 000',
          hours: 'Seg–Sex, 9–18',
          note: 'Estamos em Portugal e apoiamos equipas em toda a Europa.',
        },
        email: 'hello@loadinghappiness.com',
        phone: '+351 000 000 000',
        newsletter: {
          title: 'Newsletter',
          text: 'Notas práticas sobre estabilidade de IT, segurança e operações calmas.',
          placeholder: 'O teu email',
          buttonText: 'Subscrever',
          formAction: '/api/newsletter',
        },
        awardsTitle: 'Prémios',
        awards: [],
        columns: footerColumns,
        legalLinks: footerLegalLinks,
        bottomText: '© ' + new Date().getFullYear() + ' Loading Happiness. Engineered for Stability.',
      },
    },
  });

  console.log('Site settings seeded.');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
