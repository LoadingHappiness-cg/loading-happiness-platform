import { getLocale, getTranslator } from '@/lib/locale';
import { getPayloadClient } from '@/lib/payload';
import TopBar from './TopBar';
import { HeaderBg } from './HeaderBg';
import LocaleSwitcher from './LocaleSwitcher';
import LocalizedLink from './LocalizedLink';

type HeaderItemDefinition = {
  href: string;
  labelKey?: string;
  descriptionKey?: string;
};

const SERVICE_ITEM_DEFINITIONS: HeaderItemDefinition[] = [
  { href: '/services/managed-it', labelKey: 'services.managedIt.title', descriptionKey: 'services.managedIt.description' },
  { href: '/services/cybersecurity', labelKey: 'services.cybersecurity.title', descriptionKey: 'services.cybersecurity.description' },
  { href: '/services/m365-cloud', labelKey: 'services.cloud.title', descriptionKey: 'services.cloud.description' },
  { href: '/services/networking', labelKey: 'services.networking.title', descriptionKey: 'services.networking.description' },
  { href: '/services/infrastructure', labelKey: 'services.infrastructure.title', descriptionKey: 'services.infrastructure.description' },
  { href: '/services/strategy-roadmaps', labelKey: 'services.strategyRoadmaps.title', descriptionKey: 'services.strategyRoadmaps.description' },
];

const ABOUT_ITEM_DEFINITIONS: HeaderItemDefinition[] = [
  { href: '/about#our-story', labelKey: 'nav.about.ourStory', descriptionKey: 'nav.about.ourStoryDescription' },
  { href: '/about#why-name', labelKey: 'nav.about.whyLoadingHappiness', descriptionKey: 'nav.about.whyLoadingHappinessDescription' },
  { href: '/about#philosophy', labelKey: 'nav.about.philosophy', descriptionKey: 'nav.about.philosophyDescription' },
  { href: '/about#values', labelKey: 'nav.about.values', descriptionKey: 'nav.about.valuesDescription' },
  { href: '/about#different', labelKey: 'nav.about.whatToExpect', descriptionKey: 'nav.about.whatToExpectDescription' },
  { href: '/team', labelKey: 'nav.about.team', descriptionKey: 'nav.about.teamDescription' },
];

const HEADER_LINK_LABEL_KEYS: Record<string, string> = {
  '/services': 'nav.services',
  '/news': 'nav.news',
  '/impact': 'nav.impact',
  '/about': 'nav.about',
  '/contact': 'nav.contact',
};

const HEADER_ITEM_TRANSLATIONS: Record<string, HeaderItemDefinition> = [...SERVICE_ITEM_DEFINITIONS, ...ABOUT_ITEM_DEFINITIONS].reduce(
  (acc, definition) => {
    acc[definition.href] = definition;
    return acc;
  },
  {} as Record<string, HeaderItemDefinition>,
);

const buildFallbackHeaderLinks = (translate: (key: string) => string) => [
  {
    href: '/services',
    label: translate('nav.services'),
    type: 'dropdown',
    items: SERVICE_ITEM_DEFINITIONS.map((item) => ({
      href: item.href,
      label: item.labelKey ? translate(item.labelKey) : undefined,
      description: item.descriptionKey ? translate(item.descriptionKey) : undefined,
    })),
  },
  { href: '/news', label: translate('nav.news'), type: 'link', items: [] },
  { href: '/impact', label: translate('nav.impact'), type: 'link', items: [] },
  {
    href: '/about',
    label: translate('nav.about'),
    type: 'dropdown',
    items: ABOUT_ITEM_DEFINITIONS.map((item) => ({
      href: item.href,
      label: item.labelKey ? translate(item.labelKey) : undefined,
      description: item.descriptionKey ? translate(item.descriptionKey) : undefined,
    })),
  },
  { href: '/contact', label: translate('nav.contact'), type: 'link', items: [] },
];

const localizeHeaderItem = (item: any, translate: (key: string) => string) => {
  const translation = HEADER_ITEM_TRANSLATIONS[item.href];
  return {
    ...item,
    label: translation?.labelKey ? translate(translation.labelKey) : item.label,
    description: translation?.descriptionKey ? translate(translation.descriptionKey) : item.description,
  };
};

const localizeHeaderLink = (link: any, translate: (key: string) => string) => {
  const labelKey = HEADER_LINK_LABEL_KEYS[link.href];
  return {
    ...link,
    label: labelKey ? translate(labelKey) : link.label,
    items: (link.items || []).map((item: any) => localizeHeaderItem(item, translate)),
  };
};

const FALLBACK_CTA = { labelKey: 'nav.bookCall', href: '/contact' };

export default async function SiteNav() {
  const locale = await getLocale();
  const translate = await getTranslator();
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
  const headerLinksRaw = header.links?.length ? header.links : buildFallbackHeaderLinks(translate);
  const headerLinks = headerLinksRaw.map((link: any) => localizeHeaderLink(link, translate));
  const headerCta = header.cta || {
    label: translate(FALLBACK_CTA.labelKey),
    href: FALLBACK_CTA.href,
  };
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
