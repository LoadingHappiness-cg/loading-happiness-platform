import type { ReactNode } from 'react';

import { RootLayout, handleServerFunctions, metadata } from '@payloadcms/next/layouts';
import { importMap } from './admin/importMap.js';
import config from '@/payload.config';

export { metadata };

type LayoutProps = {
  children: ReactNode;
};

export default async function PayloadLayout({ children }: LayoutProps) {
  async function serverFunction(args: Parameters<typeof handleServerFunctions>[0]) {
    'use server';
    return handleServerFunctions({
      ...args,
      config,
      importMap,
    });
  }

  return RootLayout({
    children,
    config,
    importMap,
    serverFunction,
  });
}
