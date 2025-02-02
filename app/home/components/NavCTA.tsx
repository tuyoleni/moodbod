"use client"

import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
    isCTASectionVisible: boolean;
    className?: string;
}

export function NavCTA({ isCTASectionVisible, className = "" }: Props) {
    return (
        <Link href="/register">
            <motion.button
                animate={{ opacity: isCTASectionVisible ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className={`px-6 py-2 rounded-full font-medium ${className}`}
            >
                Start a Project
            </motion.button>
        </Link>
    );
}