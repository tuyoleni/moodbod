"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { Fragment, useRef } from "react";
import { RxChevronRight } from "react-icons/rx";

const ConditionalRender = ({
  condition,
  children,
}: {
  condition: boolean;
  children: React.ReactNode;
}) => {
  return condition ? <>{children}</> : null;
};

const useRelume = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end 60%"],
  });

  // Move useTransform calls to top level - this fixes the hooks violation
  const scale1 = useTransform(scrollYProgress, [0, 1 / 3], [1, 0.8]);
  const scale2 = useTransform(scrollYProgress, [1 / 3, 2 / 3], [1, 0.8]);
  const scale3 = useTransform(scrollYProgress, [2 / 3, 1], [1, 0.8]);

  const calculateScale = (index: number) => {
    switch (index) {
      case 0:
        return scale1;
      case 1:
        return scale2;
      case 2:
        return scale3;
      default:
        return scale1;
    }
  };

  return { containerRef, calculateScale };
};

const useMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return { isMobile };
};

const useTablet = () => {
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768);
    };

    checkTablet();
    window.addEventListener("resize", checkTablet);

    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  return { isTablet };
};

const useMotionCard = () => {
  return motion.div;
};

export function ServicesShowcase() {
  const MotionCard = useMotionCard();
  const renderTablet = useTablet();
  const renderMobile = useMobile();
  const scrollData = useRelume();

  const services = [
    {
      tagline: "Solutions",
      title: "Custom Software & Web Applications",
      description:
        "Every business is unique, and so are our solutions. We create custom software that fits your workflow perfectly.",
      image: "/images/services/service-software.jpg",
      imageAlt: "Custom Software Development",
      buttons: [{ title: "Get Started", variant: "link" as const }],
    },
    {
      tagline: "E-commerce",
      title: "E-commerce & Digital Commerce",
      description:
        "Build powerful online stores that convert visitors into customers with our comprehensive e-commerce solutions.",
      image: "/images/services/service-ecommerce.jpg",
      imageAlt: "E-commerce Development",
      buttons: [{ title: "Get Started", variant: "link" as const }],
    },
    {
      tagline: "Innovation",
      title: "AI & Automation Solutions",
      description:
        "Leverage artificial intelligence and automation to streamline your processes and boost productivity.",
      image: "/images/services/service-ai-automation.jpg",
      imageAlt: "AI and Automation Services",
      buttons: [{ title: "Get Started", variant: "link" as const }],
    },
  ];

  return (
    <section id="services-showcase" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="mb-12 w-full max-w-lg text-left md:mb-18 lg:mb-20">
          <p className="mb-3 text-sm font-semibold text-muted-foreground font-sans md:mb-4">
            Services
          </p>
          <h1 className="mb-5 font-heading text-4xl font-medium md:mb-6">
            Tailored Digital Solutions
          </h1>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            Innovative services to elevate your business.
          </p>
        </div>
        <div
          className="sticky top-0 grid grid-cols-1 gap-6 md:gap-0"
          ref={scrollData.containerRef}
        >
          {services.map((service, index) => (
            <Fragment key={index}>
              <ConditionalRender condition={renderMobile.isMobile}>
                <div
                  className="static grid grid-cols-1 content-center overflow-hidden rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#F2F2F2" }}
                >
                  <Fragment>
                    <div className="order-first flex flex-col justify-center p-6 md:p-8 lg:p-12 md:order-first">
                      <p className="mb-2 text-sm font-semibold text-muted-foreground font-sans">
                        {service.tagline}
                      </p>
                      <h2 className="mb-5 font-heading text-2xl font-medium md:mb-6">
                        {service.title}
                      </h2>
                      <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                        {service.buttons.map((button, buttonIndex) => (
                          <Button
                            key={buttonIndex}
                            variant={button.variant}
                            size={button.variant === "link" ? "sm" : undefined}
                            className={
                              button.variant === "link"
                                ? "flex items-center gap-2"
                                : undefined
                            }
                          >
                            {button.title}
                            {button.variant === "link" && <RxChevronRight />}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="order-last flex flex-col items-center justify-center md:order-last">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        width={400}
                        height={256}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </Fragment>
                </div>
              </ConditionalRender>
              <ConditionalRender condition={renderTablet.isTablet}>
                <MotionCard
                  className="static grid grid-cols-1 content-center overflow-hidden rounded-lg border shadow-sm md:sticky md:top-[10%] md:mb-[10vh] md:h-[80vh] md:grid-cols-2"
                  style={{
                    backgroundColor: "#F2F2F2",
                    scale: scrollData.calculateScale(index),
                  }}
                >
                  <Fragment>
                    <div
                      className={`order-first flex flex-col justify-center p-6 md:p-8 lg:p-12 ${
                        index % 2 === 1 ? "md:order-last" : "md:order-first"
                      }`}
                    >
                      <p className="mb-2 text-sm font-semibold text-muted-foreground font-sans">
                        {service.tagline}
                      </p>
                      <h2 className="mb-5 font-heading text-2xl font-medium md:mb-6">
                        {service.title}
                      </h2>
                      <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                        {service.buttons.map((button, buttonIndex) => (
                          <Button
                            key={buttonIndex}
                            variant={button.variant}
                            size={button.variant === "link" ? "sm" : undefined}
                            className={
                              button.variant === "link"
                                ? "flex items-center gap-2"
                                : undefined
                            }
                          >
                            {button.title}
                            {button.variant === "link" && <RxChevronRight />}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`order-last flex flex-col items-center justify-center ${
                        index % 2 === 1 ? "md:order-first" : "md:order-last"
                      }`}
                    >
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Fragment>
                </MotionCard>
              </ConditionalRender>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
