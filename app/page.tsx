'use client';

import AboutSection from './sections/AboutSection';
import Header from './sections/Header';
import MaintenanceSection from './sections/MaintenanceSection';
import ScrollingText from './sections/ScrollingText';
import ServicesSection from './sections/ServicesSection';

export default function HomePage() {
  return (
    <main className="w-full relative scroll-smooth">
      <section
        className="h-[180vh] sm:h-[220vh] md:h-[280vh] max-w-none sm:max-w-full"
        id="hero"
        aria-label="Hero section"
      >
        <Header />
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
        id="maintenance"
        aria-label="Maintenance services"
      >
        <MaintenanceSection />
      </section>
    </main>
  );
}