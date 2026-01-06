import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale, getTranslator, withLocale } from '@/lib/locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslator();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = `${baseUrl}/${locale}/services`;
  const alt = {
    en: canonical.replace('/pt/', '/en/'),
    pt: canonical.replace('/en/', '/pt/'),
  };

  return {
    title: t('services.overview.metaTitle'),
    description: t('services.overview.metaDescription'),
    alternates: { canonical, languages: alt },
    openGraph: {
      title: t('services.overview.metaTitle'),
      description: t('services.overview.metaDescription'),
      url: canonical,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('services.overview.metaTitle'),
      description: t('services.overview.metaDescription'),
    },
  };
}

export default async function ServicesOverviewPage() {
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

  const services = [
    {
      slug: '/services/managed-it',
      title: t('services.managedIt.title'),
      description: t('services.managedIt.description'),
      icon: '🛠️',
    },
    {
      slug: '/services/cybersecurity',
      title: t('services.cybersecurity.title'),
      description: t('services.cybersecurity.description'),
      icon: '🛡️',
    },
    {
      slug: '/services/m365-cloud',
      title: t('services.cloud.title'),
      description: t('services.cloud.description'),
      icon: '☁️',
    },
    {
      slug: '/services/networking',
      title: t('services.networking.title'),
      description: t('services.networking.description'),
      icon: '📡',
    },
    {
      slug: '/services/backup-continuity',
      title: t('services.backupContinuity.title'),
      description: t('services.backupContinuity.description'),
      icon: '💾',
    },
    {
      slug: '/services/projects-procurement',
      title: t('services.projectsProcurement.title'),
      description: t('services.projectsProcurement.description'),
      icon: '📑',
    },
    {
      slug: '/services/compliance-gdpr',
      title: t('services.complianceGdpr.title'),
      description: t('services.complianceGdpr.description'),
      icon: '⚖️',
    },
    {
      slug: '/services/custom-software',
      title: t('services.customSoftware.title'),
      description: t('services.customSoftware.description'),
      icon: '🧩',
    },
  ];

  const faq = [
    { q: t('services.overview.faq.q1'), a: t('services.overview.faq.a1') },
    { q: t('services.overview.faq.q2'), a: t('services.overview.faq.a2') },
    { q: t('services.overview.faq.q3'), a: t('services.overview.faq.a3') },
    { q: t('services.overview.faq.q4'), a: t('services.overview.faq.a4') },
    { q: t('services.overview.faq.q5'), a: t('services.overview.faq.a5') },
    { q: t('services.overview.faq.q6'), a: t('services.overview.faq.a6') },
  ];

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const badgeSecondary = locale === 'pt' ? 'PME em Portugal' : 'SMEs in Portugal';

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <section className="relative overflow-hidden bg-gradient-to-br from-ink via-primaryDark to-black text-white">
        <div className="absolute inset-0 bg-noise opacity-20" aria-hidden="true" />
        <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-60px] bottom-[-40px] h-80 w-80 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[11px] font-extrabold uppercase tracking-[0.3em]">
                {t('nav.services')}
                <span className="h-1 w-1 rounded-full bg-highlight" />
                {badgeSecondary}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
                {t('services.overview.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-gray-100/90 max-w-3xl">
                {t('services.overview.hero.subtitle')}
              </p>
              <div className="flex flex-wrap items-center gap-4 animate-fade-in-up animate-delay-2">
                <Link
                  href={withLocale('/contact', localePrefix)}
                  className="px-6 py-3 rounded-xl bg-white text-ink font-bold shadow-xl shadow-black/20 hover:-translate-y-0.5 transition-transform"
                >
                  {t('services.overview.hero.primaryCta')}
                </Link>
                <a
                  href="#services-grid"
                  className="px-6 py-3 rounded-xl border border-white/25 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  {t('services.overview.hero.secondaryCta')}
                </a>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-white/80 animate-fade-in-up animate-delay-3">
                {trust.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 animate-fade-in-up animate-delay-2">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8 shadow-xl shadow-black/20 backdrop-blur space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  Outcomes
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[t('services.overview.outcomes.one'), t('services.overview.outcomes.two'), t('services.overview.outcomes.three'), t('services.overview.outcomes.four')].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 shadow-sm shadow-black/10 animate-fade-in-up">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/15 bg-black/20 px-4 py-5 text-sm text-white/80">
                  {t('services.overview.outcomes.five')}
                  <br />
                  {t('services.overview.outcomes.six')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services-grid" className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">Services</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                {t('home.servicesHeading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                {t('services.overview.hero.subtitle')}
              </p>
            </div>
            <Link href={withLocale('/contact', localePrefix)} className="text-sm font-bold text-accent hover:text-primaryDark">
              {t('services.overview.hero.secondaryCta')} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={withLocale(service.slug, localePrefix)}
                className="group relative overflow-hidden rounded-[18px] border border-gray-100 bg-white shadow-lg shadow-gray-100/70 p-6 hover:-translate-y-1 transition-transform animate-fade-in-up"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 text-ink font-extrabold grid place-items-center shadow-sm">
                    <span aria-hidden="true">{service.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mt-1">{service.description}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <span>{t('services.overview.cards.cta')}</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
              {t('services.overview.who.title')}
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {t('services.overview.who.subtitle')}
            </h3>
            <p className="text-lg text-gray-600">{t('services.overview.who.fit')}</p>
            <div className="space-y-3">
              {[t('services.overview.who.seg1'), t('services.overview.who.seg2'), t('services.overview.who.seg3')].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    ✓
                  </span>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100/70 p-8 space-y-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
              {t('services.overview.approach.title')}
            </p>
            <div className="space-y-4">
              {[
                { title: t('services.overview.approach.step1.title'), desc: t('services.overview.approach.step1.desc') },
                { title: t('services.overview.approach.step2.title'), desc: t('services.overview.approach.step2.desc') },
                { title: t('services.overview.approach.step3.title'), desc: t('services.overview.approach.step3.desc') },
                { title: t('services.overview.approach.step4.title'), desc: t('services.overview.approach.step4.desc') },
              ].map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary font-extrabold grid place-items-center">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{step.title}</p>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
              {t('services.overview.outcomes.title')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[t('services.overview.outcomes.one'), t('services.overview.outcomes.two'), t('services.overview.outcomes.three'), t('services.overview.outcomes.four'), t('services.overview.outcomes.five'), t('services.overview.outcomes.six')].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 shadow-sm">
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    ✓
                  </span>
                  <p className="text-gray-800 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-ink text-white p-8 border border-primary/20 shadow-2xl shadow-primary/30 space-y-4">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-highlight">
              {t('services.overview.social.title')}
            </p>
            <p className="text-lg leading-relaxed text-gray-100">
              {t('services.overview.social.body')}
            </p>
            <Link href={withLocale('/impact', localePrefix)} className="inline-flex items-center gap-2 text-sm font-semibold text-highlight hover:text-white">
              {t('services.overview.social.link')} →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
                {t('services.overview.faq.title')}
              </p>
              <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                {t('services.overview.hero.title')}
              </h3>
            </div>
            <Link href={withLocale('/contact', localePrefix)} className="text-sm font-bold text-accent hover:text-primaryDark">
              {t('services.overview.hero.primaryCta')} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10" aria-hidden="true" />
        <div className="absolute left-0 right-0 bottom-0 h-[3px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4081ff]/0 via-[#3ADA9A]/80 to-[#3ADA9A]/0 shadow-[0_0_28px_rgba(58,218,154,0.55)]" />
          <div className="absolute inset-0 border-t border-white/25 opacity-60" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {t('services.overview.final.title')}
              </h3>
              <p className="text-lg text-gray-200 max-w-2xl">
                {t('services.overview.final.subtitle')}
              </p>
              <p className="text-sm text-gray-400">{t('services.overview.final.note')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={withLocale('/contact', localePrefix)}
                className="px-6 py-3 rounded-xl bg-white text-ink font-bold shadow-xl shadow-black/20 hover:-translate-y-0.5 transition-transform"
              >
                {t('services.overview.final.primaryCta')}
              </Link>
              <Link
                href={withLocale('/contact', localePrefix)}
                className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                {t('services.overview.final.secondaryCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Link
        href={withLocale('/contact', localePrefix)}
        className="md:hidden fixed bottom-5 right-5 z-40 px-5 py-3 rounded-full bg-primary text-white font-bold shadow-2xl shadow-primary/30"
      >
        {t('services.overview.final.primaryCta')}
      </Link>
    </div>
  );
}
