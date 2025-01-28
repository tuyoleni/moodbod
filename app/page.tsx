'use client';

import AboutSection from './sections/AboutSection';
import Header from './sections/Header';
import MaintenanceSection from './sections/MaintenanceSection';
import ScrollingText from './sections/ScrollingText';

export default function HomePage() {
  return (
    <main className="w-full relative scroll-smooth">
      <div className="h-[180vh] sm:h-[220vh] md:h-[280vh] max-w-none sm:max-w-full">
        <Header />
      </div>

      <div className="h-[300vh] sm:h-[350vh] md:h-[400vh] bg-black max-w-none sm:max-w-full">
        <ScrollingText />
      </div>

      <div className="h-[300vh] sm:h-[350vh] md:h-[350vh]">
        <AboutSection />
      </div>

      <MaintenanceSection />
    </main>
  );
}