"use client";

import { useVisibilityObserver } from "@/lib/hooks/useVisibilityObserver";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, memo } from "react";

interface Props {
    onVisibilityChange?: (isVisible: boolean) => void;
}

export const CTASection = memo(({ onVisibilityChange }: Props) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useVisibilityObserver(sectionRef as React.RefObject<HTMLElement>);

    useEffect(() => {
        if (onVisibilityChange) onVisibilityChange(isVisible);
    }, [isVisible, onVisibilityChange]);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen bg-black text-white py-20 px-4 sm:px-12 md:px-14 xl:px-44 flex flex-col justify-center"
        >
            <div className="flex flex-col">
                <div className="relative leading-none">
                    <h1 className="text-[1000%]  text-wrap font-black block leading-[0.85] uppercase">
                        Let&apos;s hear your idea.
                    </h1>
                </div>

                <div className="mt-20">
                    <p className="max-w-[100%] md:max-w-[80%] xl:max-w-[70%] mb-12">
                        We will help make things faster and easier. Digital tools can save you time,
                        reach more people, and grow your business. Let&apos;s go digital and make your
                        work smoother and more efficient.
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/register">
                            <button className={`px-6 py-2 rounded-full font-medium bg-white text-black hover:bg-black hover:text-white transition-colors duration-300`}>
                                Start a Project
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
});

CTASection.displayName = 'CTASection';
