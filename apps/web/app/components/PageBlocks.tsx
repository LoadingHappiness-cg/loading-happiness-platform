import Link from 'next/link';
import { withLocale } from '@/lib/locale';
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

export default function PageBlocks({ blocks, localePrefix }: { blocks: any[]; localePrefix?: string }) {
  if (!blocks?.length) return null;

  const localizeHref = (href: string) => withLocale(href, localePrefix);
  const sectionProps = (block: any) => (block?.sectionId ? { id: block.sectionId } : {});

  return (
    <div>
      {blocks.map((block, index) => {
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
                : 'bg-white';
            const media = getMediaMeta(block.image);
            const hideMedia = block.mediaType === 'none';
            const prefersMedia = block.mediaType === 'videoThumbnail';
            const heroVariantClass =
              variant === 'B'
                ? 'py-24 lg:py-32'
                : variant === 'D'
                ? 'py-16 lg:py-24'
                : variant === 'E'
                ? 'py-20 lg:py-28'
                : 'py-20 lg:py-28';

            return (
              <section
                key={index}
                {...sectionProps(block)}
                className={`hero-${variant} relative overflow-hidden border-b border-gray-50 ${heroVariantClass} ${themeClass}`}
              >
                {heroTheme === 'brandGradient' && (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,179,202,0.18),transparent_55%),radial-gradient(circle_at_top_right,rgba(105,143,254,0.2),transparent_45%),linear-gradient(120deg,rgba(51,37,112,0.1),rgba(35,109,156,0.16))]" />
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-teal/20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-sky/20 blur-[120px]" />
                  </>
                )}
                <div
                  className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
                    variant === 'B'
                      ? 'text-center'
                      : variant === 'D'
                      ? 'grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'
                      : 'grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'
                  }`}
                >
                  <div className={variant === 'B' ? 'max-w-3xl mx-auto' : variant === 'D' ? 'lg:col-span-6' : 'lg:col-span-7'}>
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-ocean font-bold mb-4">
                      Loading Happiness
                    </p>
                    {block.template && templateStyles[block.template] && (
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${templateStyles[block.template].accentText} ${templateStyles[block.template].accentBg}`}
                      >
                        {templateStyles[block.template].label}
                      </span>
                    )}
                    <h1
                      className={`${
                        variant === 'D' ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-4xl md:text-5xl lg:text-6xl'
                      } font-extrabold tracking-tighter mb-6 ${
                        heroTheme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {block.heading}
                    </h1>
                    <p
                      className={`text-xl leading-relaxed mb-8 ${
                        heroTheme === 'dark' ? 'text-white/80' : 'text-gray-700'
                      } ${variant === 'B' ? '' : 'max-w-2xl'}`}
                    >
                      {block.subheading}
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 ${isCentered ? 'justify-center' : ''}`}>
                      {block.primaryCTA && (
                        <Link
                          href={localizeHref(block.primaryCTA.link)}
                          className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark transition-all shadow-xl shadow-primary/30"
                        >
                          {block.primaryCTA.label}
                        </Link>
                      )}
                      {block.secondaryCTA && (
                        <Link
                          href={localizeHref(block.secondaryCTA.link)}
                          className={`px-8 py-3 rounded-xl font-bold transition-all ${
                            heroTheme === 'dark'
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
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              block.template && templateStyles[block.template]
                                ? `${templateStyles[block.template].accentBg} ${templateStyles[block.template].accentText}`
                                : 'bg-brand-mint/20 text-brand-ocean'
                            }`}
                          >
                            {badge.text}
                          </span>
                        ))}
                      </div>
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
                      <div className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white/70 bg-white/70 backdrop-blur ${variant === 'D' ? 'aspect-[4/5]' : 'aspect-[4/5]'}`}>
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
                          return (
                            <div className="relative w-full h-full p-6 flex flex-col justify-end gap-4">
                              {[
                                { title: 'Response time', value: '< 15 min' },
                                { title: 'Security baseline', value: '90 days' },
                                { title: 'Ops roadmap', value: '12 months' },
                              ].map((card, cardIndex) => (
                                <div
                                  key={card.title}
                                  className={`hero-card hero-card-${cardIndex + 1} rounded-2xl border border-white/80 bg-white/90 shadow-lg p-4 ${
                                    cardIndex === 0 ? 'ml-10' : cardIndex === 1 ? 'ml-4' : ''
                                  }`}
                                >
                                  <p className="text-[10px] uppercase tracking-[0.2em] text-brand-ocean font-bold">
                                    {card.title}
                                  </p>
                                  <p className="text-2xl font-extrabold text-ink">{card.value}</p>
                                </div>
                              ))}
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
              <section key={index} {...sectionProps(block)} className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-8">
                    {block.text}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                    {block.logos?.map((logo: any, logoIndex: number) => (
                      <div key={logoIndex} className="flex justify-center">
                        {getMediaMeta(logo.logo).url && (
                          <img
                            src={getMediaMeta(logo.logo).url}
                            alt={logo.alt || ''}
                            className="h-8 object-contain"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'pillars':
            return (
              <section key={index} {...sectionProps(block)} className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-10 tracking-tighter">
                    {block.title}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/40">
                        <div className="text-2xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'servicesGrid':
            return (
              <section key={index} {...sectionProps(block)} className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tighter">{block.title}</h2>
                    {block.cta?.link && (
                      <Link href={localizeHref(block.cta.link)} className="text-sm font-bold text-accent hover:text-primaryDark">
                        {block.cta.label || 'Explore'} →
                      </Link>
                    )}
                  </div>
                  {block.intro && <p className="text-lg text-gray-600 mb-8 max-w-3xl">{block.intro}</p>}
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
                          className={`w-12 h-12 rounded-2xl grid place-items-center text-2xl mb-6 ${
                            serviceStyle ? `${serviceStyle.accentBg} ${serviceStyle.accentText}` : 'bg-brand-sky/15 text-brand-ocean'
                          }`}
                        >
                          {service.icon}
                        </div>
                        {(service.tag || serviceStyle) && (
                          <p
                            className={`text-[10px] font-extrabold uppercase tracking-[0.2em] mb-3 ${
                              serviceStyle ? serviceStyle.accentText : 'text-brand-sky'
                            }`}
                          >
                            {service.tag || serviceStyle?.label}
                          </p>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                        {service.link && (
                          <Link
                            href={localizeHref(service.link)}
                            className="mt-6 inline-flex text-sm font-bold text-accent hover:text-primaryDark"
                          >
                            Learn more →
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
              <section key={index} {...sectionProps(block)} className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                    <div className="space-y-6 relative">
                      <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-brand-ocean/40 via-brand-sky/30 to-brand-teal/30" />
                      {block.steps?.map((step: any, stepIndex: number) => (
                        <div key={stepIndex} className="relative pl-12">
                          <span className="absolute left-0 top-3 h-8 w-8 rounded-full bg-white border border-brand-ocean text-brand-ocean font-bold grid place-items-center text-xs">
                            {stepIndex + 1}
                          </span>
                          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.content}</p>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ocean mt-4">
                              Deliverable
                            </p>
                            <p className="text-sm text-gray-500">
                              {stepIndex === 0 && 'Risk map'}
                              {stepIndex === 1 && 'Quick wins plan'}
                              {stepIndex === 2 && '12-month roadmap'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {block.note && <p className="mt-8 text-sm text-gray-500">{block.note}</p>}
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
              <section key={index} {...sectionProps(block)} className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">{block.content}</p>
                    {block.cta?.link && (
                      <Link href={localizeHref(block.cta.link)} className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark transition-all">
                        {block.cta.label}
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
              <section key={index} {...sectionProps(block)} className="py-20 bg-ink text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                  <div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 tracking-tighter">{block.title}</h2>
                    <p className="text-gray-300 text-lg max-w-2xl">{block.content}</p>
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
              <section key={index} {...sectionProps(block)} className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5">
                    {block.title && (
                      <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                        {block.title}
                      </h2>
                    )}
                    {block.caption && <p className="text-xl text-gray-600 leading-relaxed">{block.caption}</p>}
                  </div>
                  <div className="lg:col-span-7">
                    <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10">
                      <iframe
                        src={block.videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={block.title || 'Video'}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'imageGallery':
            return (
              <section key={index} {...sectionProps(block)} className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-10 tracking-tighter">
                      {block.title}
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
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'splitContent':
            return (
              <section key={index} {...sectionProps(block)} className="py-20 border-b border-gray-50">
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-center ${block.reverse ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-1/2">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">{block.title}</h2>
                    {block.content && <p className="text-xl text-gray-600 leading-relaxed mb-8">{block.content}</p>}
                    {block.items?.length > 0 && (
                      <ul className="space-y-4">
                        {block.items.map((item: any, itemIndex: number) => (
                          <li key={itemIndex} className="flex items-center gap-3 text-gray-700 font-medium">
                            <span className="text-highlight">✓</span>
                            {item.item || item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {block.cta?.link && (
                      <Link href={localizeHref(block.cta.link)} className="inline-block mt-8 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark transition-all">
                        {block.cta.label}
                      </Link>
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
          case 'featureGrid':
            return (
              <section key={index} {...sectionProps(block)} className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-10 tracking-tighter">
                      {block.title}
                    </h2>
                  )}
                  <div className={`grid gap-8 ${gridCols[block.columns || 3]}`}>
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
                        <div className="text-2xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'valueCards':
            return (
              <section key={index} {...sectionProps(block)} className="py-20">
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
              <section key={index} {...sectionProps(block)} className="py-20">
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
              <section key={index} {...sectionProps(block)} className="py-20 bg-gray-50">
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
              <section key={index} {...sectionProps(block)} className="py-20">
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
              <section key={index} {...sectionProps(block)} className="py-20 bg-gray-50">
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
              <section key={index} {...sectionProps(block)} className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-12">
                  <div className="lg:col-span-6">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                    <p className="text-lg text-gray-600">{block.text}</p>
                  </div>
                  <div className="lg:col-span-6 grid gap-6">
                    {block.cards?.map((card: any, cardIndex: number) => (
                      <div key={cardIndex} className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                        <p className="text-gray-600">{card.text}</p>
                        {card.tags?.length > 0 && (
                          <div className="mt-6 flex flex-wrap gap-2">
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
              <section key={index} {...sectionProps(block)} className="py-20 bg-gray-50">
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
                        className={`flex gap-3 rounded-2xl bg-white p-6 border border-gray-100 ${
                          bulletsStyle ? `border-l-4 ${bulletsStyle.accentText.replace('text-', 'border-')}` : ''
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
              <section key={index} {...sectionProps(block)} className="py-20">
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
                        className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${
                          deliverStyle ? `border-t-4 ${deliverStyle.accentText.replace('text-', 'border-')}` : ''
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
              <section key={index} {...sectionProps(block)} className="py-20">
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
                        className={`rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm ${
                          outcomesStyle ? `border-t-4 ${outcomesStyle.accentText.replace('text-', 'border-')}` : ''
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
              <section key={index} {...sectionProps(block)} className="py-20 bg-gray-50">
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
                        className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${
                          stepsStyle ? `border-t-4 ${stepsStyle.accentText.replace('text-', 'border-')}` : ''
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
              <section key={index} {...sectionProps(block)} className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                    {block.content}
                  </div>
                </div>
              </section>
            );
          case 'stats':
            return (
              <section key={index} {...sectionProps(block)} className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                      {block.title}
                    </h2>
                  )}
                  {block.intro && <p className="text-xl text-gray-600 mb-10 max-w-3xl">{block.intro}</p>}
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/40">
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
              <section key={index} {...sectionProps(block)} className="py-20 bg-gray-50">
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
              <section key={index} {...sectionProps(block)} className="py-20">
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
              <section key={index} {...sectionProps(block)} className="py-20">
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
          case 'contactForm':
            return (
              <section key={index} {...sectionProps(block)} className="py-20 bg-gray-50">
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
