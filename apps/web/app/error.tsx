'use client';

export const dynamic = 'force-dynamic';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">Error</p>
        <h1 className="text-3xl font-extrabold">Something went wrong</h1>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-primary text-white font-semibold"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
