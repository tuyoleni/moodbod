import { motion } from "framer-motion";
import { useState } from "react";

interface RoutePointProps {
    x: number;
    y: number;
    label: string;
    onHover: () => void;
    onLeave: () => void;
    isActive?: boolean;
    onClick?: () => void;
    isFirst?: boolean;
}

export function RoutePoint({ x, y, label, onHover, onLeave, isActive = false, onClick, isFirst = false }: RoutePointProps) {
    const [isHovered, setIsHovered] = useState(false);
    const showLabel = isHovered || isActive;

    return (
        <div className="relative">
            {isFirst && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-sm px-3 py-2 rounded-full shadow-lg z-50 sm:hidden">
                    Tap points to learn more
                </div>
            )}
            <motion.div
                className="absolute w-8 h-8 rounded-full cursor-pointer hover:scale-125 transition-transform group"
                style={{ left: x - 16, top: y - 16 }}
                initial={{ scale: 0 }}
                animate={{ scale: isActive ? 1.25 : 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => {
                    setIsHovered(true);
                    onHover();
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                    onLeave();
                }}
                onClick={onClick}
                title="Tap to learn more"
                aria-label="Tap to learn more"
            >
                <div className={`absolute inset-0 bg-gray-100 rounded-full ${isFirst ? 'animate-pulse' : ''}`} />
                <div className="absolute inset-[10px] bg-black rounded-full" />
            </motion.div>
            {showLabel && (
                <motion.div
                    className="absolute whitespace-nowrap bg-black text-white px-2 py-1 rounded text-sm"
                    style={{ left: x + 8, top: y - 8 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {label}
                </motion.div>
            )}
        </div>
    );
}
