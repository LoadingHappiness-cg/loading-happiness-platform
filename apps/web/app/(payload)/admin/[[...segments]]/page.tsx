import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import { importMap } from '../importMap.js';
import config from '@/payload.config';

type PageProps = {
  params: Promise<{
    segments?: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata({ params }: { params: PageProps['params'] }) {
  const resolvedParams = await params;
  const cleanedSearchParams: Record<string, string | string[]> = {};
  return generatePageMetadata({
    config,
    params: Promise.resolve({ segments: resolvedParams?.segments ?? [] }),
    searchParams: Promise.resolve(cleanedSearchParams),
  });
}

export default async function AdminPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const cleanedSearchParams = Object.fromEntries(
    Object.entries(resolvedSearchParams ?? {}).filter(([, value]) => value !== undefined),
  ) as Record<string, string | string[]>;
  return RootPage({
    config,
    importMap,
    params: Promise.resolve({ segments: resolvedParams?.segments ?? [] }),
    searchParams: Promise.resolve(cleanedSearchParams),
  });
}
