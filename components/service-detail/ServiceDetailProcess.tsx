/**
 * ServiceDetailProcess Component
 * Original Relume component: Layout246 (layout-246.jsx)
 * Adapted from service page stub to match site design patterns
 */

"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

interface ServiceDetailProcessProps {
  title: string;
  description: string;
  steps: Array<{
    title: string;
    description: string;
    buttonText: string;
  }>;
}

export function ServiceDetailProcess({
  title,
  description,
  steps,
}: ServiceDetailProcessProps) {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <h2 className="font-heading text-3xl font-medium">{title}</h2>
          </div>
          <div>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="mb-5 md:mb-6">
                <div className="size-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {index + 1}
                  </span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-medium mb-3 md:mb-4">
                {step.title}
              </h3>
              <p>{step.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                <Button variant="link" className="flex items-center gap-2">
                  {step.buttonText}
                  <RxChevronRight className="text-foreground" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
