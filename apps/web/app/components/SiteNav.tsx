import { getLocale } from '@/lib/locale';
import { getPayloadClient } from '@/lib/payload';
import TopBar from './TopBar';
import { HeaderBg } from './HeaderBg';
import LocaleSwitcher from './LocaleSwitcher';
import LocalizedLink from './LocalizedLink';

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
      { href: '/about#our-story', label: 'Our story', description: 'Founded in Sintra, built for real businesses.' },
      { href: '/about#why-loading-happiness', label: 'Why Loading Happiness', description: 'A name that became a promise.' },
      { href: '/about#philosophy', label: 'Our philosophy', description: 'Human, clear, responsible.' },
      { href: '/about#values', label: 'Values', description: 'How we show up in the work.' },
      { href: '/about#what-to-expect', label: 'What to expect', description: 'Clarity, pragmatism, security by default.' },
      { href: '/about#team', label: 'Our team', description: 'Senior, hands-on, close to the ground.' },
    ],
  },
  { href: '/contact', label: 'Contact' },
];

export default async function SiteNav() {
  const locale = await getLocale();
  const payload = await getPayloadClient();
  let settings: any = null;
  try {
    settings = await (payload as any).findGlobal({
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
    <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/5 backdrop-blur-2xl shadow-sm">
      <HeaderBg />
      <TopBar
        enabled={header.topBar?.enabled}
        businessHoursOnly={header.topBar?.businessHoursOnly}
        text={header.topBar?.text}
        linkLabel={header.topBar?.linkLabel}
        linkHref={header.topBar?.linkHref}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <LocalizedLink href="/" className="site-logo flex items-center gap-2 text-ink">
            {header.logo && typeof header.logo !== 'string' ? (
              <img
                src={header.logo.url}
                alt={header.logoAlt || 'Loading Happiness'}
                className="site-logo-img h-10 w-auto"
              />
            ) : (
              <>
                <span className="site-logo-mark w-10 h-10 rounded-lg bg-primaryDark text-surface font-bold grid place-items-center">
                  L
                </span>
                <span className="text-lg font-bold tracking-tight">Loading Happiness</span>
              </>
            )}
          </LocalizedLink>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {headerLinks.map((link: any, linkIndex: number) => {
              if (link.type === 'dropdown' && link.items?.length) {
                return (
                  <div key={`${link.label}-${linkIndex}`} className="relative group">
                    <LocalizedLink
                      href={link.href}
                      className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                    >
                      {link.label}
                      <span className="text-xs text-gray-400">▾</span>
                    </LocalizedLink>
                    <div className="pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-200 absolute left-1/2 -translate-x-1/2 pt-3 w-[420px]">
                      <div className="rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-200/40 p-4">
                        <div className="grid gap-3">
                          {link.items.map((item: any, itemIndex: number) => (
                            <LocalizedLink
                              key={`${item.href}-${itemIndex}`}
                              href={item.href}
                              className="rounded-xl p-3 hover:bg-gray-50 transition-colors"
                            >
                              <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                              {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                            </LocalizedLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <LocalizedLink key={`${link.href}-${linkIndex}`} href={link.href} className="hover:text-accent transition-colors">
                  {link.label}
                </LocalizedLink>
              );
            })}
            {headerCta?.href && headerCta?.label && (
              <LocalizedLink
                href={headerCta.href}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primaryDark transition-colors"
                data-umami-event="cta-book-call"
              >
                {headerCta.label}
              </LocalizedLink>
            )}
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
