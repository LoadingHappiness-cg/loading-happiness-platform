import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const LOCALES = new Set(['pt', 'en']);
const DEFAULT_LOCALE = 'pt';
const LOCALE_COOKIE = 'lh_locale';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];

  if (!locale || !LOCALES.has(locale)) {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    if (cookieLocale && LOCALES.has(cookieLocale)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = `/${cookieLocale}${pathname === '/' ? '' : pathname}`;
      return NextResponse.redirect(redirectUrl);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', DEFAULT_LOCALE);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const nextUrl = request.nextUrl.clone();
  nextUrl.pathname = `/${segments.slice(1).join('/')}`;
  if (nextUrl.pathname === '/') {
    nextUrl.pathname = '/';
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);

  const response = NextResponse.rewrite(nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 180,
  });
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|admin|auth).*)'],
};
