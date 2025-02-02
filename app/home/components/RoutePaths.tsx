import { motion } from "framer-motion";

interface RoutePathsProps {
    moodbodPath: string;
    othersPath: string;
    isVisible: boolean;
}

export function RoutePaths({ moodbodPath, othersPath, isVisible }: RoutePathsProps) {
    return (
        <svg className="w-full h-full absolute top-0 left-0">
            <motion.path
                d={moodbodPath}
                fill="none"
                stroke="rgb(169, 169, 169)"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
                d={othersPath}
                fill="none"
                strokeWidth="2.5"
                stroke="black"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
        </svg>
    );
}
