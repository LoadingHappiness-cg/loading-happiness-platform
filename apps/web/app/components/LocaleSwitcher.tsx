"use client";

import { usePathname, useSearchParams } from 'next/navigation';

const LOCALE_COOKIE = 'lh_locale';
const LOCALES = ['pt', 'en'] as const;

const setLocaleCookie = (locale: string) => {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=15552000; samesite=lax`;
};

const getLocaleFromCookie = () => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|; )lh_locale=([^;]+)/);
  return match?.[1];
};

const getPathWithoutLocale = (pathname: string) => {
  const stripped = pathname.replace(/^\/(pt|en)(?=\/|$)/, '');
  if (!stripped) return '/';
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
};

export default function LocaleSwitcher() {
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const currentLocaleMatch = pathname.match(/^\/(pt|en)(?=\/|$)/);
  const currentLocale = currentLocaleMatch?.[1] || getLocaleFromCookie() || 'pt';
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const querySuffix = searchParams.toString() ? `?${searchParams.toString()}` : '';

  const handleSwitch = (locale: (typeof LOCALES)[number]) => {
    const href = `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}${querySuffix}`;
    setLocaleCookie(locale);
    // Hard navigation to ensure middleware runs and server data reloads in the new locale.
    window.location.assign(href);
  };

  return (
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
      {LOCALES.map((locale, index) => {
        const isActive = currentLocale === locale;
        return (
          <div key={locale} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSwitch(locale)}
              className={isActive ? 'text-ink' : 'text-gray-400 hover:text-ink'}
            >
              {locale.toUpperCase()}
            </button>
            {index === 0 && <span className="text-gray-300">/</span>}
          </div>
        );
      })}
    </div>
  );
}
