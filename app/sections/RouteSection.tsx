import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RoutePoint {
    x: number;
    y: number;
    label: string;
}

export function RouteSection() {
    const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
    const [highlightedPointIndex, setHighlightedPointIndex] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const routeContainerRef = useRef<HTMLDivElement>(null);

    // Define the relative positions and labels of points
    const relativeRoutePoints: RoutePoint[] = useMemo(
        () => [
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
        ],
        []
    );

    const updatePoints = useCallback(() => {
        if (routeContainerRef.current) {
            const { width, height } = routeContainerRef.current.getBoundingClientRect();
            setRoutePoints(
                relativeRoutePoints.map(point => ({
                    x: point.x * width,
                    y: point.y * height,
                    label: point.label
                }))
            );
        }
    }, [relativeRoutePoints]);

    // Adjust the points based on the container's size
    useEffect(() => {
        const currentRef = routeContainerRef.current;
        const observer = new ResizeObserver(() => {
            if (currentRef) {
                updatePoints();
            }
        });

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [updatePoints]);

    // Observe when the section is visible on the screen
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (routeContainerRef.current) {
            observer.observe(routeContainerRef.current);
        }

        return () => {
            if (routeContainerRef.current) {
                observer.unobserve(routeContainerRef.current);
            }
        };
    }, []);

    // Generate a smooth path between selected points
    const generateSmoothPath = (indices: number[]) => {
        if (routePoints.length === 0) return "";

        const selectedPoints = indices.map((i) => routePoints[i - 1]);

        return selectedPoints.reduce((acc, point, index, array) => {
            if (index === 0) return `M ${point.x},${point.y}`;
            const prev = array[index - 1];
            const next = array[index + 1] || point;

            const controlPoint1 = { x: prev.x + (point.x - prev.x) / 2, y: prev.y };
            const controlPoint2 = { x: point.x - (next.x - point.x) / 2, y: point.y };

            return `${acc} C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${point.x},${point.y}`;
        }, "");
    };

    const moodbodPath = useMemo(() => generateSmoothPath(routePoints.map(p => routePoints.indexOf(p) + 1)), [routePoints, generateSmoothPath]);
    const othersPath = useMemo(() => generateSmoothPath(routePoints.map(p => routePoints.indexOf(p) + 1).map(i => ({ ...routePoints[i - 1], y: routePoints[i - 1].y + 50 })).map(p => routePoints.indexOf(p) + 1)), [routePoints, generateSmoothPath]);

    return (
        <motion.div
            ref={routeContainerRef}
            className="relative bg-white flex flex-col h-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
        >
            <div className="flex-grow relative">
                {routePoints.length > 0 && (
                    <svg className="w-full h-screen absolute top-0 left-0">
                        <motion.path
                            d={moodbodPath}
                            fill="none"
                            stroke="black"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        {/* Others Path Animation */}
                        <motion.path
                            d={othersPath}
                            fill="none"
                            strokeWidth="2"
                            stroke="rgb(169, 169, 169)"
                            initial={{ pathLength: 0 }}
                            animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                        />
                    </svg>
                )}
                <AnimatePresence>
                    {routePoints.map((point, index) => (
                        <motion.div
                            key={index}
                            className="absolute w-4 h-4 bg-black outline outline-4 outline-white rounded-full cursor-pointer hover:scale-150 transition-transform"
                            style={{ left: point.x - 8, top: point.y - 8 }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => setHighlightedPointIndex(index)}
                            onMouseLeave={() => setHighlightedPointIndex(null)}
                        />
                    ))}
                </AnimatePresence>
                {highlightedPointIndex !== null && routePoints[highlightedPointIndex] && (
                    <motion.div
                        className="absolute text-sm font-semibold text-black bg-white px-2 py-1 uppercase"
                        style={{
                            left: routePoints[highlightedPointIndex].x,
                            top: routePoints[highlightedPointIndex].y + 20,
                            transform: "translateX(-50%)",
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {routePoints[highlightedPointIndex].label}
                    </motion.div>
                )}
            </div>
            <div className="px-4 sm:px-12 md:px-14 xl:px-44 pt-[1000px] md:pt-[1250px] xl:pt-[1000px]">
                <h1 className="text-[48pt] font-black">Route</h1>
                <div className="max-w-[100%] md:max-w-[80%] xl:max-w-[70%] flex gap-[10%]">
                    <p>
                        Many agencies focus on finishing projects quickly, but we do things differently. We work closely
                        with you, truly understanding your needs, creating lasting solutions, and helping your business
                        grow and succeed over time.
                    </p>
                    <div className="font-bold">
                        <p
                            className="text-black cursor-pointer"
                            onMouseEnter={() => {
                                document.querySelector(".moodbod-path")?.setAttribute("stroke", "black");
                                document.querySelector(".others-path")?.setAttribute("stroke", "rgb(169, 169, 169)");
                            }}
                            onMouseLeave={() => {
                                document.querySelector(".moodbod-path")?.setAttribute("stroke", "black");
                                document.querySelector(".others-path")?.setAttribute("stroke", "rgb(169, 169, 169)");
                            }}
                        >
                            MOODBOD
                        </p>
                        <p
                            className="text-gray-500 cursor-pointer"
                            onMouseEnter={() => {
                                document.querySelector(".others-path")?.setAttribute("stroke", "black");
                                document.querySelector(".moodbod-path")?.setAttribute("stroke", "rgb(169, 169, 169)");
                            }}
                            onMouseLeave={() => {
                                document.querySelector(".moodbod-path")?.setAttribute("stroke", "black");
                                document.querySelector(".others-path")?.setAttribute("stroke", "rgb(169, 169, 169)");
                            }}
                        >
                            OTHERS
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}