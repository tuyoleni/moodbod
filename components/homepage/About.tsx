"use client";

import { Button } from "@/components/ui/button";
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
  image: ImageProps;
};

export type AboutProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const About = (props: AboutProps) => {
  const { heading, description, image } = {
    ...AboutDefaults,
    ...props,
  };

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      <div className="px-[5%] py-20 md:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            {/* Content */}
            <motion.div 
              className="space-y-8"
              style={{ y, opacity }}
            >
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                  {heading}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={image.src}
                  alt={image.alt || ""}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutDefaults: Props = {
  heading: "Building the future of digital experiences",
  description:
    "We create innovative solutions that help businesses thrive in the digital age. Our team combines creativity with cutting-edge technology to deliver exceptional results that drive growth and success.",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    alt: "About section image",
  },
};
