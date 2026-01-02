import { cookies, headers } from 'next/headers';
import { t as translateFn, createTranslator, type Locale, type TranslationKey } from './translations';

const SUPPORTED = new Set(['pt', 'en']);
const LOCALE_COOKIE = 'lh_locale';

export const getLocale = async (): Promise<Locale> => {
  const headerList = await headers();
  const headerLocale = headerList.get('x-locale');
  if (headerLocale && SUPPORTED.has(headerLocale)) {
    return headerLocale as Locale;
  }
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && SUPPORTED.has(cookieLocale)) {
    return cookieLocale as Locale;
  }
  return 'pt';
};

export const getLocalePrefix = async () => `/${await getLocale()}`;

export { withLocale } from './locale-utils';


/**
 * Get a translation for the current locale (server-side)
 * Usage: const text = await t('common.loading');
 */
export const t = async (key: TranslationKey, params?: Record<string, string | number>): Promise<string> => {
  const locale = await getLocale();
  return translateFn(key, locale, params);
};

/**
 * Create a translator function for the current locale (server-side)
 * Usage: const translate = await getTranslator(); const text = translate('common.loading');
 */
export const getTranslator = async () => {
  const locale = await getLocale();
  return createTranslator(locale);
};

// Re-export types for convenience
export type { Locale, TranslationKey };
