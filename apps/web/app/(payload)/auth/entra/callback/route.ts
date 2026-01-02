import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getPayload, getFieldsToSign, jwtSign, createPayloadRequest } from 'payload';
import { addSessionToUser, generatePayloadCookie } from 'payload/shared';
import type { Config } from '@/payload-types';

const decodeJwtPayload = (token: string) => {
  const [, payload] = token.split('.');
  if (!payload) return null;
  const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  try {
    return JSON.parse(Buffer.from(padded, 'base64').toString('utf8'));
  } catch {
    return null;
  }
};

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieState = request.headers
    .get('cookie')
    ?.split('; ')
    .find((entry) => entry.startsWith('entra_oauth_state='))
    ?.split('=')[1];
  const cookieVerifier = request.headers
    .get('cookie')
    ?.split('; ')
    .find((entry) => entry.startsWith('entra_oauth_verifier='))
    ?.split('=')[1];

  if (!code || !state || !cookieState || state !== cookieState || !cookieVerifier) {
    return new NextResponse('Invalid OAuth state.', { status: 400 });
  }

  const configPromise = (await import('@/payload.config')).default;
  const config = await configPromise;
  const req = await createPayloadRequest({
    canSetHeaders: true,
    config,
    request,
  });
  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({ slug: 'auth-settings', depth: 0 });
  const entra = settings?.entra;

  if (!entra?.enabled || !entra?.tenantId || !entra?.clientId) {
    return new NextResponse('Entra ID OAuth is not configured.', { status: 404 });
  }

  const redirectUri = entra.redirectUri || `${url.origin}/auth/entra/callback`;
  const tokenUrl = `https://login.microsoftonline.com/${entra.tenantId}/oauth2/v2.0/token`;

  const body = new URLSearchParams();
  body.set('client_id', entra.clientId);
  body.set('grant_type', 'authorization_code');
  body.set('code', code);
  body.set('redirect_uri', redirectUri);
  body.set('code_verifier', cookieVerifier);
  if (entra.clientSecret) {
    body.set('client_secret', entra.clientSecret);
  }

  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!tokenResponse.ok) {
    return new NextResponse('Failed to exchange OAuth code.', { status: 401 });
  }

  const tokenData = await tokenResponse.json();
  const idToken = tokenData.id_token as string | undefined;
  const idPayload = idToken ? decodeJwtPayload(idToken) : null;
  const email =
    idPayload?.email ||
    idPayload?.preferred_username ||
    idPayload?.upn ||
    idPayload?.unique_name;

  if (!email) {
    return new NextResponse('No email found in Entra token.', { status: 401 });
  }

  if (entra.allowedGroupId) {
    const groups = Array.isArray(idPayload?.groups) ? idPayload.groups : [];
    if (!groups.includes(entra.allowedGroupId)) {
      return new NextResponse('Not allowed to access admin.', { status: 403 });
    }
  }

  const userCollectionSlug = payload.config.admin.user as 'users';
  const usersCollection = payload.collections[userCollectionSlug];
  const existing = await payload.find({
    collection: usersCollection.config.slug,
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  });

  let user = existing.docs[0];
  if (!user) {
    const password = crypto.randomBytes(24).toString('base64url');
    user = await payload.create({
      collection: usersCollection.config.slug,
      data: {
        email,
        password,
        entraId: idPayload?.oid || null,
      },
      overrideAccess: true,
    });
  }

  const userWithCollection = {
    ...user,
    collection: userCollectionSlug,
  } as Config['user'];

  const { sid } = await addSessionToUser({
    collectionConfig: usersCollection.config,
    payload,
    req,
    user: userWithCollection,
  });

  const fieldsToSign = getFieldsToSign({
    collectionConfig: usersCollection.config,
    email,
    sid,
    user: userWithCollection,
  });

  const { token } = await jwtSign({
    fieldsToSign,
    secret: payload.secret,
    tokenExpiration: usersCollection.config.auth.tokenExpiration,
  });

  const cookie = generatePayloadCookie({
    collectionAuthConfig: usersCollection.config.auth,
    cookiePrefix: payload.config.cookiePrefix,
    token,
  });

  const response = NextResponse.redirect(`${url.origin}/admin`);
  response.headers.set('Set-Cookie', cookie);
  response.cookies.set('entra_oauth_state', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: url.protocol === 'https:',
    expires: new Date(0),
    path: '/',
  });
  response.cookies.set('entra_oauth_verifier', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: url.protocol === 'https:',
    expires: new Date(0),
    path: '/',
  });
  return response;
};
