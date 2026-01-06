import type { Metadata } from 'next';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { getLocale, getTranslator } from '@/lib/locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslator();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = `${baseUrl}/${locale}/services/projects-procurement`;
  const alt = {
    en: canonical.replace('/pt/', '/en/'),
    pt: canonical.replace('/en/', '/pt/'),
  };

  return {
    title: t('services.projects.metaTitle'),
    description: t('services.projects.metaDescription'),
    alternates: { canonical, languages: alt },
    openGraph: {
      title: t('services.projects.metaTitle'),
      description: t('services.projects.metaDescription'),
      url: canonical,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('services.projects.metaTitle'),
      description: t('services.projects.metaDescription'),
    },
  };
}

export default async function ProjectsProcurementPage() {
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
    t('services.projects.problems.one'),
    t('services.projects.problems.two'),
    t('services.projects.problems.three'),
    t('services.projects.problems.four'),
  ];

  const what = [
    { title: t('services.projects.what.core.title'), description: t('services.projects.what.core.desc'), icon: '📝' },
    { title: t('services.projects.what.security.title'), description: t('services.projects.what.security.desc'), icon: '⚖️' },
    { title: t('services.projects.what.ops.title'), description: t('services.projects.what.ops.desc'), icon: '🚚' },
  ];

  const deliverables = [
    t('services.projects.deliverables.one'),
    t('services.projects.deliverables.two'),
    t('services.projects.deliverables.three'),
    t('services.projects.deliverables.four'),
  ];

  const steps = [
    { title: t('services.common.steps.assess.title'), description: t('services.common.steps.assess.desc') },
    { title: t('services.common.steps.stabilize.title'), description: t('services.common.steps.stabilize.desc') },
    { title: t('services.common.steps.improve.title'), description: t('services.common.steps.improve.desc') },
    { title: t('services.common.steps.protect.title'), description: t('services.common.steps.protect.desc') },
  ];

  const faq = [
    { q: t('services.projects.faq.q1'), a: t('services.projects.faq.a1') },
    { q: t('services.projects.faq.q2'), a: t('services.projects.faq.a2') },
    { q: t('services.projects.faq.q3'), a: t('services.projects.faq.a3') },
    { q: t('services.projects.faq.q4'), a: t('services.projects.faq.a4') },
    { q: t('services.projects.faq.q5'), a: t('services.projects.faq.a5') },
  ];

  const featureSections = [
    {
      title: t('services.projects.feature.title'),
      items: [
        { title: t('services.projects.feature.one'), description: t('services.projects.problems.one'), icon: '🤝' },
        { title: t('services.projects.feature.two'), description: t('services.projects.problems.two'), icon: '🕒' },
        { title: t('services.projects.feature.three'), description: t('services.projects.deliverables.four'), icon: '📄' },
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
    title: t('services.projects.final.title'),
    subtitle: t('services.projects.final.subtitle'),
    note: t('services.overview.final.note'),
  };

  return (
    <ServicePageTemplate
      locale={locale}
      localePrefix={localePrefix}
      heroTitle={t('services.projects.heroTitle')}
      heroSubtitle={t('services.projects.heroSubtitle')}
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
      badge={t('services.projectsProcurement.title')}
      badgeSecondary={locale === 'pt' ? 'Projetos & Compras' : 'Projects & Procurement'}
    />
  );
}
