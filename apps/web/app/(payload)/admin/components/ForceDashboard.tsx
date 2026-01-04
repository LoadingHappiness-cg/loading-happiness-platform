'use client';

import { useEffect } from 'react';

const TARGET_ROUTE = '/admin/collections/content';
const CHECK_INTERVAL = 1200;
const MAX_ATTEMPTS = 5;
const LOGOUT_ACTIVE_KEY = 'payload-logout-active';

export const ForceDashboard = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let attempts = 0;

    const checkAndRedirect = () => {
      const logoutActive = window.localStorage.getItem(LOGOUT_ACTIVE_KEY);
      if (logoutActive) {
        return;
      }

      const hasToken =
        window.localStorage.getItem('payload-auth') ||
        window.localStorage.getItem('payload-token');

      if (
        attempts >= MAX_ATTEMPTS ||
        !window.location.pathname.match(/^\/admin(\/|$)/) ||
        !hasToken
      ) {
        return;
      }

      if (
        window.location.pathname === '/admin' ||
        window.location.pathname === '/admin/'
      ) {
        window.location.replace(TARGET_ROUTE);
      }

      attempts += 1;
    };

    const interval = window.setInterval(checkAndRedirect, CHECK_INTERVAL);
    checkAndRedirect();

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return null;
};
