'use client';

import HeaderSection from "./sections/HeaderSection";
import ScrollingText from "./sections/ScrollingText";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import { RouteSection } from "./sections/RouteSection";
import { CTASection } from "./sections/CTASection";

interface Props {
    onCTAVisibilityChange: (isVisible: boolean) => void;
}

export default function Home({ onCTAVisibilityChange }: Props) {
    return (
        <main className="w-full relative scroll-smooth">
            <section
                className="h-[180vh] sm:h-[220vh] md:h-[280vh] max-w-none sm:max-w-full"
                id="hero"
                aria-label="Hero section"
            >
                <HeaderSection />
            </section>

            <section
                className="h-[300vh] sm:h-[350vh] md:h-[400vh] bg-black max-w-none sm:max-w-full"
                id="intro"
                aria-label="Introduction"
            >
                <ScrollingText />
            </section>

            <section
                className="h-[300vh] sm:h-[350vh] md:h-[350vh]"
                id="about"
                aria-label="About us"
            >
                <AboutSection />
            </section>

            <section
                className="h-[300vh]"
                id="services"
                aria-label="Our services"
            >
                <ServicesSection />
            </section>

            <section
                className=""
                id="route"
                aria-label="How we work"
            >
                <RouteSection />
            </section>

            <section
                className=""
                id="cta"
                aria-label="Contact us"
            >
                <CTASection onVisibilityChange={onCTAVisibilityChange} />
            </section>

            {/* <section
                className=""
                id="maintenance"
                aria-label="Maintenance services"
            >
                <MaintenanceSection />
            </section> */}
        </main>
    );
}