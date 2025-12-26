import { notFound } from 'next/navigation';
import { getPayloadClient } from '@/lib/payload';
import PageBlocks from '../../../components/PageBlocks';
import { getLocale } from '@/lib/locale';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const locale = await getLocale();
  const localePrefix = `/${locale}`;
  const pageResult = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: `services/${slug}` } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 1,
    locale,
  });

  const page = pageResult.docs[0];
  if (!page) {
    notFound();
  }

  const blocks = page.serviceTemplate
    ? buildTemplateBlocks(page, page.layout)
    : page.layout;

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
