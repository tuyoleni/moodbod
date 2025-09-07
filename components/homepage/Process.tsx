"use client";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
// import { RxChevronRight } from "react-icons/rx"; // Unused import removed

interface ContentBlockProps {
  index: number;
  setCurrentImageIndex: (index: number) => void;
  children: React.ReactNode;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  index,
  setCurrentImageIndex,
  children,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.33, 0.5, 0.66, 0.83],
    [0, 0, 1, 1, 0]
  );

  const handleVisibilityChange = useCallback(
    (index: number, isVisible: boolean) => {
      if (isVisible) {
        setCurrentImageIndex(index);
      }
    },
    [setCurrentImageIndex]
  );

  useEffect(() => {
    const unsubscribe = opacity.on("change", (v) => {
      handleVisibilityChange(index, v > 0.5);
    });
    return () => unsubscribe();
  }, [opacity, index, setCurrentImageIndex, handleVisibilityChange]);

  return (
    <div className="md:h-svh">
      <motion.div
        ref={blockRef}
        animate={isMobile ? { opacity: 1 } : undefined}
        style={!isMobile ? { opacity } : undefined}
        className="flex flex-col items-start justify-center md:justify-start"
      >
        {children}
      </motion.div>
    </div>
  );
};

interface CurrentImageProps {
  currentImageIndex: number;
  contentBlocks: Array<{
    image: {
      src: string;
      alt: string;
    };
  }>;
}

const CurrentImage: React.FC<CurrentImageProps> = ({
  currentImageIndex,
  contentBlocks,
}) => {
  return (
    <Image
      src={contentBlocks[currentImageIndex].image.src}
      alt={contentBlocks[currentImageIndex].image.alt}
      width={600}
      height={800}
      className="object-cover size-full rounded-lg"
    />
  );
};

const useProcess = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return { currentImageIndex, setCurrentImageIndex };
};

