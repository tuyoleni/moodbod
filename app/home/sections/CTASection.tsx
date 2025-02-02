"use client"
import { useVisibilityObserver } from "@/lib/hooks/useVisibilityObserver";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

interface Props {
    onVisibilityChange?: (isVisible: boolean) => void;
}

export function CTASection({ onVisibilityChange }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useVisibilityObserver(sectionRef as React.RefObject<HTMLElement>);

    useEffect(() => {
        onVisibilityChange?.(isVisible);
    }, [isVisible, onVisibilityChange]);

    return (
        <div ref={sectionRef} className="min-h-screen bg-black text-white py-20 px-4 sm:px-12 md:px-14 xl:px-44 flex flex-col justify-center">
            <div className="flex flex-col">
                <div className="relative">
                    <h2 className="text-[64pt] md:text-[96pt] lg:text-[128pt] font-black leading-none">
                        Let&apos;s hear.
                    </h2>
                    <h2 className="text-[64pt] md:text-[96pt] lg:text-[128pt] font-black leading-none mt-[-20px] md:mt-[-40px]">
                        your idea.
                    </h2>
                </div>

                <div className="mt-20">
                    <p className="text-xl md:text-2xl max-w-[800px] mb-12">
                        We will help make things faster and easier. Digital tools can save you time,
                        reach more people, and grow your business. Let&apos;s go digital and make your
                        work smoother and more efficient.
                    </p>
                    <motion.button
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                        }}
                        className="px-6 py-2 rounded-full font-medium bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
                    >
                        Let&apos;s Talk
                    </motion.button>
                </div>
            </div>
        </div >
    );
} 