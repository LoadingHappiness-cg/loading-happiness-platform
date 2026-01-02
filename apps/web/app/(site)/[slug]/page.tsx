import { notFound } from 'next/navigation';
import { getPayloadClient } from '@/lib/payload';
import PageBlocks from '../../components/PageBlocks';
import { getLocale } from '@/lib/locale';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PayloadPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const locale = await getLocale();
  const localePrefix = `/${locale}`;
  const pageResult = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: slug } },
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

  return <PageBlocks blocks={page.layout ?? []} localePrefix={localePrefix} />;
}
