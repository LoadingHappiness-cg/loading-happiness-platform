import Link from 'next/link';
import { getLocale, getLocalePrefix, withLocale } from '@/lib/locale';
import { getPayloadClient } from '@/lib/payload';
import TopBar from './TopBar';

const fallbackHeaderLinks = [
  {
    href: '/services',
    label: 'Services',
    type: 'dropdown',
    items: [
      { href: '/services/managed-it', label: 'Managed IT & Helpdesk', description: 'Fast response, proactive maintenance.' },
      { href: '/services/cybersecurity', label: 'Cybersecurity Baseline', description: 'Controls that reduce real risk.' },
      { href: '/services/m365-cloud', label: 'Microsoft 365 & Cloud', description: 'Governance, identity, migrations.' },
      { href: '/services/networking', label: 'Networking & Connectivity', description: 'Wi-Fi, segmentation, VPN, monitoring.' },
      { href: '/services/infrastructure', label: 'Infrastructure & Virtualization', description: 'Storage, backups, recovery testing.' },
      { href: '/services/strategy-roadmaps', label: 'Strategy & Roadmaps', description: '12–24 month practical plan.' },
    ],
  },
  { href: '/news', label: 'News' },
  { href: '/impact', label: 'Impact' },
  {
    href: '/about',
    label: 'About',
    type: 'dropdown',
    items: [
      { href: '/about#company-overview', label: 'Company overview', description: 'Stability, security, long-term clarity.' },
      { href: '/about#philosophy-values', label: 'Philosophy & values', description: 'Human clarity + technical discipline.' },
      { href: '/about#partnership', label: 'Partnership', description: 'What you get and what we need.' },
      { href: '/about#our-approach', label: 'Our approach', description: 'Assess → stabilize → evolve.' },
      { href: '/about#why-choose-us', label: 'Why choose us', description: 'Senior decisions, vendor-neutral.' },
      { href: '/about#our-team', label: 'Our team', description: 'Senior core + trusted network.' },
    ],
  },
  { href: '/contact', label: 'Contact' },
];

export default async function SiteNav() {
  const localePrefix = await getLocalePrefix();
  const locale = await getLocale();
  const payload = await getPayloadClient();
  let settings: any = null;
  try {
    settings = await payload.findGlobal({
      slug: 'site-settings',
      locale,
      depth: 1,
    });
  } catch {
    settings = null;
  }
  const header = settings?.header || {};
  const headerLinks = header.links?.length ? header.links : fallbackHeaderLinks;
  const headerCta = header.cta || { label: 'Book a Call', href: '/contact' };
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <TopBar
        localePrefix={localePrefix}
        enabled={header.topBar?.enabled}
        businessHoursOnly={header.topBar?.businessHoursOnly}
        text={header.topBar?.text}
        linkLabel={header.topBar?.linkLabel}
        linkHref={header.topBar?.linkHref}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={localePrefix} className="flex items-center gap-2 text-ink">
            {header.logo && typeof header.logo !== 'string' ? (
              <img src={header.logo.url} alt={header.logoAlt || 'Loading Happiness'} className="h-8 w-auto" />
            ) : (
              <>
                <span className="w-8 h-8 rounded-lg bg-primaryDark text-surface font-bold grid place-items-center">L</span>
                <span className="text-lg font-bold tracking-tight">Loading Happiness</span>
              </>
            )}
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {headerLinks.map((link: any, linkIndex: number) => {
              if (link.type === 'dropdown' && link.items?.length) {
                return (
                  <div key={`${link.label}-${linkIndex}`} className="relative group">
                    <Link
                      href={withLocale(link.href, localePrefix)}
                      className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                    >
                      {link.label}
                      <span className="text-xs text-gray-400">▾</span>
                    </Link>
                    <div className="pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-200 absolute left-1/2 -translate-x-1/2 mt-3 w-[420px]">
                      <div className="rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-200/40 p-4">
                        <div className="grid gap-3">
                          {link.items.map((item: any, itemIndex: number) => (
                            <Link
                              key={`${item.href}-${itemIndex}`}
                              href={withLocale(item.href, localePrefix)}
                              className="rounded-xl p-3 hover:bg-gray-50 transition-colors"
                            >
                              <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                              {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={`${link.href}-${linkIndex}`} href={withLocale(link.href, localePrefix)} className="hover:text-accent transition-colors">
                  {link.label}
                </Link>
              );
            })}
            {headerCta?.href && headerCta?.label && (
              <Link
                href={withLocale(headerCta.href, localePrefix)}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primaryDark transition-colors"
                data-umami-event="cta-book-call"
              >
                {headerCta.label}
              </Link>
            )}
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
