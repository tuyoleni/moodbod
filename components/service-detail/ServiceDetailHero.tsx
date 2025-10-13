/**
 * ServiceDetailHero Component
 * Original Relume component: Header47 (header-47.jsx)
 * Adapted from service page stub to match site design patterns
 */

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface ServiceDetailHeroProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
}

export function ServiceDetailHero({
  title,
  description,
  primaryButton,
  secondaryButton,
}: ServiceDetailHeroProps) {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col gap-5 md:flex-row md:gap-12 lg:gap-20">
          <div className="w-full ">
            <h1 className="font-heading text-6xl font-extrabold md:text-8xl lg:text-9xl leading-[0.8] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
          <div className="w-full md:w-1/2 lg:w-3/5">
            <p className="text-lg text-muted-foreground font-sans leading-relaxed md:text-md">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button asChild>
                <Link href={primaryButton.href}>{primaryButton.text}</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
