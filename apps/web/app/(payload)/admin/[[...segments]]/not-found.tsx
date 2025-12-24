import { NotFoundPage } from '@payloadcms/next/views';
import { importMap } from '../importMap.js';
import config from '@/payload.config';

type NotFoundProps = {
  params: {
    segments?: string[];
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function AdminNotFound({ params, searchParams }: NotFoundProps) {
  return NotFoundPage({
    config,
    importMap,
    params: Promise.resolve({ segments: params.segments ?? [] }),
    searchParams: Promise.resolve(searchParams ?? {}),
  });
}
