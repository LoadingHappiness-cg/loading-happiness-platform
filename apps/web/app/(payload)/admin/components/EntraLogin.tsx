'use client';

import { useEffect, useState } from 'react';

type Status = {
  enabled: boolean;
};

export const EntraLogin = () => {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/auth/entra/status')
      .then((res) => res.json())
      .then((data) => {
        if (active) setStatus(data);
      })
      .catch(() => {
        if (active) setStatus({ enabled: false });
      });
    return () => {
      active = false;
    };
  }, []);

  if (!status?.enabled) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="text-xs uppercase tracking-widest text-[color:var(--theme-elevation-500)]">
        Single Sign-On
      </div>
      <a href="/auth/entra" className="btn btn--style-primary btn--size-medium">
        Login com Entra ID
      </a>
    </div>
  );
};
