"use client";

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { withLocale } from '@/lib/locale-utils';
import { SectionWrapper } from './SectionWrapper';
import ContactForm from './ContactForm';

const gridCols: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

const getMediaMeta = (media: any) => {
  if (!media) return { url: undefined, alt: undefined };
  if (typeof media === 'string') return { url: media, alt: undefined };
  return {
    url: media.url || media?.sizes?.thumbnail?.url,
    alt: media.alt,
  };
};

const templateStyles: Record<string, { label: string; accentText: string; accentBg: string }> = {
  'managed-it': {
    label: 'Managed IT',
    accentText: 'text-brand-ocean',
    accentBg: 'bg-brand-ocean/15',
  },
  cybersecurity: {
    label: 'Cybersecurity',
    accentText: 'text-brand-midnight',
    accentBg: 'bg-brand-midnight/15',
  },
  'm365-cloud': {
    label: 'M365 & Cloud',
    accentText: 'text-brand-sky',
    accentBg: 'bg-brand-sky/15',
  },
  networking: {
    label: 'Networking',
    accentText: 'text-brand-teal',
    accentBg: 'bg-brand-teal/15',
  },
  infrastructure: {
    label: 'Infrastructure',
    accentText: 'text-brand-indigo',
    accentBg: 'bg-brand-indigo/15',
  },
  'strategy-roadmaps': {
    label: 'Strategy',
    accentText: 'text-brand-mint',
    accentBg: 'bg-brand-mint/15',
  },
};

const templateFromLink = (link?: string) => {
  if (!link) return undefined;
  if (link.includes('managed-it')) return 'managed-it';
  if (link.includes('cybersecurity')) return 'cybersecurity';
  if (link.includes('m365-cloud')) return 'm365-cloud';
  if (link.includes('networking')) return 'networking';
  if (link.includes('infrastructure')) return 'infrastructure';
  if (link.includes('strategy-roadmaps')) return 'strategy-roadmaps';
  return undefined;
};

const isPlaceholderMedia = (alt?: string) => {
  if (!alt) return false;
  const value = alt.toLowerCase();
  return [
    'hero',
    'process',
    'impact',
    'split',
    'gallery',
    'logo',
    'news feature',
    'client logo',
  ].some((token) => value.includes(token));
};

// Animation mapping
const animationClasses: Record<string, string> = {
  fadeRise: 'lh-fade-rise',
  slide: 'lh-slide-in',
  reveal: 'lh-reveal',
  scale: 'lh-scale-up',
  stagger: 'animate-stagger', // We can handle this specially
};

