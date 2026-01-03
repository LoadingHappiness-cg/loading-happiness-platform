"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const currentLocaleMatch = pathname.match(/^\/(pt|en)(?=\/|$)/);
  const currentLocale = currentLocaleMatch?.[1] || getLocaleFromCookie() || 'pt';
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const querySuffix = '';

  return (
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
      {LOCALES.map((locale, index) => {
        const href = `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}${querySuffix}`;
        const isActive = currentLocale === locale;
        return (
          <div key={locale} className="flex items-center gap-2">
            <Link
              href={href}
              className={isActive ? 'text-ink' : 'text-gray-400 hover:text-ink'}
              onClick={() => setLocaleCookie(locale)}
            >
              {locale.toUpperCase()}
            </Link>
            {index === 0 && <span className="text-gray-300">/</span>}
          </div>
        );
      })}
    </div>
  );
}
