'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    moodbodAnalytics,
    moodbodBrandDesign,
    moodbodDevelopment,
    moodbodDigitalStrategy,
    moodbodMarketing,
    moodbodUserExperience
} from '@/public/assets';

interface PaperInfo {
    title: string;
    description: string;
    image: string;
    tag: string;
    width: number;
    height: number;
    edge: string;
    offsetPercent: number;
    startRotation: number;
}

const paperInfo: PaperInfo[] = [
    {
        title: "Digital Strategy",
        description: "Data driven approaches to transform your digital presence and market position",
        image: moodbodDigitalStrategy,
        tag: "Strategy",
        width: 280,
        height: 340,
        edge: "top",
        offsetPercent: 0.2,
        startRotation: 15
    },
    {
        title: "Brand Design",
        description: "Crafting memorable identities that resonate with your target audience",
        image: moodbodBrandDesign,
        tag: "Branding",
        width: 240,
        height: 320,
        edge: "right",
        offsetPercent: 0.3,
        startRotation: -12
    },
    {
        title: "Development",
        description: "Building scalable, robust solutions with cutting edge technology",
        image: moodbodDevelopment,
        tag: "Tech",
        width: 260,
        height: 330,
        edge: "bottom",
        offsetPercent: 0.4,
        startRotation: 8
    },
    {
        title: "User Experience",
        description: "Creating intuitive interfaces that delight and engage users",
        image: moodbodUserExperience,
        tag: "UX/UI",
        width: 270,
        height: 350,
        edge: "left",
        offsetPercent: 0.5,
        startRotation: -10
    },
    {
        title: "Marketing",
        description: "Strategic campaigns that drive growth and engagement",
        image: moodbodMarketing,
        tag: "Growth",
        width: 250,
        height: 325,
        edge: "top",
        offsetPercent: 0.6,
        startRotation: 20
    },
    {
        title: "Analytics",
        description: "Deep insights and metrics to optimize performance",
        image: moodbodAnalytics,
        tag: "Data",
        width: 290,
        height: 360,
        edge: "right",
        offsetPercent: 0.7,
        startRotation: -15
    }
];

interface Paper {
    element: HTMLDivElement;
    startX: number;
    startY: number;
    startRotation: number;
    finalX: number;
    finalY: number;
    rotationSpeed: number;
    rotationDirection: number;
    active: boolean;
}

const ServicesSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const papersRef = useRef<Paper[]>([]);
    const lastScrollProgressRef = useRef(0);
    const animationFrameIdRef = useRef<number | null>(null);

    const getEdgePosition = (info: PaperInfo) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const centerX = w / 2;
        const centerY = h / 2;
        const buffer = 400;

        switch (info.edge) {
            case "top":
                return { x: centerX + (w * info.offsetPercent - w / 2), y: -buffer };
            case "right":
                return { x: w + buffer, y: centerY + (h * info.offsetPercent - h / 2) };
            case "bottom":
                return { x: centerX + (w * info.offsetPercent - w / 2), y: h + buffer };
            case "left":
                return { x: -buffer, y: centerY + (h * info.offsetPercent - h / 2) };
            default:
                return { x: 0, y: 0 };
        }
    };

    const getFinalPosition = (startEdge: string) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const textSpace = 200;
        const padding = 150;
        const centerX = w / 2;
        const centerY = h / 2;

        const randomOffset = () => (Math.random() - 0.5) * 0.6;

        let x, y;
        switch (startEdge) {
            case "left":
                x = centerX + (w * 0.25) * randomOffset();
                y = centerY + (h - textSpace) * randomOffset();
                break;
            case "right":
                x = centerX + (w * 0.25) * randomOffset();
                y = centerY + (h - textSpace) * randomOffset();
                break;
            case "top":
                x = centerX + (w * 0.3) * randomOffset();
                y = centerY + (h - textSpace) * 0.25 * randomOffset();
                break;
            case "bottom":
                x = centerX + (w * 0.3) * randomOffset();
                y = centerY + (h - textSpace) * 0.25 * randomOffset();
                break;
            default:
                x = centerX + (w * 0.25) * randomOffset();
                y = centerY + (h - textSpace) * randomOffset();
        }

        x = Math.max(padding, Math.min(w - padding, x));
        y = Math.max(padding, Math.min(h - textSpace - padding, y));

        return { x, y };
    };

    useEffect(() => {
        // Initialize papers
        const paperElements = document.querySelectorAll('.paper');
        papersRef.current = Array.from(paperElements).map((element, i) => {
            const info = paperInfo[i];
            const startPosition = getEdgePosition(info);
            const finalPosition = getFinalPosition(info.edge);
            return {
                element: element as HTMLDivElement,
                startX: startPosition.x,
                startY: startPosition.y,
                finalX: finalPosition.x,
                finalY: finalPosition.y,
                startRotation: info.startRotation || Math.random() * 30 - 15,
                rotationSpeed: Math.random() * 180 - 90,
                rotationDirection: Math.random() > 0.5 ? 1 : -1,
                active: false
            };
        });

        function updatePapers() {
            if (!containerRef.current || !sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();

            // Calculate progress based on container position
            const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
            const scrollingUp = progress < lastScrollProgressRef.current;
            lastScrollProgressRef.current = progress;

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            papersRef.current.forEach((paper, index) => {
                const paperTrigger = index * 0.1;
                const paperProgress = Math.max(0, Math.min(1, (progress - paperTrigger) * 5));
                const easedProgress = 1 - Math.pow(1 - paperProgress, 3);

                const currentX = paper.startX + (paper.finalX - paper.startX) * easedProgress;
                const currentY = paper.startY + (paper.finalY - paper.startY) * easedProgress;

                const baseRotation = paper.startRotation;
                const rotationProgress = Math.max(0, 1 - easedProgress);
                const scrollRotation = progress * paper.rotationSpeed * paper.rotationDirection * rotationProgress;
                const currentRotation = baseRotation + scrollRotation;

                const offsetX = currentX - centerX;
                const offsetY = currentY - centerY;

                if (paper.element) {
                    if (scrollingUp && paperProgress === 0) {
                        paper.element.style.transform = `translate3d(${paper.startX - centerX}px, ${paper.startY - centerY}px, 0) rotate(${baseRotation}deg)`;
                    } else {
                        paper.element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${currentRotation}deg)`;
                    }
                }
            });

            animationFrameIdRef.current = requestAnimationFrame(updatePapers);
        }

        // Start animation
        updatePapers();

        // Handle resize
        const handleResize = () => {
            papersRef.current.forEach((paper, i) => {
                const startPosition = getEdgePosition(paperInfo[i]);
                const finalPosition = getFinalPosition(paperInfo[i].edge);
                paper.startX = startPosition.x;
                paper.startY = startPosition.y;
                paper.finalX = finalPosition.x;
                paper.finalY = finalPosition.y;
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, []);

    return (
        <div ref={sectionRef} className="w-full h-full relative">
            <div
                ref={containerRef}
                className="w-full h-screen sticky top-0 overflow-hidden"
            >
                <div className="w-full h-full flex flex-col justify-center items-center text-white bg-[#111111]">
                    <div className="flex justify-center items-center overflow-hidden">
                        {paperInfo.map((info, i) => (
                            <div
                                key={i}
                                className="paper absolute bg-[#1a1a1a] shadow-lg transform-gpu flex flex-col justify-start items-start p-5 rounded overflow-hidden border border-white/10 w-[290px] h-[380px] opacity-[0.99] will-change-transform mb-40"
                                data-edge={info.edge}
                            >
                                <Image
                                    src={info.image}
                                    alt={info.title}
                                    width={400}
                                    height={320}
                                    className="w-full h-[180px] object-cover mb-4 filter grayscale hover:grayscale-0 contrast-125 hover:contrast-100 brightness-90 hover:brightness-100 transition-all duration-300"
                                    priority={true}
                                    quality={85}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRshGxsdIR0hHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                />
                                <div className="font-semibold text-lg text-white mb-2.5 tracking-wider uppercase">
                                    {info.title}
                                </div>
                                <div className="text-sm text-white/70 leading-relaxed font-light mb-4">
                                    {info.description}
                                </div>
                                <div className="bg-white/10 px-3 py-1.5 rounded-full text-xs text-white/90 tracking-wider uppercase font-semibold">
                                    {info.tag}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="max-w-[100%] md:max-w-[80%] xl:max-w-[70%] absolute bottom-20 left-0 px-4 sm:px-12 md:px-14 xl:px-44 text-white">
                    Moodbod will help your business grow online with clear and effective solutions. From crafting strong brand identities to building exceptional digital experiences, every aspect is designed to attract more customers. By leveraging technology strategically, Moodbod simplifies digital growth.
                </p>
            </div>
        </div>
    );
};

export default ServicesSection;