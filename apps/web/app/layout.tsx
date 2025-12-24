import type { ReactNode } from 'react';

import './globals.css';
import '@payloadcms/next/css';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import { importMap } from './(payload)/admin/importMap.js';
import config from '@/payload.config';

type LayoutProps = {
  children: ReactNode;
};

export default async function AppLayout({ children }: LayoutProps) {
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
