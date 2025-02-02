import { useState, useEffect } from "react";

export function useVisibilityObserver(ref: React.RefObject<HTMLElement>, threshold = 0.2) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold });

        if (currentRef) observer.observe(currentRef);
        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [ref, threshold]);

    return isVisible;
}
