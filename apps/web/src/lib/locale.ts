import { headers } from 'next/headers';

const SUPPORTED = new Set(['pt', 'en']);

export const getLocale = () => {
  const headerLocale = headers().get('x-locale');
  if (headerLocale && SUPPORTED.has(headerLocale)) {
    return headerLocale;
  }
  return 'pt';
};

export const getLocalePrefix = () => `/${getLocale()}`;

export const withLocale = (href: string, prefix?: string) => {
  if (!href.startsWith('/')) {
    return href;
  }
  if (href.startsWith('/pt') || href.startsWith('/en')) {
    return href;
  }
  const localePrefix = prefix ?? getLocalePrefix();
  return `${localePrefix}${href}`;
};
