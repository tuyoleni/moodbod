import { motion } from "framer-motion";
import { useState } from "react";

interface RoutePointProps {
    x: number;
    y: number;
    label: string;
    onHover: () => void;
    onLeave: () => void;
}

export function RoutePoint({ x, y, label, onHover, onLeave }: RoutePointProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative">
            <motion.div
                className="absolute w-4 h-4 bg-black outline outline-4 outline-white rounded-full cursor-pointer hover:scale-150 transition-transform"
                style={{ left: x - 8, top: y - 8 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
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
            />
            {isHovered && (
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
