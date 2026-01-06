import type { Metadata } from 'next';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { getLocale, getTranslator } from '@/lib/locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslator();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = `${baseUrl}/${locale}/services/backup-continuity`;
  const alt = {
    en: canonical.replace('/pt/', '/en/'),
    pt: canonical.replace('/en/', '/pt/'),
  };

  return {
    title: t('services.backup.metaTitle'),
    description: t('services.backup.metaDescription'),
    alternates: { canonical, languages: alt },
    openGraph: {
      title: t('services.backup.metaTitle'),
      description: t('services.backup.metaDescription'),
      url: canonical,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('services.backup.metaTitle'),
      description: t('services.backup.metaDescription'),
    },
  };
}

export default async function BackupContinuityPage() {
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
    t('services.backup.problems.one'),
    t('services.backup.problems.two'),
    t('services.backup.problems.three'),
    t('services.backup.problems.four'),
  ];

  const what = [
    { title: t('services.backup.what.core.title'), description: t('services.backup.what.core.desc'), icon: '💾' },
    { title: t('services.backup.what.security.title'), description: t('services.backup.what.security.desc'), icon: '🧪' },
    { title: t('services.backup.what.ops.title'), description: t('services.backup.what.ops.desc'), icon: '🧭' },
  ];

  const deliverables = [
    t('services.backup.deliverables.one'),
    t('services.backup.deliverables.two'),
    t('services.backup.deliverables.three'),
    t('services.backup.deliverables.four'),
  ];

  const steps = [
    { title: t('services.common.steps.assess.title'), description: t('services.common.steps.assess.desc') },
    { title: t('services.common.steps.stabilize.title'), description: t('services.common.steps.stabilize.desc') },
    { title: t('services.common.steps.improve.title'), description: t('services.common.steps.improve.desc') },
    { title: t('services.common.steps.protect.title'), description: t('services.common.steps.protect.desc') },
  ];

  const faq = [
    { q: t('services.backup.faq.q1'), a: t('services.backup.faq.a1') },
    { q: t('services.backup.faq.q2'), a: t('services.backup.faq.a2') },
    { q: t('services.backup.faq.q3'), a: t('services.backup.faq.a3') },
    { q: t('services.backup.faq.q4'), a: t('services.backup.faq.a4') },
    { q: t('services.backup.faq.q5'), a: t('services.backup.faq.a5') },
  ];

  const featureSections = [
    {
      title: t('services.backup.feature.title'),
      items: [
        { title: t('services.backup.feature.one'), description: t('services.backup.what.core.desc'), icon: '3️⃣' },
        { title: t('services.backup.feature.two'), description: t('services.backup.what.security.desc'), icon: '🧪' },
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
    title: t('services.backup.final.title'),
    subtitle: t('services.backup.final.subtitle'),
    note: t('services.overview.final.note'),
  };

  return (
    <ServicePageTemplate
      locale={locale}
      localePrefix={localePrefix}
      heroTitle={t('services.backup.heroTitle')}
      heroSubtitle={t('services.backup.heroSubtitle')}
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
      badge={t('services.backupContinuity.title')}
      badgeSecondary={locale === 'pt' ? 'Backups & Continuidade' : 'Backup & Continuity'}
    />
  );
}
