"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type MilestoneData = {
  number: string;
  tagline: string;
  heading: string;
  description: string;
  buttons?: Array<{
    title: string;
    variant?: "default" | "secondary" | "outline" | "ghost";
  }>;
};

type MilestoneProps = {
  milestones: MilestoneData[];
};

export function Milestone({ milestones }: MilestoneProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const featureCount = milestones.length;
  const numbers = Array.from({ length: featureCount }, (_, index) => index + 1);
  const y = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.65, 0.75],
    ["0%", "-33.5%", "-33.5%", "-66.5%"]
  );

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="relative grid auto-cols-fr grid-cols-1 items-start gap-x-8 gap-y-12 md:grid-cols-[0.75fr_1fr] md:gap-y-16 lg:grid-cols-[max-content_1fr] lg:gap-x-20">
          <div className="static top-[20%] hidden h-56 overflow-hidden md:sticky md:flex md:items-start">
            <h1 className="text-[6rem] font-bold leading-[1] md:text-[14rem]">
              0
            </h1>
            <motion.div className="text-center" style={{ y }}>
              {numbers.map((number, index) => (
                <h1
                  key={index}
                  className="text-[6rem] font-bold leading-[1] md:text-[14rem]"
                >
                  {number}
                </h1>
              ))}
            </motion.div>
          </div>
          <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:gap-x-28 md:gap-y-28">
            {milestones.map((milestone, index) => (
              <MilestoneCard key={index} milestone={milestone} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const MilestoneCard = ({ milestone }: { milestone: MilestoneData }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const animatedWidth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });
  const width = { width: useTransform(animatedWidth, [0, 1], ["0%", "100%"]) };

  return (
    <div className="flex flex-col items-start justify-center py-8 md:py-0">
      <div className="mt-10 flex text-[6rem] font-bold leading-[1] md:mt-0 md:hidden md:text-[14rem]">
        {milestone.number}
      </div>
      <div ref={ref} className="mb-8 mt-8 h-0.5 w-full bg-border md:mt-0">
        <motion.div className="h-0.5 w-8 bg-primary" style={width} />
      </div>
      <p className="mb-3 font-semibold md:mb-4">{milestone.tagline}</p>
      <h2 className="mb-5 font-heading text-4xl font-medium md:mb-6">
        {milestone.heading}
      </h2>
      <p className="text-lg text-muted-foreground font-sans leading-relaxed">
        {milestone.description}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
        {milestone.buttons?.map((button, index) => (
          <Button key={index} variant={button.variant || "default"}>
            {button.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
