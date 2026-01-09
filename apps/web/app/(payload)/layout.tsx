import type { ReactNode } from 'react';

import '@payloadcms/next/css';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import { importMap } from './admin/importMap.js';
import config from '@/payload.config';

type LayoutProps = {
  children: ReactNode;
};

type ServerFunctionClientArgs = {
  name: string;
  args: Record<string, unknown>;
};

export const dynamic = 'force-dynamic';

export default async function PayloadLayout({ children }: LayoutProps) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  async function serverFunction(args: ServerFunctionClientArgs) {
    'use server';
    return handleServerFunctions({
      ...args,
      config,
      importMap,
    });
  }

  try {
    return RootLayout({
      children,
      config,
      importMap,
      serverFunction,
    });
  } catch (error) {
    console.error('Payload layout fallback during prerender', error);
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
}
