import type { ReactNode } from 'react';
import './globals.css';

type LayoutProps = {
  children: ReactNode;
};

export const dynamic = 'force-dynamic';

export default function RootAppLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
