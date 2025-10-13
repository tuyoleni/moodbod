"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CursorProps {
  className?: string;
}

export function Cursor({ className }: CursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        (target.closest && target.closest("button")) ||
        (target.closest && target.closest("a")) ||
        (target.closest && target.closest("[role='button']")) ||
        (target.style && target.style.cursor === "pointer") ||
        (target.classList && target.classList.contains("cursor-pointer"))
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        (target.closest && target.closest("button")) ||
        (target.closest && target.closest("a")) ||
        (target.closest && target.closest("[role='button']")) ||
        (target.style && target.style.cursor === "pointer") ||
        (target.classList && target.classList.contains("cursor-pointer"))
      ) {
        setIsHovering(false);
      }
    };

    // Add event listeners
    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference ${className}`}
      animate={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
        scale: isHovering ? 0.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <div className="w-10 h-10 bg-white rounded-full opacity-80" />
    </motion.div>
  );
}
