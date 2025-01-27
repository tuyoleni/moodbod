import { useScroll, useTransform } from 'framer-motion';
import { RefObject } from 'react';

export function useScrollAnimation(
    sectionRef: RefObject<HTMLElement>,
    itemCount: number
) {
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    // Generate animations dynamically inside the hook
    const itemAnimations = Array.from({ length: itemCount }).map((_, index) => ({
        opacity: useTransform(
            scrollYProgress,
            [0.2 + index * 0.15, 0.3 + index * 0.15],
            [0, 1]
        ),
        x: useTransform(
            scrollYProgress,
            [0.2 + index * 0.15, 0.3 + index * 0.15],
            [-50, 0]
        ),
    }));

    const headerAnimation = {
        opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
    };

    return {
        getItemAnimations: (index: number) =>
            itemAnimations[index] || {
                opacity: useTransform(scrollYProgress, [0, 0], [0, 0]), // Default fallback
                x: useTransform(scrollYProgress, [0, 0], [0, 0]),
            },
        headerAnimation,
    };
}