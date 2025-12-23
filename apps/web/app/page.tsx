import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '4rem 2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Loading Happiness</h1>
      <p style={{ marginBottom: '2rem' }}>
        This instance is focused on the News & Insights hub.
      </p>
      <Link href="/news">Go to News</Link>
    </main>
  );
}
