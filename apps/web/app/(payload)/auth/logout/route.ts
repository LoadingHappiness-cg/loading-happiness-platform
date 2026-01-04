import { NextResponse } from 'next/server';

// Custom logout handler to reliably clear Payload auth cookies and invalidate the session.
export const GET = async (request: Request) => {
  const url = new URL(request.url);

  // Best-effort call to Payload's REST auth logout endpoint so any server-side
  // session tracking is also cleaned up.
  try {
    await fetch(`${url.origin}/api/users/logout`, {
      method: 'POST',
      headers: {
        // Forward cookies so Payload can identify the current session.
        cookie: request.headers.get('cookie') ?? '',
      },
    }).catch(() => {});
  } catch {
    // Swallow errors; we'll still clear cookies below.
  }

  const secure = url.protocol === 'https:';

  const response = NextResponse.redirect(`${url.origin}/admin/login`);

  // Clear known Payload auth cookies. Even though we can't read HttpOnly cookies
  // on the client, we can clear them from the server by setting them again with
  // Max-Age=0.
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

// Allow POST as well, in case we want to call this via fetch.
export const POST = GET;
