"use client";

import React from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';

// Helper to safely get media URL and Alt
const getMediaMeta = (media: any) => {
    if (!media) return { url: undefined, alt: undefined };
    if (typeof media === 'string') return { url: media, alt: undefined };
    return {
        url: media.url || media?.sizes?.thumbnail?.url,
        alt: media.alt,
    };
};

interface SectionWrapperProps {
    block: any; // The whole block data
    children: React.ReactNode;
    className?: string; // Default classes like 'py-20'
    as?: React.ElementType;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
    block,
    children,
    className = 'py-20',
    as: Component = 'section',
}) => {
    const bg = block.background || {}; // Access the shared field logic
    const type = bg.type || 'color';
    const color = bg.color || 'white';
    const gradient = bg.gradient || 'brand';
    const overlay = bg.overlay || 'none';
    const opacity = bg.opacity || '50';

    // Animation for the section itself
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    // 1. Resolve Background Classes
    let bgClass = 'bg-white';
    let textClass = 'text-gray-900';

    if (type === 'color') {
        switch (color) {
            case 'gray':
                bgClass = 'bg-gray-50';
                break;
            case 'dark':
                bgClass = 'bg-ink text-white';
                textClass = 'text-white';
                break;
            case 'ocean':
                bgClass = 'bg-brand-ocean text-white';
                textClass = 'text-white';
                break;
            case 'white':
            default:
                bgClass = 'bg-white';
        }
    } else if (type === 'gradient') {
        textClass = 'text-white';
        switch (gradient) {
            case 'subtle':
                bgClass = 'bg-gradient-to-br from-white to-gray-100';
                textClass = 'text-gray-900';
                break;
            case 'dark':
                bgClass = 'bg-gradient-to-br from-ink to-brand-ocean';
                break;
            case 'brand':
            default:
                bgClass = 'bg-gradient-to-br from-brand-ocean to-brand-teal';
        }
    } else if (type === 'image') {
        bgClass = 'relative overflow-hidden'; // Prepare for absolute image
        if (overlay !== 'none' && overlay !== 'white') {
            textClass = 'text-white';
        }
    }

    // 2. Resolve Overlay Logic
    const overlayOpacityMap: Record<string, string> = {
        '10': 'opacity-10',
        '30': 'opacity-30',
        '50': 'opacity-50',
        '70': 'opacity-70',
        '90': 'opacity-90',
    };

    const renderOverlay = () => {
        if (type !== 'image' || overlay === 'none') return null;

        let overlayClass = '';
        if (overlay === 'black') overlayClass = 'bg-black';
        if (overlay === 'white') overlayClass = 'bg-white';
        if (overlay === 'brand') overlayClass = 'bg-gradient-to-br from-brand-midnight to-brand-ocean';

        return (
            <div
                className={clsx(
                    'absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000',
                    overlayClass,
                    overlayOpacityMap[opacity] || 'opacity-50'
                )}
            />
        );
    };

    // 3. Render Background Image
    const renderBackgroundImage = () => {
        if (type !== 'image' || !bg.image) return null;
        const media = getMediaMeta(bg.image);
        if (!media.url) return null;

        const animateZoom = bg.settings?.slightMotion ? 'animate-slow-zoom' : '';
        const parallax = bg.settings?.parallax ? 'fixed inset-0' : 'absolute inset-0'; // Simple approximation

        return (
            <div className="absolute inset-0 z-0">
                <img
                    src={media.url}
                    alt={media.alt || 'Background'}
                    className={clsx('w-full h-full object-cover', animateZoom)}
                />
            </div>
        );
    };

    // 4. Resolve Text Color Context
    // We can pass a class to children or wrapping div to ensure text inherits correctly.
    // The 'text-white' class on the section usually cascades, but some children have specific text colors.
    // We might need to override some text colors in children via Context if we want to be perfect,
    // but for now, we'll rely on CSS cascade and standard Tailwind 'text-inherit' or specificity.

    const finalClassName = clsx(
        className,
        bgClass,
        textClass,
        block.animationPreset === 'stagger' ? 'animate-stagger' : '', // Hook into existing animation logic if any
        {
            'is-visible': inView, // For the global scroll animations
        }
    );

    return (
        <Component
            ref={ref}
            id={block.anchorId}
            className={finalClassName}
            data-theme={type === 'color' && color === 'dark' ? 'dark' : 'light'}
        >
            {renderBackgroundImage()}
            {renderOverlay()}

            {/* Content Layer */}
            <div className="relative z-20 h-full w-full">
                {children}
            </div>
        </Component>
    );
};
