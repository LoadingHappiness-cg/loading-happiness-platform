'use client';

import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') {
        // Notify other tabs about the logout event.
        window.localStorage.setItem('payload-logout-active', '1');
        window.localStorage.setItem('payload-logout-signal', Date.now().toString());
      }

      // Hit our custom logout route, which clears the HttpOnly auth cookies and
      // proxies to Payload's auth logout.
      await fetch('/auth/logout', { method: 'GET', credentials: 'include' }).catch((e) => {
        console.warn('Custom logout request failed, falling back.', e);
      });

      // Final redirect to the login page. If the cookie is gone, you stay logged out.
      window.location.replace('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/auth/logout';
    }
  };

  return (
    <button
      className="btn btn--style-secondary btn--size-small"
      type="button"
      onClick={handleLogout}
    >
      Sair
    </button>
  );
};
