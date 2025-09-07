"use client";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React from "react";

type ImageProps = {
  src: string;
  alt: string;
};

type Props = {
  images: ImageProps[];
};

export type HeroProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Hero = (props: HeroProps) => {
  const { images } = {
    ...HeroDefaults,
    ...props,
  };

  const title = "Helping your business grow through creative ideas";
  const description =
    "Creative ideas and thoughtful software come together to help businesses grow and change. When unique visions are understood and collaboration happens, real progress and lasting impact follow.";
  const buttons = [
    {
      title: "Discover What is Possible",
      variant: "default" as const,
    },
  ];

  const isMobile = useMediaQuery("(max-width: 767px)");
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Create transforms directly with useTransform hooks
  const leftImageGroupX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isMobile
      ? ["0vw", "0vw", "-25vw", "-25vw"]
      : ["0vw", "0vw", "-32vw", "-32vw"]
  );

  const centerImageContainerX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isMobile
      ? ["0vw", "0vw", "-25vw", "-25vw"]
      : ["0vw", "0vw", "-32vw", "-32vw"]
  );

  const centerImageContainerWidth = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isMobile
      ? ["50vw", "50vw", "100vw", "100vw"]
      : ["36vw", "36vw", "100vw", "100vw"]
  );

  const centerImageContainerHeight = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isMobile
      ? ["60vh", "60vh", "100vh", "100vh"]
      : ["80vh", "80vh", "100vh", "100vh"]
  );

  const rightImageGroupX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isMobile ? ["0vw", "0vw", "25vw", "25vw"] : ["0vw", "0vw", "32vw", "32vw"]
  );

  const leftImageGroup = {
    x: leftImageGroupX,
  };

  const centerImageContainer = {
    x: centerImageContainerX,
    width: centerImageContainerWidth,
    height: centerImageContainerHeight,
  };

  const rightImageGroup = {
    x: rightImageGroupX,
  };

  return (
    <section ref={sectionRef} className="relative h-[250vh]">
      <div className="px-[5%] pt-16 md:pt-24 lg:pt-28">
        <div className="container">
          <div className="mx-auto w-full max-w-3xl text-center">
            <h1 className="text-5xl font-medium font-heading mb-5 md:mb-6">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {description}
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} variant={button.variant}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <div className="z-10 grid h-[60vh] w-full grid-flow-col grid-cols-[25%_50%_25%] content-center items-center justify-center md:h-[70vh] md:grid-cols-[32%_36%_32%] lg:h-[80vh]">
          <motion.div
            className="grid grid-flow-col grid-cols-1 items-center justify-items-end gap-4 justify-self-end px-4"
            style={leftImageGroup}
          >
            <div className="relative hidden md:block md:w-[25vw] lg:w-[20vw]">
              <Image
                className="aspect-[2/3] w-full object-cover rounded-lg"
                width={400}
                height={600}
                src={images[0].src}
                alt={images[0].alt}
              />
            </div>

            <div className="relative grid w-[40vw] grid-cols-1 grid-rows-[auto_auto] gap-4 self-center md:w-[18vw]">
              <div className="relative">
                <Image
                  className="aspect-square w-full object-cover rounded-lg"
                  width={400}
                  height={400}
                  src={images[1].src}
                  alt={images[1].alt}
                />
              </div>
              <div className="relative">
                <Image
                  className="aspect-[3/4] w-full object-cover rounded-lg"
                  width={400}
                  height={533}
                  src={images[2].src}
                  alt={images[2].alt}
                />
              </div>
            </div>
          </motion.div>

          <motion.div className="relative" style={centerImageContainer}>
            <Image
              className="size-full object-cover rounded-lg"
              width={800}
              height={600}
              src={images[3].src}
              alt={images[3].alt}
            />
          </motion.div>

          <motion.div
            className="grid grid-flow-col items-center justify-items-start gap-4 justify-self-start px-4"
            style={rightImageGroup}
          >
            <div className="relative grid w-[40vw] grid-cols-1 grid-rows-[auto_auto] gap-4 self-center md:w-[18vw]">
              <div className="relative w-[40vw] sm:w-auto">
                <Image
                  className="aspect-[3/4] w-full object-cover rounded-lg"
                  width={400}
                  height={533}
                  src={images[4].src}
                  alt={images[4].alt}
                />
              </div>
              <div className="relative w-[40vw] sm:w-auto">
                <Image
                  className="aspect-square w-full object-cover rounded-lg"
                  width={400}
                  height={400}
                  src={images[5].src}
                  alt={images[5].alt}
                />
              </div>
            </div>

            <div className="relative hidden md:block md:w-[25vw] lg:w-[20vw]">
              <Image
                className="aspect-[2/3] w-full object-cover rounded-lg"
                width={400}
                height={600}
                src={images[6].src}
                alt={images[6].alt}
              />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 mt-[100vh]" />
    </section>
  );
};

export const HeroDefaults: Props = {
  images: [
    {
      src: "/images/hero/hero-left-portrait.jpg",
      alt: "Professional team collaboration and creative brainstorming session at MoodBod digital agency",
    },
    {
      src: "/images/hero/hero-left-square.jpg",
      alt: "Modern web development workspace with designer working on innovative digital solutions",
    },
    {
      src: "/images/hero/hero-left-rectangle.jpg",
      alt: "Cutting-edge mobile app development and user experience design process",
    },
    {
      src: "/images/hero/hero-center-main.jpg",
      alt: "MoodBod digital transformation services - helping businesses grow through creative technology solutions",
    },
    {
      src: "/images/hero/hero-right-rectangle.jpg",
      alt: "Strategic digital marketing and brand development consultation session",
    },
    {
      src: "/images/hero/hero-right-square.jpg",
      alt: "Innovative software development and custom business application creation",
    },
    {
      src: "/images/hero/hero-right-portrait.jpg",
      alt: "Successful client presentation showcasing digital growth and business transformation results",
    },
    {
      src: "/images/hero/hero-extra.jpg",
      alt: "MoodBod comprehensive digital services portfolio and client success stories",
    },
  ],
};
