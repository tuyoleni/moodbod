import { useState, useEffect } from "react";

export function useVisibilityObserver(ref: React.RefObject<HTMLElement>, threshold = 0.2) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold });

        if (ref.current) observer.observe(ref.current);
        return () => ref.current && observer.unobserve(ref.current);
    }, [ref]);

    return isVisible;
}
