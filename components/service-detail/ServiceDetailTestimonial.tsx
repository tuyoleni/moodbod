/**
 * ServiceDetailTestimonial Component
 * Original Relume component: Testimonial15 (testimonial-15.jsx)
 * Adapted from service page stub to match site design patterns
 */

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiSolidStar } from "react-icons/bi";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  companyLogo: string;
  image: string;
  imageAlt: string;
}

interface ServiceDetailTestimonialProps {
  testimonials: Testimonial[];
}

/**
 * useCarousel hook
 * Handles carousel state, dot navigation, and Embla API integration
 */
const useCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    // Initialize current slide
    setCurrent(api.selectedScrollSnap() + 1);

    // Listener for slide selection
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);

    // Cleanup listener to prevent memory leaks
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const handleDotClick = (index: number) => () => {
    api?.scrollTo(index);
  };

  const dotClassName = (index: number) =>
    `mx-[3px] inline-block size-2 rounded-full ${current === index + 1 ? "bg-foreground" : "bg-foreground/20"
    }`;

  return { api, setApi, current, handleDotClick, dotClassName };
};

/**
 * ServiceDetailTestimonial component
 */
export function ServiceDetailTestimonial({
  testimonials,
}: ServiceDetailTestimonialProps) {
  const carousel = useCarousel();

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <Carousel
          setApi={carousel.setApi}
          opts={{ loop: true, align: "start" }}
          className="overflow-hidden"
        >
          <div className="relative pt-20 md:pt-0 md:pb-20">
            <CarouselContent className="ml-0">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-0">
                  <div className="grid w-full auto-cols-fr grid-cols-1 items-center justify-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-x-20">
                    <div className="order-last md:order-first">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.imageAlt}
                        width={400}
                        height={400}
                        className="aspect-square w-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="mb-6 flex md:mb-8">
                        {[...Array(5)].map((_, i) => (
                          <BiSolidStar
                            key={i}
                            className="size-6 text-yellow-400"
                          />
                        ))}
                      </div>
                      <blockquote className="font-heading text-xl font-medium">
                        “{testimonial.quote}”
                      </blockquote>
                      <div className="mt-6 flex flex-nowrap items-center gap-5 md:mt-8">
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p>
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                        <div className="mx-4 w-px self-stretch bg-border sm:mx-0" />
                        <div>
                          <Image
                            src={testimonial.companyLogo}
                            alt={`${testimonial.company} logo`}
                            width={120}
                            height={48}
                            className="max-h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Dots + Navigation */}
            <div className="absolute top-0 flex w-full items-start justify-between md:top-auto md:bottom-0 md:items-end">
              <div className="mt-2.5 flex w-full items-start justify-start md:mt-0 md:mb-2.5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={carousel.handleDotClick(index)}
                    className={carousel.dotClassName(index)}
                  />
                ))}
              </div>
              <div className="flex items-end justify-end gap-2 md:gap-4">
                <CarouselPrevious className="static top-0 right-0 size-12 -translate-y-0" />
                <CarouselNext className="static top-0 right-0 size-12 -translate-y-0" />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
