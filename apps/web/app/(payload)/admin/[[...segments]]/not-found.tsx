import { NotFoundPage } from '@payloadcms/next/views';
import { importMap } from '../importMap.js';
import config from '@/payload.config';

type NotFoundProps = {
  params: Promise<{
    segments?: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function AdminNotFound({ params, searchParams }: NotFoundProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const segments = resolvedParams?.segments ?? [];
  return NotFoundPage({
    config,
    importMap,
    params: Promise.resolve({ segments }),
    searchParams: Promise.resolve(resolvedSearchParams ?? {}),
  });
}