export function Process() {
  const useActive = useProcess();
  const contentBlocks = [
    {
      tagline: "Create",
      heading: "Our Commitment to Innovation",
      description:
        "We prioritize collaboration to deliver tailored solutions that resonate with your unique business needs.",
      buttons: [{ title: "Start Creating", variant: "secondary" as const }],
      image: {
        src: "/images/process/process-collaborate.jpg",
        alt: "Innovation commitment and collaborative tailored business solutions development",
      },
    },
    {
      tagline: "Connect",
      heading: "Our Values in Action",
      description:
        "Integrity, creativity, and inclusivity drive our approach to digital transformation.",
      buttons: [{ title: "Connect With Us", variant: "secondary" as const }],
      image: {
        src: "/images/process/process-connect.jpg",
        alt: "Values-driven digital transformation with integrity, creativity, and inclusive approach",
      },
    },
    {
      tagline: "Inspire",
      heading: "Your Partner in Growth",
      description:
        "Together, we can navigate the digital landscape and achieve your business goals.",
      buttons: [{ title: "Partner With Us", variant: "secondary" as const }],
      image: {
        src: "/images/process/process-inspire.jpg",
        alt: "Partnership and growth collaboration navigating digital landscape for business success",
      },
    },
    {
      tagline: "Evolve",
      heading: "Let's Build Something Great Together",
      description:
        "Reach out today and discover how we can elevate your business.",
      buttons: [
        { title: "Let's Build Together", variant: "secondary" as const },
      ],
      image: {
        src: "/images/process/process-evolve.jpg",
        alt: "Business evolution and growth partnership building something great together",
      },
    },
  ];

  return (
    <section id="process" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="max-w-lg">
          <p className="mb-3 text-sm font-semibold text-muted-foreground font-sans md:mb-4">
            Innovate
          </p>
          <h2 className="mb-5 text-4xl font-medium font-heading md:mb-6">
            Empowering Your Digital Journey
          </h2>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            Transforming ideas into impactful digital solutions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-12 md:mt-0 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {/* Mobile Layout */}
          <div className="relative flex w-full flex-col gap-12 md:hidden md:pt-[60vh]">
            {contentBlocks.map((block, index) => (
              <ContentBlock
                key={index}
                index={index}
                setCurrentImageIndex={useActive.setCurrentImageIndex}
              >
                <div className="mb-8 md:hidden">
                  <Image
                    src={block.image.src}
                    alt={block.image.alt}
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <p className="mb-3 text-sm font-semibold text-muted-foreground font-sans md:mb-4">
                  {block.tagline}
                </p>
                <h2 className="mb-5 text-2xl font-medium font-heading md:mb-6">
                  {block.heading}
                </h2>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  {block.description}
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button variant="secondary">{block.buttons[0].title}</Button>
                </div>
              </ContentBlock>
            ))}
          </div>

          {/* Desktop Left Column */}
          <div className="relative hidden w-full flex-col gap-12 md:flex md:pt-[60vh]">
            <Fragment>
              <ContentBlock
                index={0}
                setCurrentImageIndex={useActive.setCurrentImageIndex}
              >
                <p className="mb-3 text-sm font-semibold text-muted-foreground font-sans md:mb-4">
                  {contentBlocks[0].tagline}
                </p>
                <h2 className="mb-5 text-2xl font-medium font-heading md:mb-6">
                  {contentBlocks[0].heading}
                </h2>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  {contentBlocks[0].description}
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button variant="secondary">
                    {contentBlocks[0].buttons[0].title}
                  </Button>
                </div>
              </ContentBlock>
            </Fragment>
            <Fragment>
              <ContentBlock
                index={2}
                setCurrentImageIndex={useActive.setCurrentImageIndex}
              >
                <p className="mb-3 text-sm font-semibold text-muted-foreground font-sans md:mb-4">
                  {contentBlocks[2].tagline}
                </p>
                <h2 className="mb-5 text-2xl font-medium font-heading md:mb-6">
                  {contentBlocks[2].heading}
                </h2>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  {contentBlocks[2].description}
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button variant="secondary">
                    {contentBlocks[2].buttons[0].title}
                  </Button>
                </div>
              </ContentBlock>
            </Fragment>
          </div>

          {/* Center Image */}
          <div className="sticky top-0 hidden h-screen w-full items-center justify-center md:flex">
            <div className="aspect-[2/3]">
              <CurrentImage
                currentImageIndex={useActive.currentImageIndex}
                contentBlocks={contentBlocks}
              />
            </div>
          </div>

          {/* Desktop Right Column */}
          <div className="relative hidden w-full flex-col gap-12 md:flex md:pt-[110vh]">
            <Fragment>
              <ContentBlock
                index={1}
                setCurrentImageIndex={useActive.setCurrentImageIndex}
              >
                <p className="mb-3 text-sm font-semibold text-muted-foreground font-sans md:mb-4">
                  {contentBlocks[1].tagline}
                </p>
                <h2 className="mb-5 text-2xl font-medium font-heading md:mb-6">
                  {contentBlocks[1].heading}
                </h2>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  {contentBlocks[1].description}
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button variant="secondary">
                    {contentBlocks[1].buttons[0].title}
                  </Button>
                </div>
              </ContentBlock>
            </Fragment>
            <Fragment>
              <ContentBlock
                index={3}
                setCurrentImageIndex={useActive.setCurrentImageIndex}
              >
                <p className="mb-3 text-sm font-semibold text-muted-foreground font-sans md:mb-4">
                  {contentBlocks[3].tagline}
                </p>
                <h2 className="mb-5 text-2xl font-medium font-heading md:mb-6">
                  {contentBlocks[3].heading}
                </h2>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  {contentBlocks[3].description}
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button variant="secondary">
                    {contentBlocks[3].buttons[0].title}
                  </Button>
                </div>
              </ContentBlock>
            </Fragment>
          </div>
        </div>
      </div>
    </section>
  );
}
