'use client';

import { useEffect } from 'react';

const SIGNAL_KEY = 'payload-logout-signal';
const ACTIVE_KEY = 'payload-logout-active';

export const LogoutRedirector = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLogoutSignal = () => {
      if (!window.localStorage.getItem(SIGNAL_KEY)) return;
      window.localStorage.removeItem(SIGNAL_KEY);
      window.localStorage.removeItem(ACTIVE_KEY);
      window.location.replace('/admin/login');
    };

    handleLogoutSignal();
    window.addEventListener('storage', handleLogoutSignal);

    return () => {
      window.removeEventListener('storage', handleLogoutSignal);
    };
  }, []);

  return null;
};
