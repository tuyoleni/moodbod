'use client'
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
    const { getItemAnimations } = useScrollAnimation(sectionRef as React.RefObject<HTMLElement>);

    const listItems = [
        'Build cool websites',
        'Make amazing phone and computer apps',
        'Tell people about your idea',
    ];

    return (
        <section ref={sectionRef} className="sticky top-0 w-full min-h-[300vh] px-4 sm:px-12 md:px-14 xl:px-44">
            <div className="sticky top-0 h-screen">
                <div className="w-full h-full flex flex-col justify-around">
                    {/* Heading */}
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { duration: 1 } },
                        }}
                        className="text-[clamp(80px,12vw,80pt)] font-black leading-[0.85] uppercase"
                    >
                        At Moodbod, we help you win online.
                    </motion.h1>

                    {/* List Items */}
                    <ul className="text-[clamp(20px,12vw,35px)] font-black space-y-2 sm:max-w-[90%]">
                        {listItems.map((text, index) => (
                            <motion.li
                                key={text} // Use the text as the key to avoid potential issues with dynamic lists
                                style={getItemAnimations(index)}
                                className="leading-none py-2"
                            >
                                {text}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;