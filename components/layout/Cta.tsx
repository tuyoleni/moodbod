"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

interface CtaProps {
  title?: string;
  description?: string;
  buttonText?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const defaultProps: Required<CtaProps> = {
  title: "Let's Transform Your Business Together",
  description:
    "Let's work together to create innovative solutions that drive your business forward. Get started today and see the difference we can make.",
  buttonText: "Discover What is Possible",
  imageSrc: "/images/cta/cta-main.jpg",
  imageAlt:
    "Business transformation and digital innovation with MoodBod solutions",
};

export function Cta({
  title = defaultProps.title,
  description = defaultProps.description,
  buttonText = defaultProps.buttonText,
  imageSrc = defaultProps.imageSrc,
  imageAlt = defaultProps.imageAlt,
}: CtaProps = {}) {
  return (
    <section className="bg-gray-50 px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-4xl font-medium font-heading mb-5 md:mb-6">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button>{buttonText}</Button>
            </div>
          </div>
          <div>
            <Image
              src={imageSrc}
              width={600}
              height={400}
              className="w-full rounded-lg object-cover"
              alt={imageAlt}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
