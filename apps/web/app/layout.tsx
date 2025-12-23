import type { ReactNode } from 'react';
import SiteFooter from './components/SiteFooter';
import SiteNav from './components/SiteNav';
import './globals.css';

export const metadata = {
  title: 'Loading Happiness',
  description: 'Loading Happiness Platform',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
