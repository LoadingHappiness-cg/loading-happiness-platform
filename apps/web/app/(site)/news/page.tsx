
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageBlocks from '../../components/PageBlocks';
import { getPayloadClient } from '@/lib/payload';
import { Content as ContentType } from '@/payload-types';
import { getLocale, getTranslator, withLocale } from '@/lib/locale';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    tags?: string;
    page?: string;
  }>;
}

const PAGE_SLUG = 'news';
const PAGE_SLUG_ALIASES = ['news', 'noticias'];

const buildArticleSchema = (post: any, localePrefix: string) => {
  const imageField = post?.featuredImage;
  const imageUrl = typeof imageField === 'string' ? undefined : imageField?.url;
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: imageUrl ? [imageUrl] : undefined,
    author: Array.isArray(post.authors)
      ? post.authors.map((a: any) => ({ '@type': 'Person', name: a?.name || a?.id || 'Author' }))
      : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com'}${localePrefix}/news/${post.slug}`,
    },
  };
};

const buildMetadata = (page: any, locale: string): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical =
    page?.seo?.canonicalUrl ||
    `${baseUrl}/${locale}/${page?.slug || PAGE_SLUG}`;
  const ogImageField = page?.seo?.openGraph?.ogImage;
  const ogImage =
    typeof ogImageField === 'string'
      ? undefined
      : ogImageField?.sizes?.thumbnail?.url || ogImageField?.url;

  const title = page?.seo?.openGraph?.ogTitle || page?.seo?.title || page?.title;
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
        { slug: { in: PAGE_SLUG_ALIASES } },
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

const fetchContentById = async (payload: any, id: string, locale: string) => {
  const res = await payload.find({
    collection: 'content',
    where: { id: { equals: id } },
    limit: 1,
    locale,
    depth: 2,
  });
  return res.docs[0];
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const page = await loadPage(locale);
  if (!page) return {};
  return buildMetadata(page, locale);
}

