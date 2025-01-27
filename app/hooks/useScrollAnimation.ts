/* eslint-disable */
import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

export function useScrollAnimation(sectionRef: RefObject<HTMLElement>) {
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    // Generate opacity and x animations for each list item
    const getItemAnimations = (index: number): { opacity: MotionValue<number>; x: MotionValue<number> } => {
        const baseStart = 0.2 + index * 0.15;
        const baseEnd = 0.3 + index * 0.15;

        return {
            opacity: useTransform(scrollYProgress, [baseStart, baseEnd], [0, 1]),
            x: useTransform(scrollYProgress, [baseStart, baseEnd], [-50, 0]),
        };
    };

    const headerAnimation = {
        opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
    };

    return { getItemAnimations, headerAnimation };
}