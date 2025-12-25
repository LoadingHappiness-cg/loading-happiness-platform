'use client';

import { useEffect, useState } from 'react';

export default function MediaModal() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const target = event.target as HTMLElement;
      const button = target.closest('[data-video]') as HTMLElement | null;
      if (!button) return;
      const videoUrl = button.getAttribute('data-video');
      if (!videoUrl) return;
      setUrl(videoUrl);
      setOpen(true);
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('keydown', onEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open || !url) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 text-ink font-bold"
        >
          ✕
        </button>
        <iframe
          src={url}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Media"
        ></iframe>
      </div>
    </div>
  );
}
