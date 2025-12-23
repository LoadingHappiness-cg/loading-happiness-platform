import Link from 'next/link';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/news', label: 'News' },
  { href: '/impact', label: 'Impact' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-gray-900">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold grid place-items-center">L</span>
            <span className="text-lg font-bold tracking-tight">Loading Happiness</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-blue-600 transition-colors">
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
