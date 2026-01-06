import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '../../components/ContactForm';
import { getLocale, getTranslator, withLocale } from '@/lib/locale';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const translate = await getTranslator();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = `${baseUrl}/${locale}/contact`;
  const alt = {
    en: canonical.replace('/pt/', '/en/'),
    pt: canonical.replace('/en/', '/pt/'),
  };

  let title = `${translate('contact.hero.title')} | Loading Happiness`;
  let description = translate('contact.hero.subtitle');
  let ogImage: string | undefined;

  try {
    const payload = await getPayloadClient();
    const page = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'contact' } },
      limit: 1,
      locale,
      depth: 2,
    });
    const doc = page.docs?.[0] as any;
    if (doc?.seo?.title) title = doc.seo.title;
    if (doc?.seo?.description) description = doc.seo.description;
    const imageField = doc?.seo?.image;
    ogImage = imageField?.url || imageField?.sizes?.thumbnail?.url;
  } catch {
    // fallback to defaults
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alt,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale,
      type: 'website',
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const localePrefix = `/${locale}`;
  const t = await getTranslator();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@loadinghappiness.com';

  const payload = await getPayloadClient();
  const pageRes = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
    locale,
    depth: 2,
  });
  const page = pageRes.docs?.[0] as any;
  const layout = (page?.layout as any[]) || [];

  const heroBlock = layout.find((b) => b.blockType === 'hero') || {};
  const splitBlock = layout.find((b) => b.blockType === 'splitContent') || {};
  const formBlock = layout.find((b) => b.blockType === 'contactForm') || {};
  const faqBlock = layout.find((b) => b.blockType === 'faq') || {};

  const heroTitle = heroBlock.heading || heroBlock.h1Title || t('contact.hero.title');
  const heroSubtitle = heroBlock.subheading || heroBlock.subheadline || t('contact.hero.subtitle');
  const heroBadges: string[] =
    heroBlock.badges?.map((b: any) => b.label || b.text).filter(Boolean) ||
    [t('contact.hero.point1'), t('contact.hero.point2'), t('contact.hero.point3')];
  const heroPrimary = heroBlock.primaryCTA?.label || t('home.ctaPrimary');
  const heroSecondary = heroBlock.secondaryCTA?.label || t('common.allServices');
  const heroImage =
    heroBlock.image?.url ||
    heroBlock.heroImage?.url ||
    heroBlock.image?.sizes?.hero?.url ||
    heroBlock.image?.sizes?.thumbnail?.url;

  const expectationsTitle = splitBlock.title || splitBlock.sectionTitle || t('contact.expectations.title');
  const expectationsItems: string[] =
    splitBlock.items?.map((i: any) => i.item || i.title || i.text).filter(Boolean) || [
      t('contact.expectations.item1'),
      t('contact.expectations.item2'),
      t('contact.expectations.item3'),
    ];

  const formTitle = formBlock.title || t('contact.form.heading');
  const formIntro = formBlock.intro || t('contact.form.subheading');
  const formSubmit = formBlock.submitLabel || t('contact.form.submit');
  const formTopics: string[] | undefined =
    formBlock.topics?.map((topic: any) => topic.label || topic.text).filter(Boolean) || undefined;

  const faqItems =
    faqBlock.items?.map((item: any) => ({
      q: item.question || '',
      a: item.answer || '',
    })) ||
    [
      { q: t('contact.faq.q1'), a: t('contact.faq.a1') },
      { q: t('contact.faq.q2'), a: t('contact.faq.a2') },
      { q: t('contact.faq.q3'), a: t('contact.faq.a3') },
    ];

  const channels = [
    {
      title: t('contact.channels.message.title'),
      description: t('contact.channels.message.desc'),
      accent: 'from-primary/15 via-white/5 to-accent/10',
    },
    {
      title: t('contact.channels.call.title'),
      description: t('contact.channels.call.desc'),
      accent: 'from-brand-midnight/10 via-primary/10 to-ink/5',
    },
    {
      title: t('contact.channels.projects.title'),
      description: t('contact.channels.projects.desc'),
      accent: 'from-accent/15 via-primary/5 to-highlight/10',
    },
  ];

  const serviceHighlights = [
    t('services.managedIt.title'),
    t('services.cybersecurity.title'),
    t('services.cloud.title'),
    t('services.strategyRoadmaps.title'),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Loading Happiness',
    url: baseUrl,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: contactEmail,
        availableLanguage: ['pt', 'en'],
        areaServed: 'Europe',
      },
    ],
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Render blocks in order with fallbacks for hero/form/faq */}
      {layout.map((block, index) => {
        if (!block) return null;
        switch (block.blockType) {
          case 'hero':
            return (
              <section
                key={`hero-${index}`}
                className="relative overflow-hidden bg-gradient-to-br from-ink via-primaryDark to-black text-white"
              >
                <div className="absolute inset-0 bg-noise opacity-20" aria-hidden="true" />
                <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/40 blur-3xl" aria-hidden="true" />
                <div className="absolute right-[-80px] bottom-[-40px] h-80 w-80 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                  <div className="bg-white/5 border border-white/10 rounded-[32px] shadow-2xl shadow-primary/20 p-8 lg:p-12">
                    <div className="grid lg:grid-cols-12 gap-10 items-start">
                      <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[11px] font-extrabold uppercase tracking-[0.3em]">
                          {block.eyebrow || t('contact.hero.badge')}
                          <span className="h-1 w-1 rounded-full bg-highlight" />
                          <span className="text-white/70">{(block.badges?.[0]?.label) || heroBadges[0]}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
                          {block.heading || block.h1Title || heroTitle}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-100/90 max-w-2xl">
                          {block.subheading || block.subheadline || heroSubtitle}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {(block.badges?.map((b: any) => b.label || b.text) || heroBadges).map((point: string) => (
                            <div
                              key={point}
                              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 shadow-sm shadow-black/10"
                            >
                              {point}
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <a
                            href={block.primaryCTA?.link || '#contact-form'}
                            className="px-6 py-3 rounded-xl bg-white text-ink font-bold shadow-xl shadow-black/20 hover:-translate-y-0.5 transition-transform"
                          >
                            {block.primaryCTA?.label || heroPrimary}
                          </a>
                          <Link
                            href={block.secondaryCTA?.link || withLocale('/services', localePrefix)}
                            className="px-6 py-3 rounded-xl border border-white/25 text-white font-semibold hover:bg-white/10 transition-colors"
                          >
                            {block.secondaryCTA?.label || heroSecondary}
                          </Link>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-white/80">
                          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5">
                            <span aria-hidden="true">📍</span>
                            <span>{t('footer.location')}</span>
                          </div>
                          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5">
                            <span aria-hidden="true">⏰</span>
                            <span>{t('footer.hours')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-5">
                        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8 shadow-xl shadow-black/20 backdrop-blur">
                          <div className="flex items-center justify-between gap-3 mb-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                              {block.trustLine || t('contact.channels.title')}
                            </p>
                            <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/15">
                              {t('nav.bookCall')}
                            </span>
                          </div>
                          <div className="space-y-4">
                            {serviceHighlights.map((title, idx) => (
                              <div
                                key={title}
                                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90"
                              >
                                <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/15 grid place-items-center text-lg font-bold">
                                  {idx + 1}
                                </div>
                                <div>
                                  <p className="font-semibold leading-tight">{title}</p>
                                  <p className="text-sm text-white/70">Loading Happiness</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 rounded-2xl border border-white/15 bg-black/20 px-4 py-5 text-sm text-white/80">
                            {t('footer.note')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'splitContent':
            return (
              <section key={`split-${index}`} className="py-16 lg:py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
                  <div className="space-y-4">
                    <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
                      {block.title || block.sectionTitle || t('contact.channels.title')}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                      {block.heading || block.title || block.sectionTitle}
                    </h2>
                    <p className="text-lg text-gray-600">{block.bodyRichText || block.subheading || ''}</p>
                    <div className="space-y-3">
                      {(block.items || []).map((item: any) => (
                        <div key={item.item || item.title} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                            ✓
                          </span>
                          <p className="text-gray-700 leading-relaxed">{item.item || item.title}</p>
                        </div>
                      ))}
                    </div>
                    {(block.cta?.label || block.secondaryLinkLabel) && (
                      <div className="flex gap-4">
                        {block.cta?.label && (
                          <Link href={block.cta?.link || '#contact-form'} className="text-sm font-bold text-accent hover:text-primaryDark">
                            {block.cta.label} →
                          </Link>
                        )}
                        {block.secondaryLinkLabel && (
                          <Link href={block.secondaryLinkHref || '#'} className="text-sm font-bold text-gray-600 hover:text-primaryDark">
                            {block.secondaryLinkLabel} →
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                  {(block.image?.url || block.media?.url) && (
                    <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-100/70">
                      <img
                        src={block.image?.url || block.media?.url}
                        alt={block.image?.alt || ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </section>
            );
          case 'contactForm':
            return (
              <section key={`form-${index}`} className="relative py-16 lg:py-24 bg-gray-50">
                <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
                <div className="absolute left-5 bottom-10 h-32 w-32 rounded-full bg-highlight/20 blur-3xl" aria-hidden="true" />
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid lg:grid-cols-3 gap-10 items-start">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="space-y-3">
                        <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
                          {t('contact.hero.badge')}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                          {block.title || formTitle}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                          {block.intro || formIntro}
                        </p>
                      </div>
                      <div id="contact-form" className="scroll-mt-24">
                        <ContactForm
                          locale={locale}
                          submitLabel={block.submitLabel || formSubmit}
                          topics={(block.topics || []).map((t: any) => t.label || t.text).filter(Boolean)}
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                      <div className="rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100/70 p-6 sticky top-28">
                        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-primaryDark mb-4">
                          {expectationsTitle}
                        </p>
                        <div className="space-y-4">
                          {expectationsItems.map((item: string) => (
                            <div key={item} className="flex items-start gap-3">
                              <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                                ✓
                              </span>
                              <p className="text-gray-700 leading-relaxed">{item}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-4 space-y-3">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                            <span aria-hidden="true">⏰</span>
                            <span>{t('footer.hours')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                            <span aria-hidden="true">📍</span>
                            <span>{t('footer.location')}</span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{t('footer.note')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'faq':
            return (
              <section key={`faq-${index}`} className="py-16 lg:py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primaryDark">
                        {block.title || t('contact.hero.title')}
                      </p>
                      <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                        {heroTitle}
                      </h3>
                    </div>
                    <Link href={withLocale('/contact', localePrefix)} className="text-sm font-bold text-accent hover:text-primaryDark">
                      {heroPrimary} →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(block.items?.length ? block.items : faqItems).map((item: any) => (
                      <div key={item.question || item.q} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                        <p className="font-semibold text-gray-900 mb-2">{item.question || item.q}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.answer || item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'valueCards':
            return (
              <section key={`value-${index}`} className="py-16 lg:py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  {block.heading && (
                    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{block.heading}</h3>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(block.cards || []).map((card: any) => (
                      <div key={card.title} className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 shadow-sm">
                        <p className="font-semibold text-gray-900">{card.title}</p>
                        <p className="text-sm text-gray-700">{card.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'bullets':
          case 'deliverables':
            return (
              <section key={`bullets-${index}`} className="py-12 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                  {block.heading && (
                    <h4 className="text-2xl font-extrabold text-gray-900 tracking-tight">{block.heading}</h4>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(block.items || []).map((item: any) => (
                      <div key={item.text || item.label} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 shadow-sm">
                        <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                          ✓
                        </span>
                        <p className="text-gray-800 leading-relaxed">{item.text || item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'richText':
            return (
              <section key={`rich-${index}`} className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose">
                  <div dangerouslySetInnerHTML={{ __html: block.content || '' }} />
                </div>
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
