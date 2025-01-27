'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    // Scroll tracking for the section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const listItems = [
        'Build cool websites',
        'Make amazing phone and computer apps',
        'Tell people about your idea',
    ];

    // Generate animations for list items
    const getListItemAnimations = (index: number) => {
        const start = 0.2 + index * 0.15;
        const end = 0.3 + index * 0.15;

        return {
            opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
            x: useTransform(scrollYProgress, [start, end], [-50, 0]),
        };
    };

    return (
        <section ref={sectionRef} className="sticky top-0 w-full min-h-[300vh] px-4 sm:px-12 md:px-44">
            <div className="sticky top-0  h-screen">
                <div className="w-full h-full flex flex-col justify-around">
                    {/* Heading */}
                    <motion.h1
                        style={{
                            opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
                        }}
                        className="text-[clamp(80px,12vw,80pt)] font-black leading-[0.85] uppercase"
                    >
                        At Moodbod, we help you win online.
                    </motion.h1>

                    {/* List Items */}
                    <ul className="text-[clamp(20px,12vw,35px)] font-black space-y-2 sm:max-w-[90%]">
                        {listItems.map((text, index) => {
                            const animations = getListItemAnimations(index);

                            // Single return for list items
                            return (
                                <motion.li
                                    key={index}
                                    style={animations}
                                    className="leading-none py-2"
                                >
                                    {text}
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;