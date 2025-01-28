'use client';

import HorizontalScroll from "@/components/effects/HorizontalScroll";

const scrollingTexts = [
    { text: "Modern Design • Creative Solutions • Digital Excellence • Smart Innovation •", direction: 'rtl', speed: 0.3 },
    { text: "Future Forward • Bold Ideas • Clean Code • Perfect Execution •", direction: 'ltr', speed: 0.5 },
    { text: "Innovation First • Digital Dreams • Creative Code • Smart Design •", direction: 'rtl', speed: 0.1 },
    { text: "Bold Excellence • Perfect Solutions • Modern Ideas • Forward Thinking •", direction: 'ltr', speed: 0.2 },
    { text: "Design Forward • Smart Solutions • Bold Excellence • Creative Innovation •", direction: 'rtl', speed: 0.3 },
    { text: "Digital Ideas • Modern Execution • Perfect Dreams • Clean Innovation •", direction: 'ltr', speed: 0.4 },
];

export default function ScrollingText() {
    return (
        <section className="w-full h-screen sticky top-0 overflow-hidden">
            <div className="w-full h-full flex flex-col justify-center items-center uppercase text-white bg-black">
                {scrollingTexts.map((item, index) => (
                    <HorizontalScroll
                        key={index}
                        className="w-[150vw]"
                        speed={item.speed}
                    >
                        <p className="text-[80pt] font-black leading-[1] whitespace-nowrap transform-gpu">
                            {item.text}
                        </p>
                    </HorizontalScroll>
                ))}
            </div>
        </section>
    );
} 