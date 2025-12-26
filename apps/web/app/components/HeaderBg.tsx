import React from 'react';

export function HeaderBg() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <svg
                viewBox="0 0 1440 160"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="h-full w-full"
            >
                <defs>
                    <linearGradient id="lh-g" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#EAF7FF" />
                        <stop offset="55%" stopColor="#F6FDFF" />
                        <stop offset="100%" stopColor="#EAFFF6" />
                    </linearGradient>

                    <pattern id="lh-dots" width="26" height="26" patternUnits="userSpaceOnUse">
                        <circle cx="1.2" cy="1.2" r="1.1" fill="#0B3A4A" opacity="0.06" />
                    </pattern>
                </defs>

                <rect width="1440" height="160" fill="url(#lh-g)" fillOpacity="0.5" />
                <rect width="1440" height="160" fill="url(#lh-dots)" opacity="0.4" />

                {/* “formas” suaves no topo direito */}
                <path d="M900 0H1060L1440 92V0H900Z" fill="#BFF1D6" opacity="0.12" />
                <path d="M1100 0H1260L1440 64V0H1100Z" fill="#B8E9FF" opacity="0.1" />

                {/* ondas em baixo */}
                <path
                    d="M0 120C240 82 480 150 720 112C960 72 1200 142 1440 102V160H0V120Z"
                    fill="#BFF1D6"
                    opacity="0.2"
                />
                <path
                    d="M0 136C260 106 520 170 760 132C1040 88 1240 146 1440 120V160H0V136Z"
                    fill="#B8E9FF"
                    opacity="0.15"
                />
            </svg>
        </div>
    );
}
