import type { Metadata } from 'next';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { getLocale, getTranslator } from '@/lib/locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslator();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = `${baseUrl}/${locale}/services/compliance-gdpr`;
  const alt = {
    en: canonical.replace('/pt/', '/en/'),
    pt: canonical.replace('/en/', '/pt/'),
  };

  return {
    title: t('services.compliance.metaTitle'),
    description: t('services.compliance.metaDescription'),
    alternates: { canonical, languages: alt },
    openGraph: {
      title: t('services.compliance.metaTitle'),
      description: t('services.compliance.metaDescription'),
      url: canonical,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('services.compliance.metaTitle'),
      description: t('services.compliance.metaDescription'),
    },
  };
}

export default async function CompliancePage() {
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
    t('services.compliance.problems.one'),
    t('services.compliance.problems.two'),
    t('services.compliance.problems.three'),
    t('services.compliance.problems.four'),
  ];

  const what = [
    { title: t('services.compliance.what.core.title'), description: t('services.compliance.what.core.desc'), icon: '🔐' },
    { title: t('services.compliance.what.security.title'), description: t('services.compliance.what.security.desc'), icon: '🗂️' },
    { title: t('services.compliance.what.ops.title'), description: t('services.compliance.what.ops.desc'), icon: '📜' },
  ];

  const deliverables = [
    t('services.compliance.deliverables.one'),
    t('services.compliance.deliverables.two'),
    t('services.compliance.deliverables.three'),
    t('services.compliance.deliverables.four'),
  ];

  const steps = [
    { title: t('services.common.steps.assess.title'), description: t('services.common.steps.assess.desc') },
    { title: t('services.common.steps.stabilize.title'), description: t('services.common.steps.stabilize.desc') },
    { title: t('services.common.steps.improve.title'), description: t('services.common.steps.improve.desc') },
    { title: t('services.common.steps.protect.title'), description: t('services.common.steps.protect.desc') },
  ];

  const faq = [
    { q: t('services.compliance.faq.q1'), a: t('services.compliance.faq.a1') },
    { q: t('services.compliance.faq.q2'), a: t('services.compliance.faq.a2') },
    { q: t('services.compliance.faq.q3'), a: t('services.compliance.faq.a3') },
    { q: t('services.compliance.faq.q4'), a: t('services.compliance.faq.a4') },
  ];

  const featureSections = [
    {
      title: t('services.compliance.feature.title'),
      items: [
        { title: t('services.compliance.feature.one'), description: t('services.compliance.heroSubtitle'), icon: '⚖️' },
        { title: t('services.compliance.feature.two'), description: t('services.compliance.deliverables.two'), icon: '📑' },
        { title: t('services.compliance.feature.three'), description: t('services.compliance.deliverables.four'), icon: '🧾' },
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
    title: t('services.compliance.final.title'),
    subtitle: t('services.compliance.final.subtitle'),
    note: t('services.overview.final.note'),
  };

  return (
    <ServicePageTemplate
      locale={locale}
      localePrefix={localePrefix}
      heroTitle={t('services.compliance.heroTitle')}
      heroSubtitle={t('services.compliance.heroSubtitle')}
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
      badge={t('services.complianceGdpr.title')}
      badgeSecondary={locale === 'pt' ? 'Compliance & GDPR' : 'Compliance & GDPR'}
    />
  );
}
