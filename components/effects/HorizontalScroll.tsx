'use client';

import React, { useEffect, useRef } from 'react';

interface HorizontalScrollProps {
    children: React.ReactNode;
    maxScrollWidth?: number;
    className?: string;
    direction?: 'ltr' | 'rtl';
    speed?: number;
}

export default function HorizontalScroll({
    children,
    maxScrollWidth = 2,
    className = "",
    direction = 'ltr',
    speed = 0.5,
}: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Get the section's starting position
        const sectionStart = container.offsetTop;

        const handleScroll = () => {
            const scrollPosition = window.scrollY - sectionStart;
            const translateX = (scrollPosition * speed) % (window.innerWidth * maxScrollWidth);

            const finalTranslate = direction === 'ltr' ? -translateX : translateX;
            container.style.transform = `translateX(${finalTranslate}px)`;
        };

        // Initial position
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [direction, maxScrollWidth, speed]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
} 