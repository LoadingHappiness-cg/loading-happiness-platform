import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getPayloadClient } from '@/lib/payload';

const base64UrlEncode = (value: Buffer) =>
  value
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

export const GET = async (request: Request) => {
  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({ slug: 'auth-settings', depth: 0 });
  const entra = settings?.entra;

  if (!entra?.enabled || !entra?.tenantId || !entra?.clientId) {
    return new NextResponse('Entra ID OAuth is not configured.', { status: 404 });
  }

  const url = new URL(request.url);
  const redirectUri = entra.redirectUri || `${url.origin}/auth/entra/callback`;
  const state = base64UrlEncode(crypto.randomBytes(32));
  const verifier = base64UrlEncode(crypto.randomBytes(32));
  const challenge = base64UrlEncode(crypto.createHash('sha256').update(verifier).digest());

  const authorizeUrl = new URL(
    `https://login.microsoftonline.com/${entra.tenantId}/oauth2/v2.0/authorize`,
  );
  authorizeUrl.searchParams.set('client_id', entra.clientId);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('response_mode', 'query');
  authorizeUrl.searchParams.set('scope', 'openid profile email');
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('state', state);
  authorizeUrl.searchParams.set('code_challenge', challenge);
  authorizeUrl.searchParams.set('code_challenge_method', 'S256');

  const response = NextResponse.redirect(authorizeUrl.toString());
  response.cookies.set('entra_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: url.protocol === 'https:',
    maxAge: 60 * 10,
    path: '/',
  });
  response.cookies.set('entra_oauth_verifier', verifier, {
    httpOnly: true,
    sameSite: 'lax',
    secure: url.protocol === 'https:',
    maxAge: 60 * 10,
    path: '/',
  });
  return response;
};
