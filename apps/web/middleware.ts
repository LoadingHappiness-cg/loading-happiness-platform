import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MEDIA_HOST = 'media.loadinghappiness.com';
const ONE_YEAR = 'public, max-age=31536000, immutable';
const NO_STORE = 'no-store';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get('host') || '';
  const res = NextResponse.next();

  if (host === MEDIA_HOST && (pathname.startsWith('/media/') || pathname.startsWith('/uploads/'))) {
    res.headers.set('Cache-Control', ONE_YEAR);
    return res;
  }

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/payload') ||
    pathname.startsWith('/preview')
  ) {
    res.headers.set('Cache-Control', NO_STORE);
    return res;
  }

  return res;
}

export const config = {
  matcher: ['/media/:path*', '/uploads/:path*', '/admin/:path*', '/api/:path*', '/payload/:path*', '/preview/:path*'],
};
