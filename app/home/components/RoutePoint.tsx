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
}

export function RoutePoint({ x, y, label, onHover, onLeave, isActive = false, onClick }: RoutePointProps) {
    const [isHovered, setIsHovered] = useState(false);
    const showLabel = isHovered || isActive;

    return (
        <div className="relative">
            <motion.div
                className="absolute w-8 h-8 bg-black outline outline-4 outline-white rounded-full cursor-pointer hover:scale-125 transition-transform"
                style={{ left: x - 16, top: y - 16 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: isActive ? 1.25 : 1 }}
                exit={{ opacity: 0, scale: 0 }}
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
            />
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
