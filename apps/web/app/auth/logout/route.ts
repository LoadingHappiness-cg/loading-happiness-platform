import { NextResponse } from 'next/server';

// Custom logout handler to clear Payload auth cookies and invalidate the session.
export const GET = async (request: Request) => {
  const url = new URL(request.url);

  // Best-effort call to Payload's REST logout endpoint so server-side session is cleared.
  try {
    await fetch(`${url.origin}/api/users/logout`, {
      method: 'POST',
      headers: {
        cookie: request.headers.get('cookie') ?? '',
      },
    }).catch(() => {});
  } catch {
    // Ignore errors; we'll still clear cookies below.
  }

  const secure = url.protocol === 'https:';
  const response = NextResponse.redirect(`${url.origin}/admin/login`);

  const cookieOptions = {
    httpOnly: true as const,
    sameSite: 'lax' as const,
    secure,
    maxAge: 0,
    path: '/',
  };

  response.cookies.set('payload-token', '', cookieOptions);
  response.cookies.set('payload-auth', '', cookieOptions);

  return response;
};

// Allow POST as well (e.g., fetch).
export const POST = GET;
