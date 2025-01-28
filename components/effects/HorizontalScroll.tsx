'use client';

import React, { useEffect, useRef } from 'react';

interface HorizontalScrollProps {
    children: React.ReactNode;
    className?: string;
    speed?: number;
}

export default function HorizontalScroll({
    children,
    className = '',
    speed = 0.5,
}: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const sectionStart = container.offsetTop;
        let isScrolling = false;

        const handleScroll = () => {
            if (isScrolling) return;
            isScrolling = true;

            requestAnimationFrame(() => {
                const scrollPosition = window.scrollY - sectionStart;
                const translateX = scrollPosition * speed;
                container.style.transform = `translateX(${-translateX}px)`;
                isScrolling = false;
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}