export default async function NewsPage({ searchParams }: PageProps) {
  const { q, type, tags: tagSlugs, page } = await searchParams;
  const payload = await getPayloadClient();
  const locale = await getLocale();
  const t = await getTranslator();
  const localePrefix = `/${locale}`;

  const pageDoc = await loadPage(locale, payload);
  if (!pageDoc) {
    notFound();
  }

  // Highlighted posts (manual override -> fallback to highlightLevel)
  let primary: any | undefined;
  let secondary: any[] = [];

  const overridePrimary = pageDoc.newsHighlights?.primary;
  const overrideSecondary = pageDoc.newsHighlights?.secondary || [];

  if (overridePrimary) {
    primary =
      typeof overridePrimary === 'string'
        ? await fetchContentById(payload, overridePrimary, locale)
        : overridePrimary;
  }

  if (overrideSecondary?.length) {
    const resolved = await Promise.all(
      overrideSecondary.map(async (item: any) =>
        typeof item === 'string' ? fetchContentById(payload, item, locale) : item,
      ),
    );
    secondary = resolved.filter(Boolean);
  }

  if (!primary) {
    const primaryRes = await payload.find({
      collection: 'content',
      where: {
        and: [
          { status: { equals: 'published' } },
          { highlightLevel: { equals: 'primary' } },
        ],
      },
      sort: ['-highlightOrder', '-publishedAt'],
      limit: 1,
      locale,
    });
    primary = primaryRes.docs[0] as any | undefined;
  }

  if (secondary.length === 0) {
    const secondaryRes = await payload.find({
      collection: 'content',
      where: {
        and: [
          { status: { equals: 'published' } },
          { highlightLevel: { equals: 'secondary' } },
          ...(primary ? [{ id: { not_equals: primary.id } }] : []),
        ],
      },
      sort: ['-highlightOrder', '-publishedAt'],
      limit: 2,
      locale,
    });
    secondary = secondaryRes.docs as any[];
  }

  const currentPage = parseInt(page || '1', 10);
  const limit = 12;

  // Resolve Tag Slugs to IDs from CMS
  let tagIds: string[] = [];
  if (tagSlugs) {
    const slugs = tagSlugs.split(',');
    const resolvedTags = await payload.find({
      collection: 'tags',
      where: {
        slug: { in: slugs },
      },
      locale,
    });
    tagIds = resolvedTags.docs.map((t) => String(t.id));
  }

  const where: any = {
    status: { equals: 'published' },
  };

  if (type) {
    where.contentType = { equals: type };
  }

  if (q) {
    where.or = [
      { title: { like: q } },
      { excerpt: { like: q } },
    ];
  }

  if (tagIds.length > 0) {
    where.tags = { in: tagIds };
  }

  const excludeIds: string[] = [];
  if (primary?.id) excludeIds.push(String(primary.id));
  secondary.forEach((s) => excludeIds.push(String(s.id)));
  if (excludeIds.length > 0) {
    where.id = { not_in: excludeIds };
  }

  const posts = await payload.find({
    collection: 'content',
    where,
    sort: '-publishedAt',
    limit,
    page: currentPage,
    locale,
  });

  return (
    <div className="bg-white">
      {pageDoc.seo?.schemaOrg ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: pageDoc.seo.schemaOrg }} />
      ) : null}
      {primary ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(primary, localePrefix)) }} />
      ) : null}

      <PageBlocks blocks={pageDoc.layout ?? []} localePrefix={localePrefix} />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {primary && (
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            <article className="lg:col-span-3 relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-ink via-primaryDark to-black text-white shadow-xl">
              <div className="absolute inset-0 bg-noise opacity-10" aria-hidden="true" />
              {primary.featuredImage && typeof primary.featuredImage !== 'string' && (
                <div className="absolute inset-0">
                  <Image
                    src={(primary.featuredImage as any).url}
                    alt={primary.title}
                    fill
                    className="object-cover opacity-60"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </div>
              )}
              <div className="relative z-10 p-8 lg:p-10 space-y-4 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
                <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-white/80">
                  <span className="bg-white/20 rounded-full px-2 py-1">{primary.contentType}</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/70">{new Date(primary.publishedAt).toLocaleDateString()}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight">{primary.title}</h2>
                <p className="text-white/80 text-lg leading-relaxed line-clamp-3">{primary.excerpt}</p>
                <Link
                  href={withLocale(`/news/${primary.slug}`, localePrefix)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-ink font-bold shadow-lg hover:-translate-y-0.5 transition-transform"
                >
                  {t('news.readMore')} →
                </Link>
              </div>
            </article>

            <div className="lg:col-span-2 space-y-4">
              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primary">{t('news.featuredSecondary')}</p>
              <div className="grid grid-cols-1 gap-4">
                {secondary.map((item) => (
                  <article
                    key={item.id}
                    className="group flex gap-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all overflow-hidden"
                  >
                    {item.featuredImage && typeof item.featuredImage !== 'string' && (
                      <div className="w-32 flex-none relative aspect-[4/3]">
                        <Image
                          src={(item.featuredImage as any).url}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-primary">
                        <span>{item.contentType}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-400">{new Date(item.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primaryDark transition-colors">
                        <Link href={withLocale(`/news/${item.slug}`, localePrefix)}>{item.title}</Link>
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <form className="flex-1 min-w-[300px]" action={withLocale('/news', localePrefix)}>
            <input
              name="q"
              defaultValue={q}
              placeholder={t('news.searchPlaceholder')}
              className="w-full px-5 py-3 rounded-xl border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </form>

          <div className="flex gap-2">
            {['Article', 'Opinion', 'Video', 'Guide'].map((typeLabel) => (
              <Link
                key={typeLabel}
                href={withLocale(`/news?type=${typeLabel}${q ? `&q=${q}` : ''}${tagSlugs ? `&tags=${tagSlugs}` : ''}`, localePrefix)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${type === typeLabel ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'}`}
              >
                {typeLabel}
              </Link>
            ))}
            {type && (
              <Link href={withLocale('/news', localePrefix)} className="px-4 py-2 text-xs font-bold text-gray-400">
                {t('news.clearFilters')}
              </Link>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
              {t('news.allArticles')}
            </h2>
            <span className="text-sm text-gray-500 font-medium">
              {posts.totalDocs} {posts.totalDocs === 1 ? 'post' : 'posts'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.docs.map((post: ContentType) => (
              <article key={post.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
                {post.featuredImage && typeof post.featuredImage !== 'string' && (
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
                    <Image
                      src={(post.featuredImage as any).url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent bg-accent/15 px-2 py-1 rounded">
                      {post.contentType}
                    </span>
                    <span className="text-gray-300 text-xs">•</span>
                    <span className="text-gray-400 text-xs font-medium">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primaryDark transition-colors leading-tight">
                    <Link href={withLocale(`/news/${post.slug}`, localePrefix)}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-gray-50">
                    {post.tags?.map((tag: any) => (
                      <Link
                        key={tag.id}
                        href={withLocale(`/news/tags/${tag.slug}`, localePrefix)}
                        className={`text-[10px] font-bold text-gray-500 hover:text-primaryDark transition-colors px-2 py-1 bg-gray-50 rounded tag-color-border tag-val-${tag.id}`}
                      >
                        <style>{`.tag-val-${tag.id} { --tag-color: ${tag.color || '#cbd5e1'}; }`}</style>
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {posts.totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-4">
            <Link
              href={withLocale(`/news?page=${currentPage - 1}${q ? `&q=${q}` : ''}${type ? `&type=${type}` : ''}${tagSlugs ? `&tags=${tagSlugs}` : ''}`, localePrefix)}
              className={`px-6 py-3 rounded-xl font-bold text-sm ${currentPage <= 1 ? 'pointer-events-none opacity-40 bg-gray-100' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              Previous
            </Link>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Page {currentPage} of {posts.totalPages}
            </span>
            <Link
              href={withLocale(`/news?page=${currentPage + 1}${q ? `&q=${q}` : ''}${type ? `&type=${type}` : ''}${tagSlugs ? `&tags=${tagSlugs}` : ''}`, localePrefix)}
              className={`px-6 py-3 rounded-xl font-bold text-sm ${currentPage >= posts.totalPages ? 'pointer-events-none opacity-40 bg-gray-100' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              Next
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
