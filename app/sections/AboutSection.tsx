'use client'
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
    const { getItemAnimations, headerAnimation } = useScrollAnimation(sectionRef as React.RefObject<HTMLElement>);

    const listItems = [
        {
            text: 'Build cool websites',
            bgText: 'WEBSITES',
        },
        {
            text: 'Make amazing phone and computer apps',
            bgText: 'APPS',
        },
        {
            text: 'Tell people about your idea',
            bgText: 'MARKETING',
        }
    ];

    return (
        <section ref={sectionRef} className="w-full h-full relative">
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                <div className="w-full h-full flex flex-col justify-around">
                    {listItems.map((item, index) => (
                        <motion.div
                            key={`bg-${item.text}`}
                            style={{
                                ...getItemAnimations(index),
                                position: 'absolute',
                                top: `${index * 30}%`,
                                transform: 'translateX(-50%)',
                            }}
                            className="text-[clamp(30vh,10vw,20vh)] font-black text-black/5 whitespace-nowrap pointer-events-none select-none"
                        >
                            {item.bgText}
                        </motion.div>
                    ))}

                    <motion.h1
                        style={headerAnimation}
                        className="text-[clamp(60px,10vw,80pt)] text-wrap font-black leading-[0.85] uppercase pr-4 relative z-10 px-4 sm:px-12 md:px-14 xl:px-44"
                    >
                        At Moodbod, we help you win online.
                    </motion.h1>

                    <ul className="text-[clamp(18px,12vw,35px)] font-black space-y-2 sm:max-w-[90%] text-black/70 relative z-10 px-4 sm:px-12 md:px-14 xl:px-44">
                        {listItems.map((item, index) => (
                            <motion.li
                                key={item.text}
                                style={getItemAnimations(index)}
                                className="leading-none py-2 relative"
                            >
                                {item.text}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;