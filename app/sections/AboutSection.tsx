/* eslint-disable */
'use client'
import { motion } from 'framer-motion';
import { RefObject, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';


function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { getItemAnimations, headerAnimation } = useScrollAnimation(sectionRef as RefObject<HTMLElement>);


    const listItems = [
        'Build cool websites',
        'Make amazing phone and computer apps',
        'Tell people about your idea',
    ];

    return (
        <section ref={sectionRef} className="sticky top-0 w-full min-h-[300vh] px-4 sm:px-12 md:px-44">
            <div className="sticky top-0  h-screen">
                <div className="w-full h-full flex flex-col justify-around">
                    {/* Heading */}
                    <motion.h1
                        style={headerAnimation}

                        className="text-[clamp(80px,12vw,80pt)] font-black leading-[0.85] uppercase"
                    >
                        At Moodbod, we help you win online.
                    </motion.h1>

                    {/* List Items */}
                    <ul className="text-[clamp(20px,12vw,35px)] font-black space-y-2 sm:max-w-[90%]">
                        {listItems.map((text, index) => {
                            // Single return for list items
                            return (
                                <motion.li
                                    key={index}
                                    style={getItemAnimations(index)}
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