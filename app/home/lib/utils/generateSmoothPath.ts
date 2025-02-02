import { RoutePoint } from "../hooks/useRoutePoints";

export function generateSmoothPath(points: RoutePoint[], indices: number[]): string {
    if (points.length === 0) return "";
    const selectedPoints = indices.map((i) => points[i - 1]);

    return selectedPoints.reduce((acc, point, index, array) => {
        if (index === 0) return `M ${point.x},${point.y}`;
        const prev = array[index - 1];
        const next = array[index + 1] || point;

        return `${acc} C ${prev.x + (point.x - prev.x) / 2},${prev.y} ${point.x - (next.x - point.x) / 2},${point.y} ${point.x},${point.y}`;
    }, "");
}
