import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPayloadClient } from '@/lib/payload';
import PageBlocks from '../../../components/PageBlocks';
import { getLocale } from '@/lib/locale';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const buildMetadata = (page: any, locale: string, slug: string): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.com';
  const canonical = page?.seo?.canonicalUrl || `${baseUrl}/${locale}/services/${slug}`;
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

const loadPage = async (slug: string, locale: string, payload?: any) => {
  const client = payload || (await getPayloadClient());
  const result = await client.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: `services/${slug}` } },
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const page = await loadPage(slug, locale);
  if (!page) return {};
  return buildMetadata(page, locale, slug);
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const locale = await getLocale();
  const localePrefix = `/${locale}`;
  const page = await loadPage(slug, locale, payload);
  if (!page) {
    notFound();
  }

  const hasCustomLayout = Array.isArray(page.layout) && page.layout.length > 0;
  const blocks = hasCustomLayout
    ? page.layout ?? []
    : page.serviceTemplate
      ? buildTemplateBlocks(page, page.layout ?? [])
      : page.layout ?? [];

  return <PageBlocks blocks={blocks} localePrefix={localePrefix} />;
}

const buildTemplateBlocks = (page: any, fallbackLayout: any[] = []) => {
  const data = page.serviceTemplateData || {};
  const blocks: any[] = [];
  const template = page.serviceTemplate;

  if (data.hero) {
    blocks.push({
      blockType: 'hero',
      sectionId: 'intro',
      heading: data.hero.heading,
      subheading: data.hero.subheading,
      primaryCTA: data.hero.primaryCTA,
      secondaryCTA: data.hero.secondaryCTA,
      badges: data.hero.badges,
      image: data.hero.image,
      template,
    });
  }

  if (data.whoItsFor?.items?.length) {
    blocks.push({
      blockType: 'bullets',
      sectionId: 'who-its-for',
      title: data.whoItsFor.title,
      intro: data.whoItsFor.intro,
      items: data.whoItsFor.items,
      template,
    });
  }

  if (data.deliverables?.items?.length) {
    blocks.push({
      blockType: 'deliverables',
      sectionId: 'deliverables',
      title: data.deliverables.title,
      intro: data.deliverables.intro,
      items: data.deliverables.items,
      template,
    });
  }

  if (template === 'cybersecurity' && data.checklist?.items?.length) {
    blocks.push({
      blockType: 'checklist',
      title: data.checklist.title,
      items: data.checklist.items,
      template,
    });
  }

  if (template === 'm365-cloud' && data.stats?.items?.length) {
    blocks.push({
      blockType: 'stats',
      title: data.stats.title,
      intro: data.stats.intro,
      items: data.stats.items,
      template,
    });
  }

  if (data.outcomes?.items?.length) {
    blocks.push({
      blockType: 'outcomesCards',
      sectionId: 'outcomes',
      title: data.outcomes.title,
      intro: data.outcomes.intro,
      cards: data.outcomes.items,
      template,
    });
  }

  if (data.steps?.items?.length) {
    blocks.push({
      blockType: 'steps',
      sectionId: 'onboarding',
      title: data.steps.title,
      intro: data.steps.intro,
      steps: data.steps.items,
      template,
    });
  }

  if (data.cta?.title) {
    blocks.push({
      blockType: 'finalCTA',
      sectionId: 'cta',
      title: data.cta.title,
      content: data.cta.content,
      primaryCTA: data.cta.primaryCTA,
      secondaryCTA: data.cta.secondaryCTA,
      template,
    });
  }

  return blocks.length ? blocks : fallbackLayout;
};
