"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="mb-8 font-heading text-[60px] font-bold leading-[1.1] sm:text-[70px] md:mb-12 md:text-[80px] lg:text-[90px]">
          Empowering{" "}
          <span
            className="inline-block w-20 h-20 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=center')",
            }}
          ></span>{" "}
          Digital{" "}
          <span
            className="inline-block w-20 h-20 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center')",
            }}
          ></span>{" "}
          Growth
        </h1>

        <p className="mb-8 text-lg text-muted-foreground font-sans leading-relaxed max-w-2xl mx-auto">
          At Moodbod, we blend creativity and technology to drive meaningful
          change for businesses everywhere.
        </p>

        <Button>Discover What is Possible</Button>
      </div>
    </section>
  );
}
