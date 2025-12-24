import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import { importMap } from '../importMap.js';
import config from '@/payload.config';

type PageProps = {
  params: {
    segments?: string[];
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export async function generateMetadata({ params }: PageProps) {
  return generatePageMetadata({
    config,
    params: Promise.resolve({ segments: params.segments ?? [] }),
  });
}

export default async function AdminPage({ params, searchParams }: PageProps) {
  return RootPage({
    config,
    importMap,
    params: Promise.resolve({ segments: params.segments ?? [] }),
    searchParams: Promise.resolve(searchParams ?? {}),
  });
}
