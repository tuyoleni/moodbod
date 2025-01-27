'use client';
import { motion } from 'framer-motion';
import { RefObject, useRef } from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { getItemAnimations, headerAnimation } = useScrollAnimation(
        sectionRef as RefObject<HTMLElement>,
        3 // Number of list items
    );

    const listItems = [
        'Build cool websites',
        'Make amazing phone and computer apps',
        'Tell people about your idea',
    ];

    return (
        <section
            ref={sectionRef}
            className="sticky top-0 w-full min-h-[300vh] px-4 sm:px-12 md:px-44"
        >
            <div className="sticky top-0 h-screen">
                <div className="w-full h-full flex flex-col justify-around">
                    <motion.h1
                        style={headerAnimation}
                        className="text-[clamp(80px,12vw,80pt)] font-black leading-[0.85] uppercase"
                    >
                        At Moodbod, we help you win online.
                    </motion.h1>

                    <ul className="text-[clamp(20px,12vw,35px)] font-black space-y-2 sm:max-w-[90%]">
                        {listItems.map((text, index) => {
                            const { opacity, x } = getItemAnimations(index);
                            return (
                                <motion.li
                                    key={index}
                                    style={{ opacity }} // Only apply opacity to style
                                    animate={{ x: x.get() }} // Convert MotionValue to number
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