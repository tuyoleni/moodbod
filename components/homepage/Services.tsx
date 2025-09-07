"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

type ImageProps = {
  src: string;
  alt?: string;
};

type FeatureProps = {
  tagline: string;
  url: string;
  image: ImageProps;
  heading: string;
  description: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  features: FeatureProps[];
};

export type ServicesProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

const slideVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
  },
};

export const Services = (props: ServicesProps) => {
  const { tagline, heading, description, features } = {
    ...ServicesDefaults,
    ...props,
  };

  const [hoveredFeatureIdx, setHoveredFeatureIdx] = useState<number | null>(
    null
  );

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className=" mb-12 w-full max-w-lg text-left md:mb-18 lg:mb-20">
          <p className="mb-3 text-sm font-semibold text-muted-foreground font-sans md:mb-4">
            {tagline}
          </p>
          <h2 className="mb-5 text-4xl font-medium font-heading md:mb-6">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-6 md:gap-8 lg:flex-row">
          {features.map((feature, index) => (
            <a
              key={index}
              href={feature.url}
              className="relative flex w-full flex-col overflow-hidden rounded-lg lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
              onMouseEnter={() => setHoveredFeatureIdx(index)}
              onMouseLeave={() => setHoveredFeatureIdx(null)}
            >
              <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt || ""}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              </div>
              <div className="group relative flex h-full min-h-[70vh] flex-col justify-end p-6 md:p-8">
                <div className="z-10">
                  <p className="mb-2 text-sm font-semibold text-white font-sans">
                    {feature.tagline}
                  </p>
                  <h3 className="text-2xl font-medium text-white font-heading">
                    {feature.heading}
                  </h3>
                  <div className="lg:hidden">
                    <p className="mt-5 text-white text-lg font-sans leading-relaxed md:mt-6">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <AnimatePresence>
                  {hoveredFeatureIdx === index && (
                    <motion.div
                      className="z-10 hidden lg:block lg:w-[340px]"
                      variants={slideVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="mt-5 text-white text-lg font-sans leading-relaxed md:mt-6">
                        {feature.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ServicesDefaults: Props = {
  tagline: "Innovative",
  heading: "Our Core Services",
  description: "Custom software that adapts to your business needs.",
  features: [
    {
      tagline: "Mobile",
      url: "#",
      heading: "Stay Connected with Mobile Apps",
      description:
        "Engage your customers anytime, anywhere with our user-friendly mobile app solutions.",
      image: {
        src: "/images/services/service-mobile-apps.jpg",
        alt: "Modern mobile app development with smartphone interface design and user experience optimization",
      },
    },
    {
      tagline: "Smart",
      url: "#",
      heading: "AI & Automation for Better Decisions",
      description:
        "Leverage AI to enhance decision-making and streamline your business processes.",
      image: {
        src: "/images/services/service-ai-automation.jpg",
        alt: "Artificial intelligence and automation technology with data analytics and machine learning visualization",
      },
    },
    {
      tagline: "E-commerce",
      url: "#",
      heading: "Empower Your Business with E-commerce Solutions",
      description:
        "Reach more customers with our flexible and easy-to-use online platforms.",
      image: {
        src: "/images/services/service-ecommerce.jpg",
        alt: "Modern e-commerce platform with online shopping cart, payment processing, and digital storefront design",
      },
    },
  ],
};
