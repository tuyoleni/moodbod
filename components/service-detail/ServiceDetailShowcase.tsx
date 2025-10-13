/**
 * ServiceDetailShowcase Component
 * Original Relume component: Layout90 (layout-90.jsx)
 * Adapted from service page stub to match site design patterns
 */

"use client";

import Image from "next/image";
import React from "react";

interface ServiceDetailShowcaseProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export function ServiceDetailShowcase({
  title,
  description,
  image,
  imageAlt,
}: ServiceDetailShowcaseProps) {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-8 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <h3 className="font-heading text-3xl font-medium">{title}</h3>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            {description}
          </p>
        </div>
        <Image
          src={image}
          alt={imageAlt}
          width={1200}
          height={600}
          className="w-full rounded-lg object-cover"
        />
      </div>
    </section>
  );
}
