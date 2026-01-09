import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageBlocks from '../components/PageBlocks';
import { PayloadImage } from '../components/PayloadImage';
import { getPayloadClient } from '@/lib/payload';
import { Content as ContentType } from '@/payload-types';
import { getLocale, withLocale, t } from '@/lib/locale';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PAGE_SLUG = 'home';

const buildMetadata = (page: any, locale: string): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = page?.seo?.canonicalUrl || `${baseUrl}/${locale}`;
  const ogImageField = page?.seo?.openGraph?.ogImage;
  const ogImage =
    typeof ogImageField === 'string'
      ? undefined
      : ogImageField?.sizes?.thumbnail?.url || ogImageField?.url;

  const title = page?.seo?.openGraph?.ogTitle || page?.seo?.title || page?.title || 'Loading Happiness';
  const description = page?.seo?.openGraph?.ogDescription || page?.seo?.description;

  return {
    title,
    description,
    alternates: { canonical },
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
    robots: page?.seo?.indexable === false ? { index: false, follow: false } : undefined,
  };
};

const loadPage = async (locale: string, payload?: any) => {
  const client = payload || (await getPayloadClient());
  const result = await client.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: PAGE_SLUG } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 1,
    locale,
    fallbackLocale: 'en',
    depth: 2,
  });
  return result.docs[0] as any;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const page = await loadPage(locale);
  if (!page) return {};
  return buildMetadata(page, locale);
}

export default async function HomePage() {
  const locale = await getLocale();
  const payload = await getPayloadClient();
  const localePrefix = `/${locale}`;
  const page = await loadPage(locale, payload);

  if (!page) {
    notFound();
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
      {page.seo?.schemaOrg ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.seo.schemaOrg }} />
      ) : null}
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
                  {post.featuredImage && typeof post.featuredImage === 'object' && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                      <PayloadImage
                        media={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
