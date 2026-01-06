import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale, getTranslator, withLocale } from '@/lib/locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslator();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = `${baseUrl}/${locale}/services/custom-software`;
  const alt = {
    en: canonical.replace('/pt/', '/en/'),
    pt: canonical.replace('/en/', '/pt/'),
  };

  return {
    title: t('services.customSoftware.metaTitle'),
    description: t('services.customSoftware.metaDescription'),
    alternates: { canonical, languages: alt },
    openGraph: {
      title: t('services.customSoftware.metaTitle'),
      description: t('services.customSoftware.metaDescription'),
      url: canonical,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('services.customSoftware.metaTitle'),
      description: t('services.customSoftware.metaDescription'),
    },
  };
}

export default async function CustomSoftwarePage() {
  const locale = await getLocale();
  const t = await getTranslator();
  const localePrefix = `/${locale}`;
  const badgeSecondary = locale === 'pt' ? 'Open-source quando faz sentido' : 'Open-source friendly';

  const faq = [
    { q: t('services.customSoftware.faq.q1'), a: t('services.customSoftware.faq.a1') },
    { q: t('services.customSoftware.faq.q2'), a: t('services.customSoftware.faq.a2') },
    { q: t('services.customSoftware.faq.q3'), a: t('services.customSoftware.faq.a3') },
    { q: t('services.customSoftware.faq.q4'), a: t('services.customSoftware.faq.a4') },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('services.customSoftware.title'),
    description: t('services.customSoftware.metaDescription'),
    areaServed: 'Portugal',
    provider: {
      '@type': 'Organization',
      name: 'Loading Happiness',
    },
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema]) }} />
      <section className="relative overflow-hidden bg-gradient-to-br from-ink via-primaryDark to-black text-white">
        <div className="absolute inset-0 bg-noise opacity-20" aria-hidden="true" />
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-60px] bottom-[-40px] h-80 w-80 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[11px] font-extrabold uppercase tracking-[0.3em]">
                Software
                <span className="h-1 w-1 rounded-full bg-highlight" />
                {badgeSecondary}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
                {t('services.customSoftware.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-gray-100/90 max-w-3xl">
                {t('services.customSoftware.hero.subtitle')}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={withLocale('/contact', localePrefix)}
                  className="px-6 py-3 rounded-xl bg-white text-ink font-bold shadow-xl shadow-black/20 hover:-translate-y-0.5 transition-transform"
                >
                  {t('services.customSoftware.hero.primaryCta')}
                </Link>
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-xl border border-white/25 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  {t('services.customSoftware.hero.secondaryCta')}
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8 shadow-xl shadow-black/20 backdrop-blur space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  {t('services.customSoftware.pillars.title')}
                </p>
                <div className="space-y-3">
                  {[t('services.customSoftware.pillars.one'), t('services.customSoftware.pillars.two'), t('services.customSoftware.pillars.three')].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 shadow-sm shadow-black/10">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
              {t('services.customSoftware.projects.title')}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {t('services.customSoftware.hero.subtitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-[20px] border border-gray-100 bg-gradient-to-br from-gray-50 to-white shadow-lg shadow-gray-100/70 p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary font-extrabold grid place-items-center shadow-sm">OSS</div>
              <h3 className="text-xl font-bold text-gray-900">{t('services.customSoftware.projects.envia.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('services.customSoftware.projects.envia.desc')}</p>
              <ul className="space-y-2 text-sm text-gray-700">
                {[t('services.customSoftware.projects.envia.b1'), t('services.customSoftware.projects.envia.b2'), t('services.customSoftware.projects.envia.b3')].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <span>{t('services.overview.cards.cta')}</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[20px] border border-gray-100 bg-gradient-to-br from-gray-50 to-white shadow-lg shadow-gray-100/70 p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-ink text-white font-extrabold grid place-items-center shadow-sm">GS1</div>
              <h3 className="text-xl font-bold text-gray-900">{t('services.customSoftware.projects.gs1.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('services.customSoftware.projects.gs1.desc')}</p>
              <ul className="space-y-2 text-sm text-gray-700">
                {[t('services.customSoftware.projects.gs1.b1'), t('services.customSoftware.projects.gs1.b2'), t('services.customSoftware.projects.gs1.b3')].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <span>{t('services.overview.cards.cta')}</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
              {t('services.customSoftware.integrations.title')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">{t('services.customSoftware.integrations.desc')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[t('services.customSoftware.integrations.b1'), t('services.customSoftware.integrations.b2'), t('services.customSoftware.integrations.b3')].map((item) => (
                <div key={item} className="rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100/70 p-8 space-y-4">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
              {t('services.customSoftware.process.title')}
            </p>
            <div className="space-y-3">
              {[t('services.customSoftware.process.s1'), t('services.customSoftware.process.s2'), t('services.customSoftware.process.s3'), t('services.customSoftware.process.s4')].map((step, index) => (
                <div key={step} className="flex gap-3 items-start">
                  <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold grid place-items-center">{index + 1}</div>
                  <p className="text-gray-800 font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
                {t('services.customSoftware.faq.title')}
              </p>
              <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                {t('services.customSoftware.hero.title')}
              </h3>
            </div>
            <Link href={withLocale('/contact', localePrefix)} className="text-sm font-bold text-accent hover:text-primaryDark">
              {t('services.customSoftware.hero.primaryCta')} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-gray-100 bg-gray-50 shadow-sm p-5">
                <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {t('services.customSoftware.final.title')}
              </h3>
              <p className="text-lg text-gray-200 max-w-2xl">
                {t('services.customSoftware.final.subtitle')}
              </p>
              <p className="text-sm text-gray-400">{t('services.customSoftware.final.note')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={withLocale('/contact', localePrefix)}
                className="px-6 py-3 rounded-xl bg-white text-ink font-bold shadow-xl shadow-black/20 hover:-translate-y-0.5 transition-transform"
              >
                {t('services.customSoftware.final.primaryCta')}
              </Link>
              <Link
                href={withLocale('/contact', localePrefix)}
                className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                {t('services.customSoftware.final.secondaryCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Link
        href={withLocale('/contact', localePrefix)}
        className="md:hidden fixed bottom-5 right-5 z-40 px-5 py-3 rounded-full bg-primary text-white font-bold shadow-2xl shadow-primary/30"
      >
        {t('services.customSoftware.final.primaryCta')}
      </Link>
    </div>
  );
}
