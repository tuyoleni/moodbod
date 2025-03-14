import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RoutePaths } from "../components/RoutePaths";
import { RoutePoint } from "../components/RoutePoint";
import { useRoutePoints } from "../lib/hooks/useRoutePoints";
import { generateSmoothPath } from "../lib/utils/generateSmoothPath";
import { useVisibilityObserver } from "@/lib/hooks/useVisibilityObserver";


const relativeRoutePoints = [
    { x: 0.5, y: 0, label: "We all start Here" },
    { x: 0.3, y: 0.4, label: "Research" },
    { x: 0.5, y: 0.2, label: "Planning" },
    { x: 0.7, y: 0.6, label: "Development" },
    { x: 0.2, y: 0.8, label: "Testing" },
    { x: 0.6, y: 0.5, label: "Feedback" },
    { x: 0.8, y: 0.3, label: "Learn" },
    { x: 0.4, y: 0.5, label: "Look at it again" },
    { x: 0.6, y: 0.75, label: "Make changes" },
    { x: 0.5, y: 0.75, label: "Deliver" },
    { x: 0.4, y: 0.95, label: "But we go a little further" },
];

export function RouteSection() {
    const { routePoints, routeContainerRef } = useRoutePoints(relativeRoutePoints);
    const isVisible = useVisibilityObserver(routeContainerRef as React.RefObject<HTMLElement>);
    const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

    const moodbodPath = useMemo(() => generateSmoothPath(routePoints, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), [routePoints]);
    const othersPath = useMemo(() => generateSmoothPath(routePoints, [1, 4, 6, 10]), [routePoints]);

    const handlePointClick = (index: number) => {
        setActivePointIndex(activePointIndex === index ? null : index);
    };

    return (
        <div className="py-40">
            <motion.div
                ref={routeContainerRef}
                className="relative bg-white flex flex-col h-[40vw] min-h-[400px] max-h-screen"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setActivePointIndex(null);
                    }
                }}
            >
                <RoutePaths moodbodPath={moodbodPath} othersPath={othersPath} isVisible={isVisible} />
                <AnimatePresence>
                    {routePoints.map((point, index) => (
                        <RoutePoint
                            key={index}
                            {...point}
                            isActive={activePointIndex === index}
                            onHover={() => { }}
                            onLeave={() => { }}
                            onClick={() => handlePointClick(index)}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            <div className="px-4 sm:px-12 md:px-14 xl:px-44">
                <h1 className="text-[48pt] font-black mb-4">Route</h1>
                <div className="flex gap-4 mb-2 font-bold">
                    <p className="text-gray-500">
                        MOODBOD
                    </p>
                    <p className="text-black">
                        OTHERS
                    </p>
                </div>
                <div className="max-w-[100%] md:max-w-[80%] xl:max-w-[70%]">
                    <p>
                        Many agencies focus on finishing projects quickly, but we do things differently. We work closely
                        with you, truly understanding your needs, creating lasting solutions, and helping your business
                        grow and succeed over time.
                    </p>
                </div>
            </div>
        </div>
    );
}
