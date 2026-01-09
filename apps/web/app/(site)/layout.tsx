import '../globals.css';
import type { ReactNode } from 'react';
import { Manrope, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';
import MediaModal from '../components/MediaModal';
import AnalyticsScripts from '../components/AnalyticsScripts';
import { getLocalePrefix, withLocale } from '@/lib/locale';
import { getPayloadClient } from '@/lib/payload';

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const dynamic = 'force-dynamic';

type LayoutProps = {
  children: ReactNode;
};

export async function generateMetadata() {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return {
      title: 'Loading Happiness',
      description: 'Loading Happiness Platform',
    };
  }

  try {
    const payload = (await getPayloadClient()) as any;
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    });
    const favicon = settings?.header?.favicon;
    if (favicon && typeof favicon !== 'string' && favicon.url) {
      return {
        title: 'Loading Happiness',
        description: 'Loading Happiness Platform',
        icons: {
          icon: favicon.url,
        },
      };
    }
  } catch {
    // Fallback to default metadata.
  }

  return {
    title: 'Loading Happiness',
    description: 'Loading Happiness Platform',
  };
}

export default async function SiteLayout({ children }: LayoutProps) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return (
      <div
        className={`site-root ${bodyFont.variable} ${displayFont.variable} min-h-screen bg-white text-gray-900 antialiased`}
      >
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  let localePrefix = '/en';
  let canRenderFullLayout = true;
  try {
    localePrefix = await getLocalePrefix();
  } catch {
    canRenderFullLayout = false;
  }

  if (!canRenderFullLayout) {
    return (
      <div
        className={`site-root ${bodyFont.variable} ${displayFont.variable} min-h-screen bg-white text-gray-900 antialiased`}
      >
        <main className="flex-1">{children}</main>
      </div>
    );
  }
  return (
    <div
      className={`site-root ${bodyFont.variable} ${displayFont.variable} min-h-screen bg-white text-gray-900 antialiased`}
    >
      <div className="min-h-screen flex flex-col">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MediaModal />
        <AnalyticsScripts />
        <Link
          href={withLocale('/contact', localePrefix)}
          className="md:hidden fixed bottom-6 right-6 z-40 px-5 py-3 rounded-full bg-primary text-white font-bold shadow-2xl shadow-primary/30"
        >
          Call / Message
        </Link>
      </div>
    </div>
  );
}
