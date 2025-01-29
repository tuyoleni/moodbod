const paperInfo = [
    {
        title: "Digital Strategy",
        description: "Data-driven approaches to transform your digital presence and market position",
        image: "https://unsplash.com/photos/two-people-drawing-on-whiteboard-26MJGnCM0Wc",
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
        image: "https://source.unsplash.com/400x300/?branding,design",
        tag: "Branding",
        width: 240,
        height: 320,
        edge: "right",
        offsetPercent: 0.3,
        startRotation: -12
    },
    {
        title: "Development",
        description: "Building scalable, robust solutions with cutting-edge technology",
        image: "https://source.unsplash.com/400x300/?coding,technology",
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
        image: "https://source.unsplash.com/400x300/?ux,interface",
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
        image: "https://source.unsplash.com/400x300/?marketing,digital",
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
        image: "https://source.unsplash.com/400x300/?analytics,data",
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
        image: "https://source.unsplash.com/400x300/?content,creative",
        tag: "Creative",
        width: 265,
        height: 335,
        edge: "bottom",
        offsetPercent: 0.8,
        startRotation: 12
    },
    {
        title: "Innovation",
        description: "Pushing boundaries with emerging technologies and trends",
        image: "https://source.unsplash.com/400x300/?innovation,future",
        tag: "Future",
        width: 255,
        height: 330,
        edge: "left",
        offsetPercent: 0.9,
        startRotation: -18
    }
];

const ServicesSection = () => {
    let papers: Array<{
        element: HTMLDivElement;
        startX: number;
        startY: number;
        startRotation: number;
        finalX: number;
        finalY: number;
        rotationSpeed: number;
        rotationDirection: number;
        active: boolean;
    }> = [];
    let lastScrollProgress = 0;

    const getEdgePosition = (info: any) => {
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
        }
    };

    const getFinalPosition = (startEdge: string) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const textSpace = 200;
        const padding = 100;
        const centerX = w / 2;
        const centerY = h / 2;

        // Define zones that are closer to center but maintain original direction
        let x, y;
        const centerPull = 0.6; // How much to pull towards center (0 = edge, 1 = center)

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

    const updatePapers = () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const scrollingUp = scrollProgress < lastScrollProgress;
        lastScrollProgress = scrollProgress;

        papers.forEach((paper, index) => {
            const paperTrigger = index * 0.1;
            const progress = Math.max(0, Math.min(1, (scrollProgress - paperTrigger) * 5));

            // Ease out the progress for smoother ending
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentX = paper.startX + (paper.finalX - paper.startX) * easedProgress;
            const currentY = paper.startY + (paper.finalY - paper.startY) * easedProgress;

            // Calculate rotation with easing
            const baseRotation = paper.startRotation;
            const rotationProgress = Math.max(0, 1 - easedProgress); // Inverse of progress for rotation slowdown
            const scrollRotation = scrollProgress * paper.rotationSpeed * paper.rotationDirection * rotationProgress;
            const currentRotation = baseRotation + scrollRotation;

            const offsetX = currentX - centerX;
            const offsetY = currentY - centerY;

            if (paper.element) {
                if (scrollingUp && progress === 0) {
                    paper.element.style.transform = `translate3d(${paper.startX - centerX}px, ${paper.startY - centerY}px, 0) rotate(${baseRotation}deg)`;
                } else {
                    paper.element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${currentRotation}deg)`;
                }
            }
        });

        const revealText = document.querySelector('.reveal-text') as HTMLElement;
        if (revealText) {
            revealText.style.opacity = scrollProgress > 0.8 ? '1' : '0';
        }

        requestAnimationFrame(updatePapers);
    };

    setTimeout(() => {
        const paperElements = document.querySelectorAll('.paper');
        papers = Array.from(paperElements).map((element, i) => {
            const info = paperInfo[i];
            const startPosition = getEdgePosition(info);
            const finalPosition = getFinalPosition(info.edge);
            return {
                element: element as HTMLDivElement,
                startX: startPosition?.x || 0,
                startY: startPosition?.y || 0,
                finalX: finalPosition.x,
                finalY: finalPosition.y,
                startRotation: Math.random() * 30 - 15,
                rotationSpeed: Math.random() * 180 - 90, // Reduced rotation speed range
                rotationDirection: Math.random() > 0.5 ? 1 : -1,
                active: false
            };
        });

        papers.forEach((paper) => {
            const offsetX = paper.startX - window.innerWidth / 2;
            const offsetY = paper.startY - window.innerHeight / 2;
            paper.element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${paper.startRotation}deg)`;
        });

        updatePapers();

        window.addEventListener('resize', () => {
            papers.forEach((paper) => {
                const startPosition = getEdgePosition(paperInfo[Math.floor(Math.random() * paperInfo.length)]);
                const finalPosition = getFinalPosition(paperInfo[Math.floor(Math.random() * paperInfo.length)].edge);
                paper.startX = startPosition?.x || 0;
                paper.startY = startPosition?.y || 0;
                paper.finalX = finalPosition.x;
                paper.finalY = finalPosition.y;
            });
        });
    }, 0);

    return (
        <div className="h-[500vh] bg-[#111111] text-white">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen flex justify-center items-center overflow-hidden">
                {paperInfo.map((info, i) => (
                    <div
                        key={i}
                        className="paper absolute bg-[#1a1a1a] shadow-lg transform-gpu flex flex-col justify-start items-start p-5 rounded overflow-hidden border border-white/10"
                        style={{
                            width: '290px',  // Fixed width for all cards
                            height: '360px', // Fixed height for all cards
                            willChange: 'transform',
                            opacity: 0.99
                        }}
                    >
                        <img
                            src={info.image}
                            alt={info.title}
                            className="w-[calc(100%+40px)] h-[180px] object-cover -mx-5 -mt-5 mb-4 filter grayscale-[20%] contrast-120"
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
                <p className="reveal-text w-1/2 z-2 text-white fixed bottom-5 left-5 transition-opacity duration-300">
                    We offer a comprehensive suite of digital services, from strategic planning and brand development to
                    technical implementation and user experience design. Our capabilities span the full spectrum of modern
                    digital needs, helping businesses thrive in today's connected world.
                </p>
            </div>
        </div>
    );
};

export default ServicesSection;