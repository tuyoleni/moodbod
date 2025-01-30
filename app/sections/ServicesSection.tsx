'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import android from '@/public/icons/android-chrome-192x192.png';

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
        image: "/api/placeholder/400/320",
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
        image: "/api/placeholder/400/320",
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
        image: "/api/placeholder/400/320",
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
        image: "/api/placeholder/400/320",
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
        image: "/api/placeholder/400/320",
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
        image: "/api/placeholder/400/320",
        tag: "Data",
        width: 290,
        height: 360,
        edge: "right",
        offsetPercent: 0.7,
        startRotation: -15
    },
    {
        title: "Content",
        description: "Engaging storytelling that builds lasting connections",
        image: "/api/placeholder/400/320",
        tag: "Creative",
        width: 265,
        height: 335,
        edge: "bottom",
        offsetPercent: 0.8,
        startRotation: 12
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
        const padding = 100;
        const centerX = w / 2;
        const centerY = h / 2;

        let x, y;
        const centerPull = 0.6;

        switch (startEdge) {
            case "left":
                x = padding + (centerX - padding) * (0.3 + Math.random() * centerPull);
                y = centerY + (Math.random() - 0.5) * (h - textSpace - 2 * padding) * 0.8;
                break;
            case "right":
                x = centerX + (w - centerX - padding) * (0.7 - Math.random() * centerPull);
                y = centerY + (Math.random() - 0.5) * (h - textSpace - 2 * padding) * 0.8;
                break;
            case "top":
                x = centerX + (Math.random() - 0.5) * (w - 2 * padding) * 0.8;
                y = padding + (centerY - padding) * (0.3 + Math.random() * centerPull);
                break;
            case "bottom":
                x = centerX + (Math.random() - 0.5) * (w - 2 * padding) * 0.8;
                y = centerY + (h - textSpace - centerY - padding) * (0.7 - Math.random() * centerPull);
                break;
            default:
                x = centerX + (Math.random() - 0.5) * (w - 2 * padding) * 0.8;
                y = centerY + (Math.random() - 0.5) * (h - textSpace - 2 * padding) * 0.8;
        }

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
                                className="paper absolute bg-[#1a1a1a] shadow-lg transform-gpu flex flex-col justify-start items-start p-5 rounded overflow-hidden border border-white/10 w-[290px] h-[380px] opacity-[0.99] will-change-transform"
                                data-edge={info.edge}
                            >
                                <Image
                                    src="/api/placeholder/400/320"
                                    alt={info.title}
                                    width={400}
                                    height={320}
                                    className="w-full bg-slate-400 h-[180px] object-cover mb-4 filter grayscale-[20%] contrast-120"
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
                        <p className="text-2xl h-full max-w-[500px] sm:max-w-[500px] md:max-w-[650px] xl:max-w-[800px] text-center">
                            <span className="text-4xl font-black tracking-tight relative group animate-pulse">
                                Moodbod
                                <Image src={android} width={32} height={32} className="absolute -top-6 -right-6 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" alt="Moodbod icon" />
                                <span className="absolute -left-4 -top-4 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500">⚡</span>
                            </span> will help your <span className="text-3xl font-bold relative inline-block group">
                                business grow
                                <span className="absolute -top-3 -right-3 text-lg opacity-0 group-hover:opacity-100 transition-all duration-500">🚀</span>
                                <span className="absolute -left-2 top-1/2 text-white/30 transform -translate-y-1/2">&lt;</span>
                            </span> online with clear and effective solutions. From creating <span className="text-2xl font-extrabold tracking-wide relative group">
                                strong brand identities
                                <span className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">✨</span>
                                <span className="absolute -right-3 -bottom-2 text-white/30">&gt;</span>
                            </span> to building <span className="relative group">amazing
                                <span className="absolute -top-4 -right-4 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500">⚡</span>
                                <span className="absolute -left-2 bottom-0 text-white/30">/&gt;</span>
                            </span> digital experiences, everything is designed to <span className="text-3xl font-black relative inline-block group">
                                attract more customers
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                                <span className="absolute -right-3 top-0 text-white/30">&gt;</span>
                            </span>. With smart use of <span className="text-2xl font-bold tracking-widest group relative inline-block animate-pulse">
                                TECH
                                <span className="absolute -top-2 -right-2 text-xs opacity-0 group-hover:opacity-100 transition-all duration-500">&lt;/&gt;</span>
                            </span>, <span className="text-4xl font-black tracking-tight group">
                                Moodbod
                                <span className="absolute -top-3 -right-3 text-lg opacity-0 group-hover:opacity-100 transition-all duration-500">💫</span>
                                <span className="absolute -left-3 bottom-0 text-white/30">&lt;</span>
                            </span> makes <span className="text-3xl font-extrabold relative group">
                                digital growth
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-white/30 to-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                                <span className="absolute -right-3 -top-2 text-white/30">/&gt;</span>
                            </span> easy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;