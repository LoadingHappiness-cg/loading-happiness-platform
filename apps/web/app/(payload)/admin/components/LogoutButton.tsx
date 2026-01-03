'use client';

import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('payload-logout-signal', Date.now().toString());
        ['payload-auth', 'payload-token'].forEach((cookie) => {
          document.cookie = `${cookie}=; Max-Age=0; Path=/;`;
        });
      }
      window.location.href = '/admin/logout';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/admin/logout';
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
