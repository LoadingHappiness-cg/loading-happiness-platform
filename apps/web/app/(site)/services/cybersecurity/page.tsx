import type { Metadata } from 'next';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { getLocale, getTranslator } from '@/lib/locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslator();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = `${baseUrl}/${locale}/services/cybersecurity`;
  const alt = {
    en: canonical.replace('/pt/', '/en/'),
    pt: canonical.replace('/en/', '/pt/'),
  };

  return {
    title: t('services.cybersecurity.metaTitle'),
    description: t('services.cybersecurity.metaDescription'),
    alternates: { canonical, languages: alt },
    openGraph: {
      title: t('services.cybersecurity.metaTitle'),
      description: t('services.cybersecurity.metaDescription'),
      url: canonical,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('services.cybersecurity.metaTitle'),
      description: t('services.cybersecurity.metaDescription'),
    },
  };
}

export default async function CybersecurityPage() {
  const locale = await getLocale();
  const t = await getTranslator();
  const localePrefix = `/${locale}`;

  const trust = [
    t('services.overview.trust.one'),
    t('services.overview.trust.two'),
    t('services.overview.trust.three'),
    t('services.overview.trust.four'),
    t('services.overview.trust.five'),
  ];

  const problems = [
    t('services.cybersecurity.problems.one'),
    t('services.cybersecurity.problems.two'),
    t('services.cybersecurity.problems.three'),
    t('services.cybersecurity.problems.four'),
    t('services.cybersecurity.problems.five'),
  ];

  const what = [
    { title: t('services.cybersecurity.what.core.title'), description: t('services.cybersecurity.what.core.desc'), icon: '🔐' },
    { title: t('services.cybersecurity.what.security.title'), description: t('services.cybersecurity.what.security.desc'), icon: '🛡️' },
    { title: t('services.cybersecurity.what.ops.title'), description: t('services.cybersecurity.what.ops.desc'), icon: '📈' },
  ];

  const deliverables = [
    t('services.cybersecurity.deliverables.one'),
    t('services.cybersecurity.deliverables.two'),
    t('services.cybersecurity.deliverables.three'),
    t('services.cybersecurity.deliverables.four'),
  ];

  const steps = [
    { title: t('services.common.steps.assess.title'), description: t('services.common.steps.assess.desc') },
    { title: t('services.common.steps.stabilize.title'), description: t('services.common.steps.stabilize.desc') },
    { title: t('services.common.steps.improve.title'), description: t('services.common.steps.improve.desc') },
    { title: t('services.common.steps.protect.title'), description: t('services.common.steps.protect.desc') },
  ];

  const faq = [
    { q: t('services.cybersecurity.faq.q1'), a: t('services.cybersecurity.faq.a1') },
    { q: t('services.cybersecurity.faq.q2'), a: t('services.cybersecurity.faq.a2') },
    { q: t('services.cybersecurity.faq.q3'), a: t('services.cybersecurity.faq.a3') },
    { q: t('services.cybersecurity.faq.q4'), a: t('services.cybersecurity.faq.a4') },
    { q: t('services.cybersecurity.faq.q5'), a: t('services.cybersecurity.faq.a5') },
    { q: t('services.cybersecurity.faq.q6'), a: t('services.cybersecurity.faq.a6') },
  ];

  const featureSections = [
    {
      title: t('services.cybersecurity.layers.title'),
      items: [
        { title: t('services.cybersecurity.layers.one'), description: t('services.cybersecurity.what.core.desc'), icon: '👤' },
        { title: t('services.cybersecurity.layers.two'), description: t('services.cybersecurity.what.security.desc'), icon: '💻' },
        { title: t('services.cybersecurity.layers.three'), description: t('services.cybersecurity.what.ops.desc'), icon: '✉️' },
        { title: t('services.cybersecurity.layers.four'), description: t('services.networking.what.security.desc'), icon: '🌐' },
        { title: t('services.cybersecurity.layers.five'), description: t('services.backup.what.core.desc'), icon: '💾' },
      ],
    },
  ];

  const labels =
    locale === 'pt'
      ? {
          problems: 'Problemas que resolvemos',
          what: 'O que fazemos',
          deliverables: 'Entregáveis',
          steps: 'Como trabalhamos',
          faq: 'Perguntas frequentes',
        }
      : {
          problems: 'Problems we solve',
          what: 'What we do',
          deliverables: 'Deliverables',
          steps: 'How we work',
          faq: 'FAQ',
        };

  const final = {
    title: t('services.cybersecurity.final.title'),
    subtitle: t('services.cybersecurity.final.subtitle'),
    note: t('services.overview.final.note'),
  };

  return (
    <ServicePageTemplate
      locale={locale}
      localePrefix={localePrefix}
      heroTitle={t('services.cybersecurity.heroTitle')}
      heroSubtitle={t('services.cybersecurity.heroSubtitle')}
      trust={trust}
      primaryCta={t('services.overview.hero.primaryCta')}
      secondaryCta={t('services.overview.hero.secondaryCta')}
      problems={problems}
      what={what}
      deliverables={deliverables}
      steps={steps}
      faq={faq}
      final={final}
      labels={labels}
      featureSections={featureSections}
      badge={t('services.cybersecurity.title') || t('nav.services')}
      badgeSecondary={locale === 'pt' ? 'Segurança prática' : 'Practical security'}
    />
  );
}
