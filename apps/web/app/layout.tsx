import type { ReactNode } from 'react';

import '@payloadcms/next/css';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import { importMap } from './(payload)/admin/importMap.js';
import config from '@/payload.config';

type LayoutProps = {
  children: ReactNode;
};

type ServerFunctionClientArgs = {
  name: string;
  args: Record<string, unknown>;
};

export default async function AppLayout({ children }: LayoutProps) {
  async function serverFunction(args: ServerFunctionClientArgs) {
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
