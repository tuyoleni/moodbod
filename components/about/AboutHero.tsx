"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-4xl text-center">
        <h1 className="mb-8 font-heading text-[80px] font-bold leading-[1.1] sm:text-[100px] md:mb-12 md:text-[120px] lg:text-[140px]">
          <span className="block">Empowering</span>
          <span className="block">Digital</span>
          <span className="block">Growth</span>
        </h1>

        <p className="mb-8 text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-2xl mx-auto">
          At Moodbod, we blend creativity and technology to drive meaningful
          change for businesses everywhere.
        </p>

        <Button
          size="lg"
          className="px-8 py-3 text-base md:px-10 md:py-4 md:text-lg"
        >
          Discover What is Possible
        </Button>
      </div>

      {/* Simple floating images */}
      <div className="absolute top-20 right-8 w-32 h-20 opacity-60 hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=120&fit=crop&crop=center"
          alt="Team collaboration"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="absolute top-40 right-20 w-24 h-16 opacity-50 hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=100&fit=crop&crop=center"
          alt="Data analytics"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </section>
  );
}
