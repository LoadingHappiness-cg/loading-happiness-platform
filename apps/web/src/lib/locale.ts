import { headers } from 'next/headers';

const SUPPORTED = new Set(['pt', 'en']);

export const getLocale = async () => {
  const headerList = await headers();
  const headerLocale = headerList.get('x-locale');
  if (headerLocale && SUPPORTED.has(headerLocale)) {
    return headerLocale;
  }
  return 'pt';
};

export const getLocalePrefix = async () => `/${await getLocale()}`;

export const withLocale = (href: string, prefix = '/pt') => {
  if (!href.startsWith('/')) {
    return href;
  }
  if (href.startsWith('/pt') || href.startsWith('/en')) {
    return href;
  }
  return `${prefix}${href}`;
};
