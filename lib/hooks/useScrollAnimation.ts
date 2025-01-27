import { useScroll, useTransform } from 'framer-motion';
import { RefObject } from 'react';

export function useScrollAnimation(sectionRef: RefObject<HTMLElement>) {
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Create individual hooks for each index to comply with React's rules
    const opacity0 = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
    const x0 = useTransform(scrollYProgress, [0.2, 0.3], [-50, 0]);

    const opacity1 = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
    const x1 = useTransform(scrollYProgress, [0.35, 0.45], [-50, 0]);

    const opacity2 = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
    const x2 = useTransform(scrollYProgress, [0.5, 0.6], [-50, 0]);

    const opacity3 = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
    const x3 = useTransform(scrollYProgress, [0.65, 0.75], [-50, 0]);

    const opacity4 = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
    const x4 = useTransform(scrollYProgress, [0.8, 0.9], [-50, 0]);

    const itemAnimations = [
        { opacity: opacity0, x: x0 },
        { opacity: opacity1, x: x1 },
        { opacity: opacity2, x: x2 },
        { opacity: opacity3, x: x3 },
        { opacity: opacity4, x: x4 }
    ];

    const headerAnimation = {
        opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1])
    };

    return {
        getItemAnimations: (index: number) => itemAnimations[index] || itemAnimations[0],
        headerAnimation
    };
}