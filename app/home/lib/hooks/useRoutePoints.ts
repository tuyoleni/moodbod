import { useState, useRef, useEffect } from "react";

export interface RoutePoint {
    x: number;
    y: number;
    label: string;
}

export function useRoutePoints(relativePoints: RoutePoint[]) {
    const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
    const routeContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateRoutePoints = () => {
            if (routeContainerRef.current) {
                const { width, height } = routeContainerRef.current.getBoundingClientRect();
                setRoutePoints(
                    relativePoints.map((point) => ({
                        x: point.x * width,
                        y: point.y * height,
                        label: point.label,
                    }))
                );
            }
        };

        updateRoutePoints();
        window.addEventListener("resize", updateRoutePoints);
        return () => window.removeEventListener("resize", updateRoutePoints);
    }, [relativePoints]);

    return { routePoints, routeContainerRef };
}
