import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageBlocks from '../../components/PageBlocks';
import { getLocale } from '@/lib/locale';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PAGE_SLUG = 'services';

const buildMetadata = (page: any, locale: string): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = page?.seo?.canonicalUrl || `${baseUrl}/${locale}/services`;
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

const loadPage = async (locale: string) => {
  const payload = await getPayloadClient();
  const payloadLocale = locale as 'en' | 'pt' | 'all';
  const result = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: PAGE_SLUG } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 1,
    locale: payloadLocale,
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

export default async function ServicesOverviewPage() {
  const locale = await getLocale();
  const page = await loadPage(locale);

  if (!page) {
    notFound();
  }

  return (
    <div className="bg-white">
      {page.seo?.schemaOrg ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.seo.schemaOrg }} />
      ) : null}
      <PageBlocks blocks={page.layout ?? []} localePrefix={`/${locale}`} />
    </div>
  );
}
