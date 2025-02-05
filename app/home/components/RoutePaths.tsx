import { motion } from "framer-motion";

interface RoutePathsProps {
    moodbodPath: string;
    othersPath: string;
    isVisible: boolean;
}

export function RoutePaths({ moodbodPath, othersPath, isVisible }: RoutePathsProps) {
    return (
        <svg className="w-full h-full absolute top-0 left-0 pointer-events-none">
            <motion.path
                d={moodbodPath}
                fill="none"
                stroke="rgb(169, 169, 169)"
                strokeWidth="2.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isVisible ? {
                    pathLength: 1,
                    opacity: 1,
                } : {
                    pathLength: 0,
                    opacity: 0,
                }}
                transition={{
                    pathLength: { duration: 2, ease: "easeOut" },
                    opacity: { duration: 0.2 }
                }}
            />
            <motion.path
                d={othersPath}
                fill="none"
                strokeWidth="2.5"
                stroke="black"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isVisible ? {
                    pathLength: 1,
                    opacity: 1,
                } : {
                    pathLength: 0,
                    opacity: 0,
                }}
                transition={{
                    pathLength: { duration: 2, ease: "easeOut", delay: 0.5 },
                    opacity: { duration: 0.2, delay: 0.5 }
                }}
            />
        </svg>
    );
}
