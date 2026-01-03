'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const TOKEN_KEYS = ['payload-auth', 'payload-token'];

const hasToken = () =>
  typeof window !== 'undefined' && TOKEN_KEYS.some((key) => Boolean(window.localStorage.getItem(key)));

export const LoginPrompt = () => {
  const [loggedIn, setLoggedIn] = useState(() => hasToken());

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handleStorage = () => {
      setLoggedIn(hasToken());
    };
    window.addEventListener('storage', handleStorage);
    const interval = window.setInterval(handleStorage, 1500);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.clearInterval(interval);
    };
  }, []);

  if (loggedIn) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-white/30 bg-white/90 px-4 py-2 shadow-2xl backdrop-blur">
      <Link
        href="/admin/login"
        className="text-sm font-semibold text-primary hover:text-primaryDark"
      >
        Entrar no Payload
      </Link>
      <p className="text-[11px] text-gray-500 mt-1">sessão expirada? clique para entrar</p>
    </div>
  );
};
