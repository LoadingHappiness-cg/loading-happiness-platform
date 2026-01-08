import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import { importMap } from '../importMap.js';
import config from '@/payload.config';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PageParams = Promise<{ segments?: string[] }>;
type PageSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams: PageSearchParams;
}) {
  const cleanedSearchParams = searchParams.then(resolvedSearch => {
    if (!resolvedSearch) return {};
    return Object.fromEntries(
      Object.entries(resolvedSearch).filter(([, value]) => value !== undefined),
    );
  });

  return generatePageMetadata({
    config,
    params,
    searchParams: cleanedSearchParams,
  });
}

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams: PageSearchParams;
}) {
  const resolvedParams = await params;

  if (!resolvedParams?.segments?.length) {
    redirect('/admin/collections/pages');
  }

  const cleanedSearchParams = searchParams.then(resolvedSearch => {
    if (!resolvedSearch) return {};
    return Object.fromEntries(
      Object.entries(resolvedSearch).filter(([, value]) => value !== undefined),
    );
  });

  return RootPage({
    config,
    importMap,
    params,
    searchParams: cleanedSearchParams,
  });
}
