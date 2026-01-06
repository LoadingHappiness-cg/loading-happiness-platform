import type { Metadata } from 'next';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { getLocale, getTranslator } from '@/lib/locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslator();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = `${baseUrl}/${locale}/services/managed-it`;
  const alt = {
    en: canonical.replace('/pt/', '/en/'),
    pt: canonical.replace('/en/', '/pt/'),
  };

  return {
    title: t('services.managedIt.metaTitle'),
    description: t('services.managedIt.metaDescription'),
    alternates: { canonical, languages: alt },
    openGraph: {
      title: t('services.managedIt.metaTitle'),
      description: t('services.managedIt.metaDescription'),
      url: canonical,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('services.managedIt.metaTitle'),
      description: t('services.managedIt.metaDescription'),
    },
  };
}

export default async function ManagedItPage() {
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
    t('services.managedIt.problems.one'),
    t('services.managedIt.problems.two'),
    t('services.managedIt.problems.three'),
    t('services.managedIt.problems.four'),
    t('services.managedIt.problems.five'),
  ];

  const what = [
    { title: t('services.managedIt.what.core.title'), description: t('services.managedIt.what.core.desc'), icon: '🛠️' },
    { title: t('services.managedIt.what.security.title'), description: t('services.managedIt.what.security.desc'), icon: '🛡️' },
    { title: t('services.managedIt.what.ops.title'), description: t('services.managedIt.what.ops.desc'), icon: '📚' },
  ];

  const deliverables = [
    t('services.managedIt.deliverables.one'),
    t('services.managedIt.deliverables.two'),
    t('services.managedIt.deliverables.three'),
    t('services.managedIt.deliverables.four'),
  ];

  const steps = [
    { title: t('services.common.steps.assess.title'), description: t('services.common.steps.assess.desc') },
    { title: t('services.common.steps.stabilize.title'), description: t('services.common.steps.stabilize.desc') },
    { title: t('services.common.steps.improve.title'), description: t('services.common.steps.improve.desc') },
    { title: t('services.common.steps.protect.title'), description: t('services.common.steps.protect.desc') },
  ];

  const faq = [
    { q: t('services.managedIt.faq.q1'), a: t('services.managedIt.faq.a1') },
    { q: t('services.managedIt.faq.q2'), a: t('services.managedIt.faq.a2') },
    { q: t('services.managedIt.faq.q3'), a: t('services.managedIt.faq.a3') },
    { q: t('services.managedIt.faq.q4'), a: t('services.managedIt.faq.a4') },
    { q: t('services.managedIt.faq.q5'), a: t('services.managedIt.faq.a5') },
    { q: t('services.managedIt.faq.q6'), a: t('services.managedIt.faq.a6') },
  ];

  const labels =
    locale === 'pt'
      ? {
          problems: 'Problemas que resolvemos',
          what: 'O que fazemos',
          deliverables: 'Entregáveis típicos',
          steps: 'Como trabalhamos',
          faq: 'Perguntas frequentes',
        }
      : {
          problems: 'Problems we solve',
          what: 'What we do',
          deliverables: 'Typical deliverables',
          steps: 'How we work',
          faq: 'FAQ',
        };

  const final = {
    title: t('services.managedIt.final.title'),
    subtitle: t('services.managedIt.final.subtitle'),
    note: t('services.overview.final.note'),
  };

  return (
    <ServicePageTemplate
      locale={locale}
      localePrefix={localePrefix}
      heroTitle={t('services.managedIt.heroTitle')}
      heroSubtitle={t('services.managedIt.heroSubtitle')}
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
      badge={t('nav.services')}
      badgeSecondary={locale === 'pt' ? 'PME' : 'SMEs'}
    />
  );
}
