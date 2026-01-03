"use client";

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { withLocale } from '@/lib/locale-utils';

const LOCALE_COOKIE = 'lh_locale';

const getLocaleFromPathname = (pathname: string) => {
  const match = pathname.match(/^\/(pt|en)(?=\/|$)/);
  return match?.[1];
};

const getLocaleFromCookie = () => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|; )lh_locale=([^;]+)/);
  return match?.[1];
};

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export default function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const pathname = usePathname() || '/';
  const locale = getLocaleFromPathname(pathname) || getLocaleFromCookie() || 'pt';
  const localizedHref = withLocale(href, `/${locale}`);

  return <Link href={localizedHref} {...props} />;
}
