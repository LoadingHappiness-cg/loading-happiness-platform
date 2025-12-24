import type { ReactNode } from 'react';
import { Manrope, Space_Grotesk } from 'next/font/google';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';

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

export const metadata = {
  title: 'Loading Happiness',
  description: 'Loading Happiness Platform',
};

type LayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({ children }: LayoutProps) {
  return (
    <div
      className={`site-root ${bodyFont.variable} ${displayFont.variable} min-h-screen bg-white text-gray-900 antialiased`}
    >
      <div className="min-h-screen flex flex-col">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
