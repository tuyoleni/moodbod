/**
 * ServiceDetailContent Component
 * Original Relume component: Layout3 (layout-03.jsx)
 * Adapted from service page stub to match site design patterns
 */

"use client";

import Image from "next/image";
import React from "react";

interface ServiceDetailContentProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export function ServiceDetailContent({
  title,
  description,
  image,
  imageAlt,
}: ServiceDetailContentProps) {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="font-heading text-4xl font-bold mb-5 md:mb-6 md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed md:text-md">
              {description}
            </p>
          </div>
          <div>
            <Image
              src={image}
              alt={imageAlt}
              width={600}
              height={400}
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
