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
  const [resolvedParams, resolvedSearch] = await Promise.all([params, searchParams]);
  const cleanedParams = { segments: resolvedParams?.segments ?? [] };
  const cleanedSearch = Object.fromEntries(
    Object.entries(resolvedSearch || {}).filter(([, value]) => value !== undefined),
  ) as Record<string, string | string[]>;

  return generatePageMetadata({
    config,
    params: Promise.resolve(cleanedParams),
    searchParams: Promise.resolve(cleanedSearch),
  });
}

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams: PageSearchParams;
}) {
  const [resolvedParams, resolvedSearch] = await Promise.all([params, searchParams]);
  const cleanedParams = { segments: resolvedParams?.segments ?? [] };
  const cleanedSearch = Object.fromEntries(
    Object.entries(resolvedSearch || {}).filter(([, value]) => value !== undefined),
  ) as Record<string, string | string[]>;

  if (!cleanedParams.segments.length) {
    redirect('/admin/collections/pages');
  }

  return RootPage({
    config,
    importMap,
    params: Promise.resolve(cleanedParams),
    searchParams: Promise.resolve(cleanedSearch),
  });
}
