import Link from 'next/link';
import { withLocale } from '@/lib/locale';

type WhatCard = {
  title: string;
  description: string;
  icon: string;
};

type Step = {
  title: string;
  description: string;
};

type FAQ = {
  q: string;
  a: string;
};

type FeatureItem = {
  title: string;
  description: string;
  icon?: string;
};

type FeatureSection = {
  title: string;
  subtitle?: string;
  items: FeatureItem[];
};

type ServicePageTemplateProps = {
  locale: string;
  localePrefix: string;
  heroTitle: string;
  heroSubtitle: string;
  trust: string[];
  primaryCta: string;
  secondaryCta: string;
  problems: string[];
  what: WhatCard[];
  deliverables: string[];
  steps: Step[];
  faq: FAQ[];
  final: {
    title: string;
    subtitle: string;
    note?: string;
  };
  featureSections?: FeatureSection[];
  badge?: string;
  badgeSecondary?: string;
  labels?: {
    problems?: string;
    what?: string;
    deliverables?: string;
    steps?: string;
    faq?: string;
  };
};

export default function ServicePageTemplate({
  locale,
  localePrefix,
  heroTitle,
  heroSubtitle,
  trust,
  primaryCta,
  secondaryCta,
  problems,
  what,
  deliverables,
  steps,
  faq,
  final,
  featureSections = [],
  badge = 'Services',
  badgeSecondary = 'SMEs',
  labels = {},
}: ServicePageTemplateProps) {
  const problemsLabel = labels.problems || 'Problems we solve';
  const whatLabel = labels.what || 'What we do';
  const deliverablesLabel = labels.deliverables || 'Deliverables';
  const stepsLabel = labels.steps || 'Steps';
  const faqLabel = labels.faq || 'FAQ';

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-ink via-primaryDark to-black text-white">
        <div className="absolute inset-0 bg-noise opacity-20" aria-hidden="true" />
        <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-60px] bottom-[-40px] h-80 w-80 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[11px] font-extrabold uppercase tracking-[0.3em] animate-fade-in-up animate-delay-1">
                {badge}
                <span className="h-1 w-1 rounded-full bg-highlight" />
                {badgeSecondary}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight animate-fade-in-up animate-delay-2">
                {heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-gray-100/90 max-w-3xl animate-fade-in-up animate-delay-3">
                {heroSubtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 animate-fade-in-up animate-delay-4">
                <Link
                  href={withLocale('/contact', localePrefix)}
                  className="px-6 py-3 rounded-xl bg-white text-ink font-bold shadow-xl shadow-black/20 hover:-translate-y-0.5 transition-transform"
                >
                  {primaryCta}
                </Link>
                <a
                  href="#contact-bottom"
                  className="px-6 py-3 rounded-xl border border-white/25 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  {secondaryCta}
                </a>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-white/80 animate-fade-in-up animate-delay-4">
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
            <div className="lg:col-span-5 animate-fade-in-up animate-delay-3">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8 shadow-xl shadow-black/20 backdrop-blur space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  {primaryCta}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {problems.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 shadow-sm shadow-black/10">
                      {item}
                    </div>
                  ))}
                </div>
                {problems[4] && (
                  <div className="rounded-2xl border border-white/15 bg-black/20 px-4 py-5 text-sm text-white/80">
                    {problems[4]}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white" id="problems">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">{problemsLabel}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {heroTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((item) => (
              <div key={item} className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 shadow-sm text-gray-800 font-semibold leading-relaxed animate-fade-in-up">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50" id="what-we-do">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">{whatLabel}</p>
            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {heroSubtitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {what.map((item) => (
              <div key={item.title} className="group relative overflow-hidden rounded-[18px] border border-gray-100 bg-white shadow-lg shadow-gray-100/70 p-6 animate-fade-in-up">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                <div className="relative z-10 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 text-ink font-extrabold grid place-items-center shadow-sm">
                    <span aria-hidden="true">{item.icon}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white" id="deliverables">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">{deliverablesLabel}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverables.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 shadow-sm animate-fade-in-up">
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
              {stepsLabel}
            </p>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-3 items-start">
                  <div className="h-9 w-9 rounded-full bg-white/10 text-white font-bold grid place-items-center">{index + 1}</div>
                  <div>
                    <p className="text-white font-semibold">{step.title}</p>
                    <p className="text-sm text-gray-200">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featureSections.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50" id="features">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {featureSections.map((section) => (
              <div key={section.title} className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
                    {section.title}
                  </p>
                  {section.subtitle && <p className="text-lg text-gray-700">{section.subtitle}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.items.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm space-y-2 animate-fade-in-up">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        {item.icon && <span aria-hidden="true">{item.icon}</span>}
                        <span className="text-gray-900">{item.title}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="py-16 lg:py-20 bg-white" id="faq">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">{faqLabel}</p>
              <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                {heroTitle}
              </h3>
            </div>
            <Link href={withLocale('/contact', localePrefix)} className="text-sm font-bold text-accent hover:text-primaryDark">
              {primaryCta} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-gray-100 bg-gray-50 shadow-sm p-5 animate-fade-in-up">
                <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-16 lg:pt-20 pb-16 bg-ink text-white relative overflow-hidden" id="contact-bottom">
        <div className="absolute inset-0 bg-noise opacity-10" aria-hidden="true" />
        <div className="absolute left-0 right-0 bottom-0 h-[3px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4081ff]/0 via-[#3ADA9A]/80 to-[#3ADA9A]/0 shadow-[0_0_28px_rgba(58,218,154,0.55)]" />
          <div className="absolute inset-0 border-t border-white/25 opacity-60" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {final.title}
              </h3>
              <p className="text-lg text-gray-200 max-w-2xl">
                {final.subtitle}
              </p>
              {final.note && <p className="text-sm text-gray-400">{final.note}</p>}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={withLocale('/contact', localePrefix)}
                className="px-6 py-3 rounded-xl bg-white text-ink font-bold shadow-xl shadow-black/20 hover:-translate-y-0.5 transition-transform"
              >
                {primaryCta}
              </Link>
              <Link
                href={withLocale('/contact', localePrefix)}
                className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                {secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Link
        href={withLocale('/contact', localePrefix)}
        className="md:hidden fixed bottom-5 right-5 z-40 px-5 py-3 rounded-full bg-primary text-white font-bold shadow-2xl shadow-primary/30"
      >
        {primaryCta}
      </Link>
    </div>
  );
}
