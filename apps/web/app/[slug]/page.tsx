import { notFound } from 'next/navigation';
import { getPayloadClient } from '@/lib/payload';
import PageBlocks from '../components/PageBlocks';
import { getLocale, getLocalePrefix } from '@/lib/locale';

interface PageProps {
  params: { slug: string };
}

export default async function PayloadPage({ params }: PageProps) {
  const payload = await getPayloadClient();
  const locale = getLocale();
  const localePrefix = getLocalePrefix();
  const pageResult = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: params.slug } },
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

  return <PageBlocks blocks={page.layout} localePrefix={localePrefix} />;
}
