"use client";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React from "react";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: Array<{
    title: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
  }>;
  image: ImageProps;
};

export type FeaturesProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Features = (props: FeaturesProps) => {
  const { heading, description, buttons, image } = {
    ...FeaturesDefaults,
    ...props,
  };

  const isMobile = useMediaQuery("(max-width: 767px)");

  const { scrollYProgress } = useScroll();
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  return (
    <section className="relative md:min-h-screen">
      <div className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container mx-auto">
          <div className="mb-12 grid grid-cols-1 items-start gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20 lg:gap-y-16">
            <h1 className="text-4xl font-medium font-heading">{heading}</h1>
            <div className="mx-[7.5%] self-end md:mt-48">
              <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                {description}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                {buttons.map((button, index) => (
                  <Button key={index} variant={button.variant}>
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <motion.div
            className="flex origin-top-right flex-col items-end justify-center md:h-[60vh] lg:h-[80vh] lg:justify-start"
            style={{ scale: isMobile ? 1 : videoScale }}
          >
            <Image
              src={image.src}
              alt={image.alt || ""}
              width={800}
              height={600}
              className="size-full object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const FeaturesDefaults: Props = {
  heading: "Custom Software Solutions for Your Unique Business",
  description:
    "Every business operates in its own way, and we believe your software should reflect that individuality. Our custom solutions are crafted to seamlessly integrate with your workflows, enhancing efficiency and adaptability.",
  buttons: [
    { title: "Read More" },
    { title: "Start a Project", variant: "secondary" },
  ],
  image: {
    src: "/images/features/features-main.jpg",
    alt: "Custom software solutions and business innovation with modern technology development workspace",
  },
};
