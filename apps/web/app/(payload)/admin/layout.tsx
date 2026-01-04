import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

// Keep the admin layout minimal so Payload's own routing and auth behavior can run
// without extra client-side redirects or logout logic layered on top.
export default function AdminLayout({ children }: LayoutProps) {
  return children;
}
