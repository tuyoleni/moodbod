"use client";

import React from "react";
import { useState, useEffect } from "react";
import { BiSolidStar } from "react-icons/bi";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type ImageProps = {
  src: string;
  alt?: string;
};

type Testimonial = {
  numberOfStars: number;
  quote: string;
  avatar: ImageProps;
  name: string;
  position: string;
};

type Props = {
  heading: string;
  description: string;
  testimonials: Testimonial[];
};

export type TestimonialsProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

// Data
const testimonialsData = {
  heading: "Customer Testimonials",
  description: "Transformative experience with exceptional service!",
  testimonials: [
    {
      numberOfStars: 5,
      quote:
        "Really a great agency they build me a website for my business. The team was professional, responsive, and delivered exactly what I needed. My website looks amazing and has helped grow my business significantly.",
      avatar: {
        src: "/images/testimonials/testimonial-nyanyu.jpg",
        alt: "Nyanyu business owner testimonial for MoodBod website development",
      },
      name: "Nyanyu",
      position: "Business Owner",
    },
    {
      numberOfStars: 5,
      quote:
        "Moodbod delivered exactly what my business needed, custom tech solutions tailored to my goals and needs. Their team is professional, responsive, and truly invested in helping clients grow.",
      avatar: {
        src: "/images/testimonials/testimonial-lorraine.jpg",
        alt: "Lorraine - Business owner testimonial for MoodBod custom tech solutions",
      },
      name: "Lorraine",
      position: "Business Owner",
    },
    {
      numberOfStars: 5,
      quote:
        "Good services and friendly guys. The team at MoodBod really understands what businesses need and delivers quality solutions with a personal touch. Highly recommended for anyone looking for reliable tech services.",
      avatar: {
        src: "/images/testimonials/testimonial-erastus.jpg",
        alt: "Erastus - Client testimonial for MoodBod friendly service",
      },
      name: "Erastus",
      position: "Business Owner",
    },
  ],
};

export const Testimonials = (props: TestimonialsProps) => {
  const { heading, description, testimonials } = {
    ...testimonialsData,
    ...props,
  };

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section
      id="testimonials"
      className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container mx-auto">
        <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-4xl font-medium font-heading md:mb-6">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            {description}
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
          className="overflow-hidden"
        >
          <div className="relative pb-20 md:pb-24">
            <CarouselContent className="ml-0">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-0 lg:basis-1/2 lg:pr-16"
                >
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-0 flex w-full items-center justify-between">
              <div className="mt-5 flex w-full items-start justify-start">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`mx-[3px] inline-block size-2 rounded-full ${
                      current === index + 1 ? "bg-black" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-end justify-end gap-2 md:gap-4">
                <CarouselPrevious className="static right-0 top-0 size-10 -translate-y-0 rounded-md" />
                <CarouselNext className="static right-0 top-0 size-10 -translate-y-0 rounded-md" />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="flex h-full max-w-lg flex-col justify-center">
      <div className="mb-6 flex md:mb-8">
        {Array(testimonial.numberOfStars)
          .fill(null)
          .map((_, starIndex) => (
            <BiSolidStar key={starIndex} className="size-6 text-yellow-400" />
          ))}
      </div>
      <blockquote className="text-base font-medium font-sans leading-relaxed">
        {testimonial.quote}
      </blockquote>
      <div className="mt-6 flex w-full flex-col gap-5 md:mt-8 md:w-auto md:flex-row md:items-center md:text-left">
        <div className="relative">
          <Image
            src={testimonial.avatar.src}
            alt={testimonial.avatar.alt || ""}
            width={56}
            height={56}
            className="size-14 min-h-14 min-w-14 rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <div
            className="size-14 min-h-14 min-w-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600"
            style={{ display: "none" }}
          >
            {testimonial.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="mb-4 md:mb-0">
          <p className="font-semibold font-sans">{testimonial.name}</p>
          <p className="text-muted-foreground font-sans">
            {testimonial.position}
          </p>
        </div>
      </div>
    </div>
  );
};
