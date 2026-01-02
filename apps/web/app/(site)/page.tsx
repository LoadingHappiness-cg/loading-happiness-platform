import Link from 'next/link';
import PageBlocks from '../components/PageBlocks';
import { getPayloadClient } from '@/lib/payload';
import { Content as ContentType } from '@/payload-types';
import { getLocale, withLocale, t } from '@/lib/locale';

const fallbackSections = async (localePrefix: string) => {
  const heroHeading = await t('hero.fallback.heading');
  const heroSubheading = await t('hero.fallback.subheading');
  const heroPrimaryCta = await t('hero.fallback.primaryCta');
  const heroSecondaryCta = await t('hero.fallback.secondaryCta');
  const servicesHeading = await t('home.servicesHeading');
  const allServices = await t('common.allServices');
  const managedItTitle = await t('services.managedIt.title');
  const managedItDesc = await t('services.managedIt.description');
  const cybersecurityTitle = await t('services.cybersecurity.title');
  const cybersecurityDesc = await t('services.cybersecurity.description');
  const cloudTitle = await t('services.cloud.title');
  const cloudDesc = await t('services.cloud.description');
  const ctaHeading = await t('home.ctaHeading');
  const ctaSubheading = await t('home.ctaSubheading');
  const ctaPrimary = await t('home.ctaPrimary');
  const ctaSecondary = await t('home.ctaSecondary');

  return (
    <div className="bg-white">
      <section className="relative py-20 lg:py-32 overflow-hidden border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] mb-8 tracking-tighter">
                {heroHeading}
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed max-w-2xl font-medium">
                {heroSubheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={withLocale('/contact', localePrefix)} className="px-10 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark shadow-xl shadow-primary/30 transition-all text-center">
                  {heroPrimaryCta}
                </Link>
                <Link href={withLocale('/services', localePrefix)} className="px-10 py-4 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all text-center">
                  {heroSecondaryCta}
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-gray-50/50 bg-gray-100 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                  alt="Support"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tighter">{servicesHeading}</h2>
            <Link href={withLocale('/services', localePrefix)} className="text-sm font-bold text-accent hover:text-primaryDark">{allServices} →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: managedItTitle,
                description: managedItDesc,
                icon: '💻',
              },
              {
                title: cybersecurityTitle,
                description: cybersecurityDesc,
                icon: '🛡️',
              },
              {
                title: cloudTitle,
                description: cloudDesc,
                icon: '☁️',
              },
            ].map((service) => (
              <div key={service.title} className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/40">
                <div className="text-2xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 tracking-tighter">{ctaHeading}</h2>
            <p className="text-gray-300 text-lg max-w-2xl">
              {ctaSubheading}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={withLocale('/contact', localePrefix)} className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark transition-all">
              {ctaPrimary}
            </Link>
            <Link href={withLocale('/contact', localePrefix)} className="px-8 py-3 bg-primaryDark/30 text-white rounded-xl font-bold hover:bg-primaryDark/50 transition-all">
              {ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default async function HomePage() {
  const payload = await getPayloadClient();
  const locale = await getLocale();
  const localePrefix = `/${locale}`;
  const pageResult = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: 'home' } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 1,
    locale,
    fallbackLocale: 'en',
  });

  const page = pageResult.docs[0];
  if (!page) {
    return fallbackSections(localePrefix);
  }

  const latest = await payload.find({
    collection: 'content',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 3,
    locale,
    fallbackLocale: 'en',
  });

  const latestInsightsHeading = await t('home.latestInsights');
  const viewAllText = await t('common.viewAll');

  return (
    <>
      <PageBlocks blocks={page.layout || []} localePrefix={localePrefix} />
      {latest.docs.length > 0 && (
        <section className="py-20 bg-white border-t border-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tighter">{latestInsightsHeading}</h2>
              <Link href={withLocale('/news', localePrefix)} className="text-sm font-bold text-accent hover:text-primaryDark">
                {viewAllText} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latest.docs.map((post: ContentType) => (
                <article key={post.id} className="group rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  {post.featuredImage && typeof post.featuredImage !== 'string' && (
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                      <img
                        src={(post.featuredImage as any).url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent bg-accent/15 px-2 py-1 rounded">
                      {post.contentType}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-4 mb-3 group-hover:text-primaryDark transition-colors">
                      <Link href={withLocale(`/news/${post.slug}`, localePrefix)}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {post.tags?.map((tag: any) => (
                        <span
                          key={tag.id}
                          className={`text-[10px] font-bold text-gray-500 px-2 py-1 rounded bg-gray-50 tag-color-border tag-val-${tag.id}`}
                        >
                          <style>{`.tag-val-${tag.id} { --tag-color: ${tag.color || '#cbd5e1'}; }`}</style>
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
