import Link from 'next/link';
import { getLocalePrefix, withLocale } from '@/lib/locale';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/news', label: 'News' },
  { href: '/impact', label: 'Impact' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default async function SiteNav() {
  const localePrefix = await getLocalePrefix();
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={localePrefix} className="flex items-center gap-2 text-ink">
            <span className="w-8 h-8 rounded-lg bg-primaryDark text-surface font-bold grid place-items-center">L</span>
            <span className="text-lg font-bold tracking-tight">Loading Happiness</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {links.map((link) => (
              <Link key={link.href} href={withLocale(link.href, localePrefix)} className="hover:text-accent transition-colors">
                {link.label}
              </Link>
            ))}
            <Link
              href={withLocale('/contact', localePrefix)}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primaryDark transition-colors"
            >
              Book a Call
            </Link>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <Link href="/pt" className="text-gray-400 hover:text-ink">PT</Link>
              <span className="text-gray-300">/</span>
              <Link href="/en" className="text-gray-400 hover:text-ink">EN</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
