'use client';

import Header from "./sections/Header";
import ScrollingText from "./sections/ScrollingText";

export default function HomePage() {
  return (
    <main className="w-full relative scroll-smooth">
      <div className="h-[180vh] sm:h-[220vh] md:h-[280vh]">
        <Header />
      </div>

      <div className="h-[300vh] sm:h-[350vh] md:h-[400vh]">
        <ScrollingText />
      </div>

      <div className="h-[150vh] sm:h-[175vh] md:h-[200vh]">
        <div className="sticky top-0 w-full h-screen bg-blue-200 flex justify-center items-center">
          <h2 className="text-4xl font-bold">Sticky Section</h2>
        </div>
      </div>
    </main>
  );
}