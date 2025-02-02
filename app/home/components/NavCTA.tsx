"use client"

import { motion } from "framer-motion";

interface Props {
    isCTASectionVisible: boolean;
    className?: string;
}

export function NavCTA({ isCTASectionVisible, className = "" }: Props) {
    return (
        <motion.button
            animate={{ opacity: isCTASectionVisible ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className={`px-6 py-2 rounded-full font-medium ${className}`}
        >
            Let&apos;s Talk
        </motion.button>
    );
} 