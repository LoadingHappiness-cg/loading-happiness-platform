import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getPayloadClient } from '@/lib/payload';

const getLocaleFromHeaders = (headerList: Headers) => {
  const locale = headerList.get('x-locale');
  if (locale === 'pt' || locale === 'en') {
    return locale;
  }
  return 'pt';
};

export async function POST(req: Request) {
  const headerList = await headers();
  const contentType = req.headers.get('content-type') || '';
  let email = '';

  if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => ({}));
    email = typeof body?.email === 'string' ? body.email : '';
  } else {
    const formData = await req.formData().catch(() => null);
    email = formData?.get('email')?.toString() || '';
  }

  if (!email) {
    return NextResponse.json({ ok: false, error: 'Email is required.' }, { status: 400 });
  }

  const locale = getLocaleFromHeaders(headerList);
  const referer = headerList.get('referer') || '/';
  const userAgent = headerList.get('user-agent') || '';

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: 'newsletter-signups',
      data: {
        email,
        locale,
        source: referer,
        userAgent,
      },
    });
  } catch {
    if (contentType.includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Unable to save signup.' }, { status: 500 });
    }
    const errorUrl = new URL(referer, 'http://localhost');
    errorUrl.searchParams.set('newsletter', 'error');
    return NextResponse.redirect(errorUrl.toString(), 303);
  }

  if (contentType.includes('application/json')) {
    return NextResponse.json({ ok: true });
  }

  const successUrl = new URL(referer, 'http://localhost');
  successUrl.searchParams.set('newsletter', 'success');
  return NextResponse.redirect(successUrl.toString(), 303);
}
