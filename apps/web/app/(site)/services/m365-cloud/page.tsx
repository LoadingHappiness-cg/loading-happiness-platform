import type { Metadata } from 'next';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { getLocale, getTranslator } from '@/lib/locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslator();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = `${baseUrl}/${locale}/services/m365-cloud`;
  const alt = {
    en: canonical.replace('/pt/', '/en/'),
    pt: canonical.replace('/en/', '/pt/'),
  };

  return {
    title: t('services.cloud.metaTitle'),
    description: t('services.cloud.metaDescription'),
    alternates: { canonical, languages: alt },
    openGraph: {
      title: t('services.cloud.metaTitle'),
      description: t('services.cloud.metaDescription'),
      url: canonical,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('services.cloud.metaTitle'),
      description: t('services.cloud.metaDescription'),
    },
  };
}

export default async function M365Page() {
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
    t('services.cloud.problems.one'),
    t('services.cloud.problems.two'),
    t('services.cloud.problems.three'),
    t('services.cloud.problems.four'),
  ];

  const what = [
    { title: t('services.cloud.what.core.title'), description: t('services.cloud.what.core.desc'), icon: '🔐' },
    { title: t('services.cloud.what.security.title'), description: t('services.cloud.what.security.desc'), icon: '🚚' },
    { title: t('services.cloud.what.ops.title'), description: t('services.cloud.what.ops.desc'), icon: '📁' },
  ];

  const deliverables = [
    t('services.cloud.deliverables.one'),
    t('services.cloud.deliverables.two'),
    t('services.cloud.deliverables.three'),
    t('services.cloud.deliverables.four'),
  ];

  const steps = [
    { title: t('services.common.steps.assess.title'), description: t('services.common.steps.assess.desc') },
    { title: t('services.common.steps.stabilize.title'), description: t('services.common.steps.stabilize.desc') },
    { title: t('services.common.steps.improve.title'), description: t('services.common.steps.improve.desc') },
    { title: t('services.common.steps.protect.title'), description: t('services.common.steps.protect.desc') },
  ];

  const faq = [
    { q: t('services.cloud.faq.q1'), a: t('services.cloud.faq.a1') },
    { q: t('services.cloud.faq.q2'), a: t('services.cloud.faq.a2') },
    { q: t('services.cloud.faq.q3'), a: t('services.cloud.faq.a3') },
    { q: t('services.cloud.faq.q4'), a: t('services.cloud.faq.a4') },
    { q: t('services.cloud.faq.q5'), a: t('services.cloud.faq.a5') },
  ];

  const featureSections = [
    {
      title: t('services.cloud.feature.title'),
      items: [
        { title: t('services.cloud.feature.one'), description: t('services.cloud.what.core.desc'), icon: '🛡️' },
        { title: t('services.cloud.feature.two'), description: t('services.cloud.deliverables.two'), icon: '🗂️' },
        { title: t('services.cloud.feature.three'), description: t('services.cloud.deliverables.three'), icon: '🔗' },
        { title: t('services.cloud.feature.four'), description: t('services.cloud.what.core.desc'), icon: '✉️' },
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
    title: t('services.cloud.final.title'),
    subtitle: t('services.cloud.final.subtitle'),
    note: t('services.overview.final.note'),
  };

  return (
    <ServicePageTemplate
      locale={locale}
      localePrefix={localePrefix}
      heroTitle={t('services.cloud.heroTitle')}
      heroSubtitle={t('services.cloud.heroSubtitle')}
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
      badge={t('services.cloud.title')}
      badgeSecondary={locale === 'pt' ? 'Governance 365' : '365 governance'}
    />
  );
}
