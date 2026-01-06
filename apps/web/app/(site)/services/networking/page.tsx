import type { Metadata } from 'next';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { getLocale, getTranslator } from '@/lib/locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslator();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = `${baseUrl}/${locale}/services/networking`;
  const alt = {
    en: canonical.replace('/pt/', '/en/'),
    pt: canonical.replace('/en/', '/pt/'),
  };

  return {
    title: t('services.networking.metaTitle'),
    description: t('services.networking.metaDescription'),
    alternates: { canonical, languages: alt },
    openGraph: {
      title: t('services.networking.metaTitle'),
      description: t('services.networking.metaDescription'),
      url: canonical,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('services.networking.metaTitle'),
      description: t('services.networking.metaDescription'),
    },
  };
}

export default async function NetworkingPage() {
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
    t('services.networking.problems.one'),
    t('services.networking.problems.two'),
    t('services.networking.problems.three'),
    t('services.networking.problems.four'),
  ];

  const what = [
    { title: t('services.networking.what.core.title'), description: t('services.networking.what.core.desc'), icon: '📡' },
    { title: t('services.networking.what.security.title'), description: t('services.networking.what.security.desc'), icon: '🧩' },
    { title: t('services.networking.what.ops.title'), description: t('services.networking.what.ops.desc'), icon: '📋' },
  ];

  const deliverables = [
    t('services.networking.deliverables.one'),
    t('services.networking.deliverables.two'),
    t('services.networking.deliverables.three'),
    t('services.networking.deliverables.four'),
  ];

  const steps = [
    { title: t('services.common.steps.assess.title'), description: t('services.common.steps.assess.desc') },
    { title: t('services.common.steps.stabilize.title'), description: t('services.common.steps.stabilize.desc') },
    { title: t('services.common.steps.improve.title'), description: t('services.common.steps.improve.desc') },
    { title: t('services.common.steps.protect.title'), description: t('services.common.steps.protect.desc') },
  ];

  const faq = [
    { q: t('services.networking.faq.q1'), a: t('services.networking.faq.a1') },
    { q: t('services.networking.faq.q2'), a: t('services.networking.faq.a2') },
    { q: t('services.networking.faq.q3'), a: t('services.networking.faq.a3') },
    { q: t('services.networking.faq.q4'), a: t('services.networking.faq.a4') },
    { q: t('services.networking.faq.q5'), a: t('services.networking.faq.a5') },
  ];

  const featureSections = [
    {
      title: t('services.networking.feature.title'),
      items: [
        { title: t('services.networking.feature.one'), description: t('services.networking.what.core.desc'), icon: '🏢' },
        { title: t('services.networking.feature.two'), description: t('services.networking.problems.two'), icon: '🏬' },
        { title: t('services.networking.feature.three'), description: t('services.networking.problems.three'), icon: '🏗️' },
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
    title: t('services.networking.final.title'),
    subtitle: t('services.networking.final.subtitle'),
    note: t('services.overview.final.note'),
  };

  return (
    <ServicePageTemplate
      locale={locale}
      localePrefix={localePrefix}
      heroTitle={t('services.networking.heroTitle')}
      heroSubtitle={t('services.networking.heroSubtitle')}
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
      badge={t('services.networking.title')}
      badgeSecondary={locale === 'pt' ? 'Redes & Wi-Fi' : 'Networks & Wi-Fi'}
    />
  );
}
