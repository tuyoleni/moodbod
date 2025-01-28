'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AboutSection from './sections/AboutSection';
import Header from './sections/Header';
import QuoteSection from './sections/QuoteSection';
import { RouteSection } from './sections/RouteSection';
import ScrollingText from './sections/ScrollingText';

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionIds = ['Header', 'ScrollingText', 'AboutSection', 'QuoteSection', 'RouteSection'];

  const scrollToNextSection = () => {
    const nextSection = currentSection + 1;
    if (nextSection < sectionIds.length) {
      setCurrentSection(nextSection);
      const nextElement = document.getElementById(sectionIds[nextSection]);
      nextElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToNextSection();
    }, 5000); // Scroll every 5 seconds

    return () => clearInterval(interval);
  }, [currentSection]);

  return (
    <main className="w-full relative scroll-smooth">
      <motion.div
        id="Header"
        className="h-[180vh] sm:h-[220vh] md:h-[280vh] max-w-none sm:max-w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Header />
      </motion.div>

      <motion.div
        id="ScrollingText"
        className="h-[300vh] sm:h-[350vh] md:h-[400vh] bg-black max-w-none sm:max-w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <ScrollingText />
      </motion.div>

      <motion.div
        id="AboutSection"
        className="h-[300vh] sm:h-[350vh] md:h-[350vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AboutSection />
      </motion.div>

      <motion.div
        id="QuoteSection"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <QuoteSection />
      </motion.div>

      <motion.div
        id="RouteSection"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <RouteSection />
      </motion.div>
    </main>
  );
}