export default function PageBlocks({ blocks, localePrefix }: { blocks: any[]; localePrefix?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 },
    );

    const sections = containerRef.current?.querySelectorAll('section');
    sections?.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [blocks]);

  if (!blocks?.length) return null;

  const localizeHref = (href: string) => withLocale(href, localePrefix);
  const sectionProps = (block: any) => {
    const props: any = {};
    if (block?.anchorId) props.id = block.anchorId;
    if (block?.sectionId) props.id = block.sectionId;
    return props;
  };

  return (
    <div ref={containerRef}>
      {blocks.map((block, index) => {
        if (block?.enabled === false) return null;

        const animationPreset = block.animationPreset || 'fadeRise';
        const animationClass = animationClasses[animationPreset] || '';

        switch (block.blockType) {
          case 'hero': {
            const variant = block.variant || 'A';
            const heroTheme = block.theme || 'light';
            const isCentered = block.alignment === 'center' || variant === 'B';
            const themeClass =
              heroTheme === 'brandGradient'
                ? 'bg-gradient-to-br from-brand-midnight/10 via-white to-brand-sky/15'
                : heroTheme === 'dark'
                  ? 'bg-ink text-white'
                  : heroTheme === 'impact'
                    ? 'bg-impact-gradient bg-noise'
                    : 'bg-white';
            const media = getMediaMeta(block.heroImage || block.image);
            const hideMedia = block.mediaType === 'none';
            const prefersMedia = block.mediaType === 'videoThumbnail';
            const heroVariantClass =
              variant === 'B'
                ? 'py-24 lg:py-32'
                : heroTheme === 'impact'
                  ? 'min-h-[70vh] flex items-center py-20 lg:py-32'
                  : variant === 'D'
                    ? 'py-16 lg:py-24'
                    : variant === 'E'
                      ? 'py-20 lg:py-28'
                      : 'py-20 lg:py-28';

            return (
              <section
                key={index}
                {...sectionProps(block)}
                className={`hero-${variant} relative overflow-hidden border-b border-gray-50 ${heroVariantClass} ${themeClass} ${animationClass}`}
              >

                {heroTheme === 'brandGradient' && (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,179,202,0.18),transparent_55%),radial-gradient(circle_at_top_right,rgba(105,143,254,0.2),transparent_45%),linear-gradient(120deg,rgba(51,37,112,0.1),rgba(35,109,156,0.16))]" />
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-teal/20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-sky/20 blur-[120px]" />
                  </>
                )}
                <div
                  className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${variant === 'B'
                    ? 'text-center'
                    : variant === 'D'
                      ? 'grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'
                      : 'grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'
                    }`}
                >
                  <div className={variant === 'B' ? 'max-w-3xl mx-auto' : variant === 'D' ? 'lg:col-span-6' : 'lg:col-span-7'}>
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-ocean font-bold mb-4">
                      {block.eyebrow || 'Loading Happiness'}
                    </p>
                    {block.template && templateStyles[block.template] && (
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${templateStyles[block.template].accentText} ${templateStyles[block.template].accentBg}`}
                      >
                        {templateStyles[block.template].label}
                      </span>
                    )}
                    <h1
                      className={`${variant === 'D' ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-4xl md:text-5xl lg:text-6xl'
                        } font-extrabold tracking-tighter mb-6 ${heroTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                      {block.h1Title || block.heading}
                    </h1>
                    <p
                      className={`text-xl leading-relaxed mb-8 ${heroTheme === 'dark' ? 'text-white/80' : 'text-gray-700'
                        } ${variant === 'B' ? '' : 'max-w-2xl'}`}
                    >
                      {block.subheadline || block.subheading}
                    </p>
                    {block.trustLine && (
                      <p className={`text-sm font-semibold mb-6 ${heroTheme === 'dark' ? 'text-white/70' : 'text-gray-500'}`}>
                        {block.trustLine}
                      </p>
                    )}
                    <div className={`flex flex-col sm:flex-row gap-4 ${isCentered ? 'justify-center' : ''}`}>
                      {block.primaryCTA && (
                        <Link
                          href={localizeHref(block.primaryCTA.link)}
                          className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark transition-all shadow-xl shadow-primary/30"
                          data-umami-event={block.primaryCTA.trackingId || undefined}
                        >
                          {block.primaryCTA.label}
                        </Link>
                      )}
                      {block.secondaryCTA && (
                        <Link
                          href={localizeHref(block.secondaryCTA.link)}
                          className={`px-8 py-3 rounded-xl font-bold transition-all ${heroTheme === 'dark'
                            ? 'border border-white/60 text-white hover:bg-white/10'
                            : 'border border-ink text-ink hover:bg-white/60'
                            }`}
                        >
                          {block.secondaryCTA.label}
                        </Link>
                      )}
                    </div>
                    {block.badges?.length > 0 && (
                      <div className={`flex flex-wrap gap-3 mt-8 ${isCentered ? 'justify-center' : ''}`}>
                        {block.badges.map((badge: any, badgeIndex: number) => (
                          <span
                            key={badgeIndex}
                            className={`px-3 py-1 rounded-full text-xs font-bold ${block.template && templateStyles[block.template]
                              ? `${templateStyles[block.template].accentBg} ${templateStyles[block.template].accentText}`
                              : 'bg-brand-mint/20 text-brand-ocean'
                              }`}
                          >
                            <span className="inline-flex items-center gap-2">
                              {badge.icon && <span className="text-xs">{badge.icon}</span>}
                              {badge.label || badge.text}
                            </span>
                          </span>
                        ))}
                      </div>
                    )}
                    {block.keywordsInline && (
                      <p className={`mt-6 text-xs uppercase tracking-[0.25em] ${heroTheme === 'dark' ? 'text-white/60' : 'text-gray-400'}`}>
                        {block.keywordsInline}
                      </p>
                    )}
                    {variant === 'C' && block.featureList?.length > 0 && (
                      <div className="mt-8 grid gap-3">
                        {block.featureList.map((item: any, itemIndex: number) => (
                          <div key={itemIndex} className="flex gap-3 text-sm text-gray-700">
                            <span className="text-highlight font-bold">✓</span>
                            {item.text}
                          </div>
                        ))}
                      </div>
                    )}
                    {variant === 'D' && block.quote && (
                      <div className="mt-8 rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                        <p className="text-lg text-gray-700">“{block.quote}”</p>
                      </div>
                    )}
                  </div>
                  {variant !== 'B' && (
                    <div className={variant === 'D' ? 'lg:col-span-6' : 'lg:col-span-5'}>
                      <div
                        className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white/70 bg-white/70 backdrop-blur lh-scale-up lh-delay-120 ${variant === 'D' ? 'aspect-[4/5]' : 'aspect-[4/5]'}`}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(105,143,254,0.22),transparent_55%),radial-gradient(circle_at_bottom,rgba(26,179,202,0.18),transparent_55%)]" />
                        {(() => {
                          if (!hideMedia && media.url && !isPlaceholderMedia(media.alt)) {
                            return (
                              <div className="relative w-full h-full">
                                <img
                                  src={media.url}
                                  alt={media.alt || ''}
                                  className="relative w-full h-full object-cover"
                                />
                                {variant === 'E' && prefersMedia && (
                                  <button
                                    type="button"
                                    data-video={block.videoUrl || ''}
                                    className="absolute inset-0 grid place-items-center bg-black/30 text-white font-bold"
                                  >
                                    <span className="w-16 h-16 rounded-full bg-white/90 text-ink grid place-items-center text-xl shadow-lg">
                                      ▶
                                    </span>
                                  </button>
                                )}
                              </div>
                            );
                          }
                          const displayFacts = block.quickFacts?.length > 0
                            ? block.quickFacts
                            : [
                              { label: 'Response time', value: '< 15 min' },
                              { label: 'Security baseline', value: '90 days' },
                              { label: 'Ops roadmap', value: '12 months' },
                            ];

                          return (
                            <div className="relative w-full h-full p-8 flex flex-col justify-end gap-5">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(105,143,254,0.22),transparent_55%),radial-gradient(circle_at_bottom,rgba(26,179,202,0.18),transparent_55%)]" />
                              {block.factsTitle && (
                                <p className="relative z-10 text-sm font-bold text-brand-ocean tracking-wider uppercase mb-1">
                                  {block.factsTitle}
                                </p>
                              )}
                              <div className="relative z-10 space-y-4">
                                {displayFacts.map((card: any, cardIndex: number) => (
                                  <div
                                    key={cardIndex}
                                    className={`hero-card hero-card-${cardIndex + 1} rounded-3xl border border-white/80 bg-white/95 shadow-xl p-5 ${cardIndex === 0 ? 'ml-12' : cardIndex === 1 ? 'ml-6' : ''
                                      } transition-transform hover:scale-[1.02]`}
                                  >
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-brand-ocean font-bold mb-1">
                                      {card.label || card.title}
                                    </p>
                                    <p className="text-2xl font-black text-ink tracking-tight">{card.value}</p>
                                  </div>
                                ))}
                              </div>
                              {block.factDisclaimer && (
                                <p className="relative z-10 text-[11px] text-gray-400 mt-2 font-medium leading-tight">
                                  {block.factDisclaimer}
                                </p>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'trustPartners':
            return (
              <section key={index} {...sectionProps(block)} className={`relative overflow-hidden py-16 bg-gray-50 ${animationClass}`}>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent z-0" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-400/80 to-transparent z-0" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-slate-100 to-slate-50 z-0" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {(block.sectionTitle || block.text) && (
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2 tracking-tighter">
                      {block.sectionTitle || block.text}
                    </h2>
                  )}
                  {block.trustCopy && <p className="text-sm text-gray-500 mb-6">{block.trustCopy}</p>}
                  {block.complianceNotes && <p className="text-xs text-gray-400 mb-6">{block.complianceNotes}</p>}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                    {block.logos?.map((logo: any, logoIndex: number) => (
                      <div key={logoIndex} className="flex justify-center">
                        {getMediaMeta(logo.logo).url && (logo.url ? (
                          <a href={logo.url} className="inline-flex">
                            <img
                              src={getMediaMeta(logo.logo).url}
                              alt={logo.alt || logo.name || ''}
                              className="h-8 object-contain"
                            />
                          </a>
                        ) : (
                          <img
                            src={getMediaMeta(logo.logo).url}
                            alt={logo.alt || logo.name || ''}
                            className="h-8 object-contain"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'pillars':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-10 tracking-tighter">
                    {block.sectionTitle || block.title}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/40">
                        {item.icon && <div className="text-2xl mb-4">{item.icon}</div>}
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.description || item.content}</p>
                        {item.proofPoint && <p className="text-sm text-gray-500 mt-4">{item.proofPoint}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'servicesGrid':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tighter">
                      {block.sectionTitle || block.title}
                    </h2>
                    {(block.ctaHref || block.cta?.link) && (
                      <Link
                        href={localizeHref(block.ctaHref || block.cta.link)}
                        className="text-sm font-bold text-accent hover:text-primaryDark"
                      >
                        {block.ctaLabel || block.cta?.label || 'Explore'} →
                      </Link>
                    )}
                  </div>
                  {(block.sectionIntro || block.intro) && (
                    <p className="text-lg text-gray-600 mb-8 max-w-3xl">{block.sectionIntro || block.intro}</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {block.services?.map((service: any, serviceIndex: number) => {
                      const serviceTemplate = templateFromLink(service.link);
                      const serviceStyle = serviceTemplate ? templateStyles[serviceTemplate] : undefined;
                      return (
                        <div
                          key={serviceIndex}
                          className="p-8 rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                          <div
                            className={`w-12 h-12 rounded-2xl grid place-items-center text-2xl mb-6 ${serviceStyle ? `${serviceStyle.accentBg} ${serviceStyle.accentText}` : 'bg-brand-sky/15 text-brand-ocean'
                              }`}
                          >
                            {service.icon}
                          </div>
                          {(service.tag || serviceStyle) && (
                            <p
                              className={`text-[10px] font-extrabold uppercase tracking-[0.2em] mb-3 ${serviceStyle ? serviceStyle.accentText : 'text-brand-sky'
                                }`}
                            >
                              {service.tag || serviceStyle?.label}
                            </p>
                          )}
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                          <p className="text-gray-600">{service.description}</p>
                          {service.bulletPoints?.length > 0 && (
                            <ul className="mt-4 space-y-2 text-sm text-gray-600">
                              {service.bulletPoints.map((point: any, pointIndex: number) => (
                                <li key={pointIndex} className="flex gap-2">
                                  <span className="text-brand-ocean">•</span>
                                  {typeof point?.text === 'string' ? point.text : typeof point === 'string' ? point : null}
                                </li>
                              ))}
                            </ul>
                          )}
                          {(service.ctaHref || service.link) && (
                            <Link
                              href={localizeHref(service.ctaHref || service.link)}
                              className="mt-6 inline-flex text-sm font-bold text-accent hover:text-primaryDark"
                            >
                              {service.ctaLabel || 'Learn more'} →
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          case 'process':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-gray-50 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.sectionTitle || block.title}
                    </h2>
                    <div className="space-y-6 relative">
                      <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-brand-ocean/40 via-brand-sky/30 to-brand-teal/30" />
                      {block.steps?.map((step: any, stepIndex: number) => (
                        <div key={stepIndex} className="relative pl-12">
                          <span className="absolute left-0 top-3 h-8 w-8 rounded-full bg-white border border-brand-ocean text-brand-ocean font-bold grid place-items-center text-xs">
                            {step.stepNumber || stepIndex + 1}
                          </span>
                          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description || step.content}</p>
                            {step.deliverables?.length > 0 && (
                              <>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ocean mt-4">
                                  Deliverables
                                </p>
                                <ul className="text-sm text-gray-500 mt-2 space-y-1">
                                  {step.deliverables.map((deliverable: any, deliverableIndex: number) => (
                                    <li key={deliverableIndex}>
                                      {typeof deliverable?.text === 'string'
                                        ? deliverable.text
                                        : typeof deliverable === 'string'
                                          ? deliverable
                                          : null}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {block.note && <p className="mt-8 text-sm text-gray-500">{block.note}</p>}
                    {block.ctaLabel && block.ctaHref && (
                      <Link
                        href={localizeHref(block.ctaHref)}
                        className="mt-8 inline-flex px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primaryDark transition-colors"
                      >
                        {block.ctaLabel}
                      </Link>
                    )}
                  </div>
                  <div className="lg:col-span-5">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-gray-50/50 bg-gray-100 aspect-[4/5]">
                      {(() => {
                        const media = getMediaMeta(block.image);
                        if (media.url && !isPlaceholderMedia(media.alt)) {
                          return <img src={media.url} alt={media.alt || ''} className="w-full h-full object-cover" />;
                        }
                        return (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-ocean/20 via-white to-brand-teal/10">
                            <div className="text-center">
                              <p className="text-xs uppercase tracking-[0.3em] text-brand-ocean font-bold mb-2">Process</p>
                              <p className="text-2xl font-extrabold text-ink">Assess → Stabilize → Evolve</p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'impactTeaser':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.sectionTitle || block.title}
                    </h2>
                    {block.content && <p className="text-xl text-gray-600 leading-relaxed mb-8">{block.content}</p>}
                    {block.metrics?.length > 0 && (
                      <div className="grid gap-4 mb-8 sm:grid-cols-2">
                        {block.metrics.map((metric: any, metricIndex: number) => (
                          <div key={metricIndex} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/60">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
                              {metric.label}
                            </p>
                            <p className="text-lg font-extrabold text-gray-900">{metric.value}</p>
                            {metric.note && <p className="text-xs text-gray-500 mt-2">{metric.note}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                    {block.miniCase && (
                      <p className="text-sm text-gray-500 mb-8">{block.miniCase}</p>
                    )}
                    {(block.ctaHref || block.cta?.link) && (
                      <Link
                        href={localizeHref(block.ctaHref || block.cta.link)}
                        className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark transition-all"
                      >
                        {block.ctaLabel || block.cta?.label}
                      </Link>
                    )}
                  </div>
                  <div className="lg:col-span-6">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-gray-50/50 bg-gray-100 aspect-[4/5]">
                      {(() => {
                        const media = getMediaMeta(block.image);
                        if (media.url && !isPlaceholderMedia(media.alt)) {
                          return <img src={media.url} alt={media.alt || ''} className="w-full h-full object-cover" />;
                        }
                        return (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-mint/20 via-white to-brand-sky/15">
                            <div className="text-center">
                              <p className="text-xs uppercase tracking-[0.3em] text-brand-ocean font-bold mb-2">Impact</p>
                              <p className="text-2xl font-extrabold text-ink">Measured monthly</p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'finalCTA':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-ink text-white ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                  <div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 tracking-tighter">{block.title}</h2>
                    <p className="text-gray-300 text-lg max-w-2xl">{block.subtitle || block.content}</p>
                    {block.microcopy && <p className="text-xs text-gray-400 mt-3">{block.microcopy}</p>}
                    {block.contactOptions?.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
                        {block.contactOptions.map((option: any, optionIndex: number) => (
                          <span key={optionIndex}>
                            {option.label}: {option.value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {block.primaryCTA?.link && (
                      <Link href={localizeHref(block.primaryCTA.link)} className="px-8 py-3 bg-highlight text-ink rounded-xl font-bold hover:bg-brand-mint transition-all shadow-xl shadow-brand-mint/30">
                        {block.primaryCTA.label}
                      </Link>
                    )}
                    {block.secondaryCTA?.link && (
                      <Link href={localizeHref(block.secondaryCTA.link)} className="px-8 py-3 border border-white/60 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                        {block.secondaryCTA.label}
                      </Link>
                    )}
                  </div>
                </div>
              </section>
            );
          case 'videoEmbed':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5">
                    {(block.sectionTitle || block.title) && (
                      <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                        {block.sectionTitle || block.title}
                      </h2>
                    )}
                    {(block.intro || block.caption) && (
                      <p className="text-xl text-gray-600 leading-relaxed">{block.intro || block.caption}</p>
                    )}
                    {block.ctaLabel && block.ctaHref && (
                      <Link
                        href={localizeHref(block.ctaHref)}
                        className="mt-6 inline-flex text-sm font-bold text-accent hover:text-primaryDark"
                      >
                        {block.ctaLabel} →
                      </Link>
                    )}
                  </div>
                  <div className="lg:col-span-7">
                    <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10">
                      <iframe
                        src={block.videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={block.videoTitle || block.sectionTitle || block.title || 'Video'}
                      ></iframe>
                    </div>
                    {block.transcript && (
                      <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-sm text-gray-600 whitespace-pre-line">
                        {block.transcript}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          case 'imageGallery':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {(block.sectionTitle || block.title) && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-10 tracking-tighter">
                      {block.sectionTitle || block.title}
                    </h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {block.images?.map((image: any, imageIndex: number) => (
                      <div key={imageIndex} className="rounded-2xl overflow-hidden bg-gray-100">
                        {(() => {
                          const media = getMediaMeta(image.image);
                          if (media.url && !isPlaceholderMedia(media.alt)) {
                            return <img src={media.url} alt={image.alt || ''} className="w-full h-full object-cover" />;
                          }
                          return (
                            <div className="w-full h-full min-h-[180px] flex items-center justify-center bg-gradient-to-br from-brand-sky/15 via-white to-brand-teal/10">
                              <span className="text-xs uppercase tracking-[0.3em] text-brand-ocean font-bold">Gallery</span>
                            </div>
                          );
                        })()}
                        {(image.caption || image.alt) && (
                          <div className="p-4 bg-white">
                            {image.caption && <p className="text-sm text-gray-600">{image.caption}</p>}
                            {!image.caption && image.alt && <p className="text-xs text-gray-400">{image.alt}</p>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {block.galleryNote && <p className="mt-6 text-sm text-gray-500">{block.galleryNote}</p>}
                </div>
              </section>
            );
          case 'splitContent':
            const isSplitReversed = block.layout === 'imageLeft' || block.reverse;
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 border-b border-gray-50 ${animationClass}`}>
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-center ${isSplitReversed ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-1/2">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.sectionTitle || block.title}
                    </h2>
                    {(block.bodyRichText || block.content) && (
                      <div className="text-xl text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
                        {block.bodyRichText || block.content}
                      </div>
                    )}
                    {block.items?.length > 0 && (
                      <ul className="space-y-4">
                        {block.items.map((item: any, itemIndex: number) => (
                          <li key={itemIndex} className="flex items-center gap-3 text-gray-700 font-medium">
                            <span className="text-highlight">✓</span>
                            {typeof item?.item === 'string' ? item.item : typeof item === 'string' ? item : null}
                          </li>
                        ))}
                      </ul>
                    )}
                    {(block.ctaHref || block.cta?.link || (block.secondaryLinkHref && block.secondaryLinkLabel)) && (
                      <div className="mt-10 flex flex-wrap items-center gap-4">
                        {(block.ctaHref || block.cta?.link) && (
                          <Link
                            href={localizeHref(block.ctaHref || block.cta.link)}
                            className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-[0_14px_32px_rgba(35,109,156,0.28)] hover:bg-primaryDark hover:shadow-[0_18px_40px_rgba(35,109,156,0.32)] transition-all"
                          >
                            {block.ctaLabel || block.cta?.label}
                          </Link>
                        )}
                        {block.secondaryLinkHref && block.secondaryLinkLabel && (
                          <Link
                            href={localizeHref(block.secondaryLinkHref)}
                            className="inline-flex items-center text-sm font-bold text-accent hover:text-primaryDark"
                          >
                            {block.secondaryLinkLabel} →
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="lg:w-1/2">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-gray-50/50 bg-gray-100 aspect-[4/5]">
                      {(() => {
                        const media = getMediaMeta(block.image);
                        if (media.url && !isPlaceholderMedia(media.alt)) {
                          return <img src={media.url} alt={media.alt || ''} className="w-full h-full object-cover" />;
                        }
                        return (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-ocean/15 via-white to-brand-indigo/15">
                            <span className="text-xs uppercase tracking-[0.3em] text-brand-ocean font-bold">Loading Happiness</span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'keyFacts':
            return (
              <section key={index} {...sectionProps(block)} className={`py-12 border-b border-gray-100 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-ink rounded-[2.5rem] p-8 lg:p-12 shadow-2xl overflow-hidden relative">
                    {/* Decorative background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(105,143,254,0.15),transparent_50%)]" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                      <div className="lg:w-1/3">
                        <h2 className="text-3xl font-extrabold text-white tracking-tighter leading-tight">
                          {block.title || 'Key facts'}
                        </h2>
                      </div>
                      <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {block.facts?.map((fact: any, factIndex: number) => (
                          <div key={factIndex} className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-sky/80">
                              {fact.label}
                            </span>
                            <span className="text-lg font-bold text-white tracking-tight">
                              {fact.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'featureGrid':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-gray-50 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {(block.sectionTitle || block.title) && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-10 tracking-tighter">
                      {block.sectionTitle || block.title}
                    </h2>
                  )}
                  <div className={`grid gap-8 ${gridCols[block.columns || 3]}`}>
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
                        <div className="text-2xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.content}</p>
                        {(item.linkHref || item.link) && (
                          <Link
                            href={localizeHref(item.linkHref || item.link)}
                            className="mt-4 inline-flex text-sm font-bold text-accent hover:text-primaryDark"
                          >
                            {item.linkLabel || 'Learn more'} →
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'valueCards':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                  )}
                  {block.intro && <p className="text-lg text-gray-600 mb-10 max-w-3xl">{block.intro}</p>}
                  <div className="grid gap-8 md:grid-cols-3">
                    {block.cards?.map((card: any, cardIndex: number) => (
                      <div key={cardIndex} className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
                        {card.icon && <div className="text-2xl text-brand-teal mb-4">{card.icon}</div>}
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                        <p className="text-gray-600">{card.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'splitOverview':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-8">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{block.content}</p>
                  </div>
                  <div className="lg:col-span-4">
                    <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
                      {block.sideTitle && (
                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-sky mb-6">
                          {block.sideTitle}
                        </p>
                      )}
                      <div className="space-y-4">
                        {block.sideItems?.map((item: any, itemIndex: number) => (
                          <div key={itemIndex} className="text-sm font-semibold text-gray-700">
                            {item.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'twoColumnList':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-gray-50 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                    {block.title}
                  </h2>
                  {block.intro && <p className="text-lg text-gray-600 mb-10 max-w-3xl">{block.intro}</p>}
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="rounded-[2rem] bg-white p-8 border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">{block.leftTitle}</h3>
                      <ul className="space-y-3 text-gray-600">
                        {block.leftItems?.map((item: any, itemIndex: number) => (
                          <li key={itemIndex} className="flex gap-3">
                            <span className="text-highlight">✓</span>
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-[2rem] bg-white p-8 border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">{block.rightTitle}</h3>
                      <ul className="space-y-3 text-gray-600">
                        {block.rightItems?.map((item: any, itemIndex: number) => (
                          <li key={itemIndex} className="flex gap-3">
                            <span className="text-highlight">✓</span>
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'bulletsWithProof':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-7">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                    {block.intro && <p className="text-lg text-gray-600 mb-8">{block.intro}</p>}
                    <ul className="space-y-4 text-gray-700">
                      {block.bullets?.map((item: any, itemIndex: number) => (
                        <li key={itemIndex} className="flex gap-3">
                          <span className="text-highlight">✓</span>
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="rounded-[2rem] border border-gray-100 bg-ink text-white p-8 shadow-xl">
                      {block.proofTitle && (
                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-mint mb-4">
                          {block.proofTitle}
                        </p>
                      )}
                      <p className="text-lg text-white/90 leading-relaxed">{block.proofText}</p>
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'logoCloud':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-gray-50 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid gap-10 lg:grid-cols-12 items-start">
                    <div className="lg:col-span-8">
                      <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                        {block.title}
                      </h2>
                      {block.text && <p className="text-lg text-gray-600">{block.text}</p>}
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                    {block.logos?.map((logo: any, logoIndex: number) => (
                      <div key={logoIndex} className="flex justify-center">
                        {getMediaMeta(logo.logo).url && (
                          <img src={getMediaMeta(logo.logo).url} alt={logo.alt || ''} className="h-10 object-contain" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'teamIntro':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-12">
                  <div className="lg:col-span-6">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                    <p className="text-lg text-gray-600">{block.text}</p>
                  </div>
                  <div className="lg:col-span-6 grid gap-6">
                    {block.cards?.map((card: any, cardIndex: number) => (
                      <div key={cardIndex} className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8 items-start">
                        {getMediaMeta(card.image).url && (
                          <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border-4 border-gray-50">
                            <img src={getMediaMeta(card.image).url} alt={card.title || ''} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{card.title}</h3>
                          {card.role && <p className="text-sm font-bold text-brand-ocean uppercase tracking-wider mb-4">{card.role}</p>}
                          <p className="text-gray-600 leading-relaxed mb-6">{card.text}</p>
                          {card.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {card.tags.map((tag: any, tagIndex: number) => (
                                <span
                                  key={tagIndex}
                                  className="text-[10px] font-bold uppercase tracking-widest text-brand-sky bg-brand-sky/10 px-2 py-1 rounded"
                                >
                                  {tag.text}
                                </span>
                              ))}
                            </div>
                          )}
                          {card.socialLink && (
                            <div className="mt-4 pt-4 border-t border-gray-50">
                              <a href={card.socialLink} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-brand-ocean hover:underline flex items-center gap-1">
                                LinkedIn Profile ↗
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {block.ctaLabel && block.ctaLink && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                    <div className="rounded-[2.5rem] bg-ink text-white p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                      <h3 className="text-2xl lg:text-3xl font-extrabold">
                        Want an IT partner that communicates clearly and delivers consistently?
                      </h3>
                      <Link
                        href={localizeHref(block.ctaLink)}
                        className="px-8 py-3 bg-highlight text-ink rounded-xl font-bold hover:bg-brand-mint transition-all"
                      >
                        {block.ctaLabel}
                      </Link>
                    </div>
                  </div>
                )}
              </section>
            );
          case 'bullets':
            const bulletsStyle = block.template ? templateStyles[block.template] : undefined;
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-gray-50 ${animationClass}`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                  )}
                  {block.intro && <p className="text-lg text-gray-600 mb-10 max-w-3xl">{block.intro}</p>}
                  <div className="grid gap-6 md:grid-cols-2">
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div
                        key={itemIndex}
                        className={`flex gap-3 rounded-2xl bg-white p-6 border border-gray-100 ${bulletsStyle ? `border-l-4 ${bulletsStyle.accentText.replace('text-', 'border-')}` : ''
                          }`}
                      >
                        <span className="text-highlight font-bold">✓</span>
                        <p className="text-gray-700">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'deliverables':
            const deliverStyle = block.template ? templateStyles[block.template] : undefined;
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                  )}
                  {block.intro && <p className="text-lg text-gray-600 mb-10 max-w-3xl">{block.intro}</p>}
                  <div className="grid gap-6 md:grid-cols-2">
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div
                        key={itemIndex}
                        className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${deliverStyle ? `border-t-4 ${deliverStyle.accentText.replace('text-', 'border-')}` : ''
                          }`}
                      >
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        {item.text && <p className="text-gray-600">{item.text}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'outcomesCards':
            const outcomesStyle = block.template ? templateStyles[block.template] : undefined;
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                  )}
                  {block.intro && <p className="text-lg text-gray-600 mb-10 max-w-3xl">{block.intro}</p>}
                  <div className="grid gap-8 md:grid-cols-3">
                    {block.cards?.map((card: any, cardIndex: number) => (
                      <div
                        key={cardIndex}
                        className={`rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm ${outcomesStyle ? `border-t-4 ${outcomesStyle.accentText.replace('text-', 'border-')}` : ''
                          }`}
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                        {card.text && <p className="text-gray-600">{card.text}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'steps':
            const stepsStyle = block.template ? templateStyles[block.template] : undefined;
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-gray-50 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                  )}
                  {block.intro && <p className="text-lg text-gray-600 mb-10 max-w-3xl">{block.intro}</p>}
                  <div className="grid gap-6 md:grid-cols-4">
                    {block.steps?.map((step: any, stepIndex: number) => (
                      <div
                        key={stepIndex}
                        className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${stepsStyle ? `border-t-4 ${stepsStyle.accentText.replace('text-', 'border-')}` : ''
                          }`}
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ocean mb-2">
                          Step {stepIndex + 1}
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                        {step.text && <p className="text-gray-600">{step.text}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'richText':
            return (
              <section key={index} {...sectionProps(block)} className={`py-16 ${animationClass}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                    {block.content}
                  </div>
                </div>
              </section>
            );
          case 'stats':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                  )}
                  {block.intro && <p className="text-xl text-gray-600 mb-10 max-w-3xl">{block.intro}</p>}
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="p-8 rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{item.label}</p>
                        <p className="text-3xl font-extrabold text-gray-900">{item.value}</p>
                        {item.note && <p className="text-sm text-gray-500 mt-3">{item.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'testimonials':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-gray-50 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                  )}
                  {block.intro && <p className="text-xl text-gray-600 mb-12 max-w-3xl">{block.intro}</p>}
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex flex-col gap-6">
                        <p className="text-gray-700 text-lg leading-relaxed">“{item.quote}”</p>
                        <div className="flex items-center gap-4">
                          {getMediaMeta(item.logo).url && (
                            <img src={getMediaMeta(item.logo).url} alt="" className="h-8 object-contain" />
                          )}
                          <div>
                            <p className="font-bold text-gray-900">{item.name}</p>
                            {(item.role || item.company) && (
                              <p className="text-sm text-gray-500">
                                {[item.role, item.company].filter(Boolean).join(' · ')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'faq':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-10 tracking-tighter">
                    {block.title || 'FAQ'}
                  </h2>
                  <div className="space-y-4">
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/30">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.question}</h3>
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'caseStudyTeaser':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                  )}
                  {block.intro && <p className="text-xl text-gray-600 mb-10 max-w-3xl">{block.intro}</p>}
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="p-8 rounded-[2rem] border border-gray-100 bg-white shadow-sm flex flex-col gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.industry}</p>
                          <h3 className="text-xl font-bold text-gray-900 mt-2">{item.title}</h3>
                        </div>
                        {item.challenge && <p className="text-gray-600">{item.challenge}</p>}
                        {item.result && (
                          <p className="text-sm font-semibold text-ink">Result: {item.result}</p>
                        )}
                        {item.link && (
                          <Link href={localizeHref(item.link)} className="text-sm font-bold text-accent hover:text-primaryDark">
                            Read case study →
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'mission-vision-values':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-white ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-12 tracking-tighter text-center">
                    {block.sectionTitle || 'Missão, Visão e Valores'}
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div className="p-10 rounded-[2.5rem] bg-brand-ocean/5 border border-brand-ocean/10">
                      <h3 className="text-lg font-bold uppercase tracking-widest text-brand-ocean mb-4">A Nossa Missão</h3>
                      <p className="text-2xl font-bold text-gray-900 leading-tight">{block.mission}</p>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-brand-mint/10 border border-brand-mint/20">
                      <h3 className="text-lg font-bold uppercase tracking-widest text-brand-mint mb-4">A Nossa Visão</h3>
                      <p className="text-2xl font-bold text-gray-900 leading-tight">{block.vision}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {block.values?.map((val: any, valIdx: number) => (
                      <div key={valIdx} className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h4>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{val.description}</p>
                        {val.proofBehavior && (
                          <div className="pt-4 border-t border-gray-50">
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-brand-ocean mb-1">Prova de comportamento</p>
                            <p className="text-xs font-semibold text-gray-500 italic">
                              &ldquo;{val.proofBehavior}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'timeline':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-gray-50 ${animationClass}`}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter text-center">
                      {block.sectionTitle || 'A Nossa História'}
                    </h2>
                    {block.intro && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{block.intro}</p>}
                  </div>
                  <div className="relative space-y-12">
                    <div className="absolute left-0 lg:left-1/2 top-4 bottom-4 w-px bg-gray-200 lg:-translate-x-1/2" />
                    {block.items?.map((item: any, itemIdx: number) => (
                      <div key={itemIdx} className={`relative flex flex-col lg:flex-row gap-8 ${itemIdx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="absolute left-0 lg:left-1/2 top-4 w-4 h-4 rounded-full bg-brand-ocean border-4 border-white shadow-sm lg:-translate-x-1/2 z-10" />
                        <div className="lg:w-1/2 pl-12 lg:pl-0">
                          <div className={`p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm ${itemIdx % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                            <span className="text-xs font-black text-brand-ocean bg-brand-ocean/10 px-3 py-1 rounded-full mb-4 inline-block uppercase tracking-wider">
                              {item.yearOrPeriod}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            {item.highlightQuote && (
                              <blockquote className={`mt-6 pt-6 border-t border-gray-50 text-brand-mint font-bold italic ${itemIdx % 2 === 0 ? 'lg:text-right' : ''}`}>
                                “{item.highlightQuote}”
                              </blockquote>
                            )}
                          </div>
                        </div>
                        <div className="lg:w-1/2 hidden lg:block" />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'coreTeam':
            return (
              <SectionWrapper key={index} block={block} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-12">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title || 'Core Team'}
                    </h2>
                    {block.intro && <p className="text-xl text-gray-600 max-w-3xl">{block.intro}</p>}
                  </div>
                  <div className="grid gap-8">
                    {block.members?.map((memberRef: any, memberIndex: number) => {
                      const member = typeof memberRef === 'object' ? memberRef : null;
                      if (!member) return null;
                      const photo = getMediaMeta(member.photo);
                      return (
                        <div key={memberIndex} className="rounded-[2.5rem] border border-gray-100 bg-gray-50/30 p-8 lg:p-12 hover:shadow-xl hover:bg-white transition-all flex flex-col lg:flex-row gap-10 items-start">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white ${member.avatarType === 'gradient' ? 'bg-gradient-to-br from-brand-ocean to-brand-teal' : 'bg-gray-100'}`}>
                              {photo.url ? (
                                <img src={photo.url} alt={photo.alt || member.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-brand-ocean/30">
                                  <span className="text-4xl text-brand-ocean opacity-20">👤</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Content */}
                          <div className="flex-1">
                            <div className="mb-6">
                              <h3 className="text-3xl font-black text-gray-900 mb-1">{member.name}</h3>
                              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{member.roleTitle}</p>
                            </div>
                            <p className="text-lg font-bold text-brand-ocean mb-4 leading-tight">&ldquo;{member.oneLiner}&rdquo;</p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl">{member.bio}</p>

                            {/* Tags */}
                            {member.tags?.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-8">
                                {member.tags.map((tag: any, tagIdx: number) => (
                                  <span key={tagIdx} className="px-3 py-1 bg-brand-sky/10 text-brand-ocean text-xs font-bold uppercase tracking-widest rounded-full">
                                    {tag.text}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Social Buttons */}
                            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                              {member.links?.linkedinUrl && (
                                <a href={member.links.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-ocean transition-colors">
                                  <span>LinkedIn</span>
                                  <span className="text-xs">↗</span>
                                </a>
                              )}
                              {member.links?.email && (
                                <a href={`mailto:${member.links.email}`} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-ocean transition-colors">
                                  <span>Email</span>
                                  <span className="text-xs">✉</span>
                                </a>
                              )}
                              {member.links?.githubUrl && (
                                <a href={member.links.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-ocean transition-colors">
                                  <span>GitHub</span>
                                  <span className="text-xs">↗</span>
                                </a>
                              )}
                              {member.links?.websiteUrl && (
                                <a href={member.links.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-ocean transition-colors">
                                  <span>Website</span>
                                  <span className="text-xs">↗</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </SectionWrapper>
            );
          case 'partnersGroup':
            return (
              <SectionWrapper key={index} block={block} className={`py-20 ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-12">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title || 'Trusted Partners'}
                    </h2>
                    {block.intro && <p className="text-xl text-gray-600 max-w-3xl">{block.intro}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {block.partners?.map((partnerRef: any, partnerIdx: number) => {
                      const partner = typeof partnerRef === 'object' ? partnerRef : null;
                      if (!partner) return null;
                      const logo = getMediaMeta(partner.logo);
                      return (
                        <div key={partnerIdx} className="p-8 lg:p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col gap-6">
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-sky">{partner.category}</p>
                            {partner.trustedSince && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Partner since {partner.trustedSince}</p>}
                          </div>
                          <div className="flex items-center gap-6">
                            {logo.url && (
                              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 p-2 flex items-center justify-center border border-gray-100">
                                <img src={logo.url} alt={logo.alt || partner.companyName} className="max-w-full max-h-full object-contain" />
                              </div>
                            )}
                            <h3 className="text-2xl font-black text-gray-900">{partner.companyName}</h3>
                          </div>
                          <p className="text-gray-600 text-lg leading-relaxed flex-1">{partner.specialtyLine}</p>
                          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-50">
                            {partner.links?.websiteUrl && (
                              <a href={partner.links.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-ocean hover:underline">
                                Website ↗
                              </a>
                            )}
                            {partner.links?.linkedinUrl && (
                              <a href={partner.links.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-500 hover:text-brand-ocean">
                                LinkedIn ↗
                              </a>
                            )}
                            {partner.links?.email && (
                              <a href={`mailto:${partner.links.email}`} className="text-sm font-bold text-gray-500 hover:text-brand-ocean">
                                Email ✉
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </SectionWrapper>
            );
          case 'social-responsibility':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-white ${animationClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
                    <div className="lg:col-span-8">
                      <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                        {block.sectionTitle || 'Responsabilidade Social'}
                      </h2>
                      {block.intro && <p className="text-xl text-gray-600 max-w-3xl">{block.intro}</p>}
                    </div>
                    {block.cta?.link && (
                      <div className="lg:col-span-4 lg:text-right">
                        <Link href={localizeHref(block.cta.link)} className="px-8 py-3 bg-brand-sky text-white rounded-xl font-bold hover:bg-brand-ocean transition-all shadow-lg shadow-brand-sky/20">
                          {block.cta.label || 'Saber mais'}
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {block.initiatives?.map((init: any, initIdx: number) => {
                      const statusColors: any = {
                        active: 'bg-brand-mint/10 text-brand-mint',
                        planned: 'bg-brand-sky/10 text-brand-sky',
                        completed: 'bg-gray-100 text-gray-500',
                      };
                      return (
                        <div key={initIdx} className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/40 hover:bg-white hover:shadow-xl transition-all h-full flex flex-col">
                          <div className="flex justify-between items-start mb-6">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${statusColors[init.status] || 'bg-gray-100'}`}>
                              {init.status}
                            </span>
                            {init.link && <a href={init.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-ocean">↗</a>}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{init.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line">{init.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          case 'contactForm':
            return (
              <section key={index} {...sectionProps(block)} className={`py-20 bg-gray-50 ${animationClass}`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title || 'Let’s talk.'}
                    </h2>
                    {block.intro && <p className="text-xl text-gray-600">{block.intro}</p>}
                  </div>
                  <ContactForm
                    submitLabel={block.submitLabel}
                    topics={block.topics?.map((topic: any) => topic.label).filter(Boolean)}
                  />
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
