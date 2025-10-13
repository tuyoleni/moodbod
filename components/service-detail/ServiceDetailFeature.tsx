/**
 * ServiceDetailFeature Component
 * Original Relume component: Layout4 (layout-04.jsx)
 * Adapted from service page stub to match site design patterns
 */

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

interface ServiceDetailFeatureProps {
  tagline: string;
  title: string;
  description: string;
  benefits: Array<{
    title: string;
    description: string;
  }>;
  image: string;
  imageAlt: string;
}

export function ServiceDetailFeature({
  tagline,
  title,
  description,
  benefits,
  image,
  imageAlt,
}: ServiceDetailFeatureProps) {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="font-heading text-4xl font-medium mb-5 md:mb-6">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed mb-6 md:mb-8">
              {description}
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index}>
                  <h6 className="font-heading text-lg font-medium mb-3 md:mb-4">
                    {benefit.title}
                  </h6>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Learn More" variant="secondary">
                Learn More
              </Button>
              <Button
                title="Get Started"
                variant="link"
                className="flex items-center gap-2"
              >
                Get Started
                <RxChevronRight className="text-foreground" />
              </Button>
            </div>
          </div>
          <div>
            <Image
              src={image}
              alt={imageAlt}
              width={600}
              height={400}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
