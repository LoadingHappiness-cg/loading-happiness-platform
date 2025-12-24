import Link from 'next/link';
import { withLocale } from '@/lib/locale';
import ContactForm from './ContactForm';

const gridCols: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

const getMediaUrl = (media: any) => {
  if (!media) return undefined;
  if (typeof media === 'string') return media;
  return media.url || media?.sizes?.thumbnail?.url;
};

export default function PageBlocks({ blocks, localePrefix }: { blocks: any[]; localePrefix?: string }) {
  if (!blocks?.length) return null;

  const localizeHref = (href: string) => withLocale(href, localePrefix);
  const sectionProps = (block: any) => (block?.sectionId ? { id: block.sectionId } : {});

  return (
    <div>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return (
              <section key={index} {...sectionProps(block)} className="py-20 lg:py-28 border-b border-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tighter mb-6">
                      {block.heading}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">{block.subheading}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {block.primaryCTA && (
                        <Link
                          href={localizeHref(block.primaryCTA.link)}
                          className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark transition-all"
                        >
                          {block.primaryCTA.label}
                        </Link>
                      )}
                      {block.secondaryCTA && (
                        <Link
                          href={localizeHref(block.secondaryCTA.link)}
                          className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                        >
                          {block.secondaryCTA.label}
                        </Link>
                      )}
                    </div>
                    {block.badges?.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-8">
                        {block.badges.map((badge: any, badgeIndex: number) => (
                          <span
                            key={badgeIndex}
                            className="px-3 py-1 bg-highlight/20 text-highlight rounded-full text-xs font-bold"
                          >
                            {badge.text}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-5">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-gray-50/50 bg-gray-100 aspect-[4/5]">
                      {getMediaUrl(block.image) && (
                        <img src={getMediaUrl(block.image)} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
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
                        {getMediaUrl(logo.logo) && (
                          <img
                            src={getMediaUrl(logo.logo)}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {block.services?.map((service: any, serviceIndex: number) => (
                      <div key={serviceIndex} className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/40">
                        <div className="text-2xl mb-4">{service.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    ))}
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
                    <div className="space-y-6">
                      {block.steps?.map((step: any, stepIndex: number) => (
                        <div key={stepIndex} className="p-6 rounded-2xl bg-white border border-gray-100">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-gray-50/50 bg-gray-100 aspect-[4/5]">
                      {getMediaUrl(block.image) && (
                        <img src={getMediaUrl(block.image)} alt="" className="w-full h-full object-cover" />
                      )}
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
                      {getMediaUrl(block.image) && (
                        <img src={getMediaUrl(block.image)} alt="" className="w-full h-full object-cover" />
                      )}
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
                      <Link href={localizeHref(block.primaryCTA.link)} className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark transition-all">
                        {block.primaryCTA.label}
                      </Link>
                    )}
                    {block.secondaryCTA?.link && (
                      <Link href={localizeHref(block.secondaryCTA.link)} className="px-8 py-3 bg-primaryDark/30 text-white rounded-xl font-bold hover:bg-primaryDark/50 transition-all">
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
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  {block.title && (
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-8 tracking-tighter">
                      {block.title}
                    </h2>
                  )}
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
                    <iframe
                      src={block.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={block.title || 'Video'}
                    ></iframe>
                  </div>
                  {block.caption && <p className="text-gray-600 mt-4">{block.caption}</p>}
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
                        {getMediaUrl(image.image) && (
                          <img src={getMediaUrl(image.image)} alt={image.alt || ''} className="w-full h-full object-cover" />
                        )}
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
                      {getMediaUrl(block.image) && (
                        <img src={getMediaUrl(block.image)} alt="" className="w-full h-full object-cover" />
                      )}
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
                          {getMediaUrl(item.logo) && (
                            <img src={getMediaUrl(item.logo)} alt="" className="h-8 object-contain" />
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
