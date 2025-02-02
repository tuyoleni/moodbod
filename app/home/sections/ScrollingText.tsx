'use client';

import HorizontalScroll from "@/components/effects/HorizontalScroll";

const scrollingTexts = [
    { text: "Modern Design • Creative Solutions • Digital Excellence • Smart Innovation • Web Mastery • Mobile First •", direction: 'rtl', speed: 0.3 },
    { text: "Future Forward • Bold Ideas • Clean Code • Perfect Execution • Technical Excellence • Cloud Native •", direction: 'ltr', speed: 0.5 },
    { text: "Innovation First • Digital Dreams • Creative Code • Smart Design • User Experience • Rapid Growth •", direction: 'rtl', speed: 0.1 },
    { text: "Bold Excellence • Perfect Solutions • Modern Ideas • Forward Thinking • Growth Focus • Market Ready •", direction: 'ltr', speed: 0.2 },
    { text: "Design Forward • Smart Solutions • Bold Excellence • Creative Innovation • Brand Building • SEO Ready •", direction: 'rtl', speed: 0.3 },
    { text: "Digital Ideas • Modern Execution • Perfect Dreams • Clean Innovation • Custom Solutions • Fast Deploy •", direction: 'ltr', speed: 0.4 },
    { text: "Strategic Vision • Elegant Design • Seamless Integration • Quality Code • Business Growth • AI Ready •", direction: 'rtl', speed: 0.2 },
    { text: "Creative Excellence • Digital Mastery • Smart Solutions • Perfect Results • Client Success • Full Stack •", direction: 'ltr', speed: 0.3 },
    { text: "Pixel Perfect • User Focused • Performance First • Modern Stack • Cloud Ready • Always Secure •", direction: 'rtl', speed: 0.4 },
    { text: "Design Systems • API First • Mobile Ready • Web Scale • Fast Loading • Best Practices •", direction: 'ltr', speed: 0.2 },
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
                        <p className="text-[60pt] font-black leading-[1] whitespace-nowrap transform-gpu">
                            {item.text}
                        </p>
                    </HorizontalScroll>
                ))}
            </div>
        </section>
    );
} 