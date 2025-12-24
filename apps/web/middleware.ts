import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const url = new URL(request.url);
  const headers = new Headers(request.headers);
  const match = url.pathname.match(/^\/(pt|en)(\/|$)/);

  if (match) {
    const locale = match[1];
    headers.set('x-locale', locale);
    const strippedPath = url.pathname.replace(/^\/(pt|en)(?=\/|$)/, '') || '/';
    const rewriteUrl = new URL(strippedPath + url.search, url.origin);
    return NextResponse.rewrite(rewriteUrl, { request: { headers } });
  }

  headers.set('x-locale', 'pt');
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
