'use client';

import HorizontalScroll from "@/components/effects/HorizontalScroll";

const scrollingTexts = [
    { text: "We Design We Build We Create •", direction: 'rtl', speed: 0.3 },
    { text: "Digital Products Web Apps Mobile Apps •", direction: 'ltr', speed: 0.5 },
    { text: "Transform Innovate Create •", direction: 'rtl', speed: 0.1 },
    { text: "Your Vision Our Mission •", direction: 'ltr', speed: 0.2 },
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
                        maxScrollWidth={10}
                    >
                        <p className="text-[100pt] font-black leading-[1] whitespace-nowrap transform-gpu">
                            {item.text}
                        </p>
                    </HorizontalScroll>
                ))}
            </div>
        </section>
    );
} 