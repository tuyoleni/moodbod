'use client';

import HorizontalScroll from "@/components/effects/HorizontalScroll";

export default function Header() {
    return (
        <header className="w-full h-screen sticky top-0 overflow-hidden">
            <HorizontalScroll
                className="h-full w-[300vw] flex flex-row"
                speed={1.5}>
                <div className="w-screen h-full bg-white z-10" />
                <div className="w-screen h-full bg-black z-30 transform-gpu" />
            </HorizontalScroll>

            <div className="w-full h-screen flex justify-center items-center px-8 z-10 absolute top-0 left-0 text-white [mix-blend-mode:difference] ">
                <div className="flex flex-col justify-between gap-20 max-w-[95vw] mt-28">
                    <h1 className="text-[clamp(120px,20vw,250px)] font-black tracking-[-28px] leading-[0.75] flex flex-wrap">
                        <span>MOOD</span>
                        <span>BOD</span>
                    </h1>
                    <p className="max-w-[280px] sm:max-w-[350px] md:max-w-[450px] xl:max-w-[500px] px-3">
                        Turning your big ideas into reality with cool websites, apps, and online
                        visibility. We listen, create, and help you grow.
                    </p>
                </div>
            </div>
        </header>
    );
}