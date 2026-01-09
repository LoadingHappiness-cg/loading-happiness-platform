import { getLocale, getTranslator } from '@/lib/locale';
import { getPayloadClient } from '@/lib/payload';
import TopBar from './TopBar';
import { HeaderBg } from './HeaderBg';
import LocaleSwitcher from './LocaleSwitcher';
import LocalizedLink from './LocalizedLink';
import { PayloadImage } from './PayloadImage';

type HeaderItemDefinition = {
  href: string;
  labelKey?: string;
  descriptionKey?: string;
  icon?: string;
  accentClass?: string;
};

const SERVICE_ITEM_DEFINITIONS: HeaderItemDefinition[] = [
  { href: '/services/managed-it', labelKey: 'services.managedIt.title', descriptionKey: 'services.managedIt.description', icon: '🛠️', accentClass: 'text-primary' },
  { href: '/services/cybersecurity', labelKey: 'services.cybersecurity.title', descriptionKey: 'services.cybersecurity.description', icon: '🛡️', accentClass: 'text-ink' },
  { href: '/services/m365-cloud', labelKey: 'services.cloud.title', descriptionKey: 'services.cloud.description', icon: '☁️', accentClass: 'text-sky-500' },
  { href: '/services/networking', labelKey: 'services.networking.title', descriptionKey: 'services.networking.description', icon: '📡', accentClass: 'text-indigo-500' },
  { href: '/services/backup-continuity', labelKey: 'services.backupContinuity.title', descriptionKey: 'services.backupContinuity.description', icon: '💾', accentClass: 'text-emerald-500' },
  { href: '/services/projects-procurement', labelKey: 'services.projectsProcurement.title', descriptionKey: 'services.projectsProcurement.description', icon: '📑', accentClass: 'text-orange-500' },
  { href: '/services/compliance-gdpr', labelKey: 'services.complianceGdpr.title', descriptionKey: 'services.complianceGdpr.description', icon: '⚖️', accentClass: 'text-amber-500' },
  { href: '/services/custom-software', labelKey: 'services.customSoftware.title', descriptionKey: 'services.customSoftware.description', icon: '🧩', accentClass: 'text-fuchsia-600' },
];

const ABOUT_ITEM_DEFINITIONS: HeaderItemDefinition[] = [
  { href: '/about#our-story', labelKey: 'nav.about.ourStory', descriptionKey: 'nav.about.ourStoryDescription', icon: '📖', accentClass: 'text-primary' },
  { href: '/about#why-name', labelKey: 'nav.about.whyLoadingHappiness', descriptionKey: 'nav.about.whyLoadingHappinessDescription', icon: '✨', accentClass: 'text-indigo-500' },
  { href: '/about#philosophy', labelKey: 'nav.about.philosophy', descriptionKey: 'nav.about.philosophyDescription', icon: '🧭', accentClass: 'text-amber-600' },
  { href: '/about#values', labelKey: 'nav.about.values', descriptionKey: 'nav.about.valuesDescription', icon: '🤝', accentClass: 'text-emerald-500' },
  { href: '/about#different', labelKey: 'nav.about.whatToExpect', descriptionKey: 'nav.about.whatToExpectDescription', icon: '🧠', accentClass: 'text-ink' },
  { href: '/team', labelKey: 'nav.about.team', descriptionKey: 'nav.about.teamDescription', icon: '👥', accentClass: 'text-sky-600' },
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

const normalizeHref = (href: string) => {
  if (!href) return href;
  const withoutPrefix = href.replace(/^\/(pt|en)(?=\/|$)/, '') || '/';
  return withoutPrefix.replace(/\/+$/, '') || '/';
};

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
  const normalizedHref = normalizeHref(item.href);
  const translation = HEADER_ITEM_TRANSLATIONS[normalizedHref];
  return {
    ...item,
    label: translation?.labelKey ? translate(translation.labelKey) : item.label,
    description: translation?.descriptionKey ? translate(translation.descriptionKey) : item.description,
    icon: translation?.icon || item.icon,
    accentClass: translation?.accentClass || item.accentClass,
    href: item.href,
  };
};

const localizeHeaderLink = (link: any, translate: (key: string) => string) => {
  const normalizedHref = normalizeHref(link.href);
  const labelKey = HEADER_LINK_LABEL_KEYS[normalizedHref];
  return {
    ...link,
    label: labelKey ? translate(labelKey) : link.label,
    items: (link.items || []).map((item: any) => localizeHeaderItem(item, translate)),
    href: link.href,
  };
};

const mergeServiceDropdown = (links: any[], translate: (key: string) => string) => {
  const serviceLinkIndex = links.findIndex((link) => normalizeHref(link.href) === '/services');
  if (serviceLinkIndex === -1) return links;
  const link = links[serviceLinkIndex];
  const items = Array.isArray(link.items) ? [...link.items] : [];

  const existingHrefs = new Set(items.map((item: any) => normalizeHref(item.href || '')));
  SERVICE_ITEM_DEFINITIONS.forEach((definition) => {
    const normalized = normalizeHref(definition.href);
    if (existingHrefs.has(normalized)) return;
    items.push({
      href: definition.href,
      label: definition.labelKey ? translate(definition.labelKey) : definition.href,
      description: definition.descriptionKey ? translate(definition.descriptionKey) : undefined,
      icon: definition.icon,
      accentClass: definition.accentClass,
    });
  });

  const merged = [...links];
  merged[serviceLinkIndex] = { ...link, type: 'dropdown', items };
  return merged;
};

const FALLBACK_CTA = { labelKey: 'nav.bookCall', href: '/contact' } as const;

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
  const translateAny = translate as unknown as (key: string) => string;
  const headerLinksRaw = header.links?.length ? header.links : buildFallbackHeaderLinks(translateAny);
  const headerLinks = mergeServiceDropdown(headerLinksRaw, translateAny).map((link: any) => localizeHeaderLink(link, translateAny));
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
              <PayloadImage
                media={header.logo}
                alt={header.logoAlt || 'Loading Happiness'}
                className="site-logo-img h-10 w-auto object-contain"
                sizes="180px"
                fallbackWidth={180}
                fallbackHeight={48}
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
          <div className="hidden md:flex items-center gap-6 text-base font-medium text-gray-600">
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
                              <div className="flex items-start gap-3">
                                {item.icon && (
                                  <span
                                    aria-hidden="true"
                                    className={`mt-0.5 text-xl ${item.accentClass || 'text-primary'}`}
                                  >
                                    {item.icon}
                                  </span>
                                )}
                                <div>
                                  <p className="text-base font-semibold text-gray-900">{item.label}</p>
                                  {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                                </div>
                              </div>
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
