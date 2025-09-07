"use client";

import { Button, Card, useMediaQuery } from "@relume_io/relume-ui";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { Fragment, useRef } from "react";
import { RxChevronRight } from "react-icons/rx";

const ConditionalRender = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

const useRelume = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end 60%"],
  });
  const calculateScale = (indextotalSections) => {
    const sectionFraction = 1 / totalSections;
    const start = sectionFraction * index;
    const end = sectionFraction * (index + 1);
    return useTransform(scrollYProgress, [start, end], [1, 0.8]);
  };
  return { containerRef, calculateScales };
};

const useMobile = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return { isMobile };
};

const useTablet = () => {
  const isTablet = useMediaQuery("(min-width: 768px)");
  return { isTablet };
};

const useMotionCard = () => {
  return motion.create(Card);
};

export function Layout408() {
  const useMotionCard = useMotionCard();
  const renderTablet = useTablet();
  const renderMobile = useMobile();
  const useScroll = useRelume();
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Services</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Tailored Digital Solutions
          </h1>
          <p className="md:text-md">
            Innovative services to elevate your business.
          </p>
        </div>
        <div
          className="sticky top-0 grid grid-cols-1 gap-6 md:gap-0"
          ref={useScroll.containerRef}
        >
          <Fragment>
            <ConditionalRender condition={renderMobile.isMobile}>
              <Card className="static grid grid-cols-1 content-center overflow-hidden bg-neutral-white">
                <Fragment>
                  <div className="order-first flex flex-col justify-center p-6 md:p-8 lg:p-12 md:order-first">
                    <p className="mb-2 font-semibold">Tagline</p>
                    <h2 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
                      Medium length section heading goes here
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique. Duis
                      cursus, mi quis viverra ornare, eros dolor interdum nulla,
                      ut commodo diam libero vitae erat.
                    </p>
                    <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                      <Button title="Button" variant="secondary">
                        Button
                      </Button>
                      <Button
                        title="Button"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        Button
                      </Button>
                    </div>
                  </div>
                  <div className="order-last flex flex-col items-center justify-center md:order-last">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 1"
                    />
                  </div>
                </Fragment>
              </Card>
            </ConditionalRender>
            <ConditionalRender condition={renderTablet.isTablet}>
              <useMotionCard
                className="static grid grid-cols-1 content-center overflow-hidden bg-neutral-white md:sticky md:top-[10%] md:mb-[10vh] md:h-[80vh] md:grid-cols-2"
                style={{ scale: useScroll.calculateScale(0, 3) }}
              >
                <Fragment>
                  <div className="order-first flex flex-col justify-center p-6 md:p-8 lg:p-12 md:order-first">
                    <p className="mb-2 font-semibold">Solutions</p>
                    <h2 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
                      Custom Software & Web Applications
                    </h2>
                    <p>
                      Every business is unique, and so are our solutions. We
                      create custom software that fits your workflow perfectly.
                    </p>
                    <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                      <Button title="Learn More" variant="secondary">
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div className="order-last flex flex-col items-center justify-center md:order-last">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 1"
                    />
                  </div>
                </Fragment>
              </useMotionCard>
            </ConditionalRender>
          </Fragment>
          <Fragment>
            <ConditionalRender condition={renderMobile.isMobile}>
              <Card className="static grid grid-cols-1 content-center overflow-hidden bg-neutral-white">
                <Fragment>
                  <div className="order-first flex flex-col justify-center p-6 md:p-8 lg:p-12 md:order-last">
                    <p className="mb-2 font-semibold">Tagline</p>
                    <h2 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
                      Medium length section heading goes here
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique. Duis
                      cursus, mi quis viverra ornare, eros dolor interdum nulla,
                      ut commodo diam libero vitae erat.
                    </p>
                    <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                      <Button title="Button" variant="secondary">
                        Button
                      </Button>
                      <Button
                        title="Button"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        Button
                      </Button>
                    </div>
                  </div>
                  <div className="order-last flex flex-col items-center justify-center md:order-first">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 2"
                    />
                  </div>
                </Fragment>
              </Card>
            </ConditionalRender>
            <ConditionalRender condition={renderTablet.isTablet}>
              <useMotionCard
                className="static grid grid-cols-1 content-center overflow-hidden bg-neutral-white md:sticky md:top-[10%] md:mb-[10vh] md:h-[80vh] md:grid-cols-2"
                style={{ scale: useScroll.calculateScale(1, 3) }}
              >
                <Fragment>
                  <div className="order-first flex flex-col justify-center p-6 md:p-8 lg:p-12 md:order-last">
                    <p className="mb-2 font-semibold">Solutions</p>
                    <h2 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
                      Custom Software & Web Applications
                    </h2>
                    <p>
                      Every business is unique, and so are our solutions. We
                      create custom software that fits your workflow perfectly.
                    </p>
                    <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                      <Button title="Learn More" variant="secondary">
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div className="order-last flex flex-col items-center justify-center md:order-first">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 2"
                    />
                  </div>
                </Fragment>
              </useMotionCard>
            </ConditionalRender>
          </Fragment>
          <Fragment>
            <ConditionalRender condition={renderMobile.isMobile}>
              <Card className="static grid grid-cols-1 content-center overflow-hidden bg-neutral-white">
                <Fragment>
                  <div className="order-first flex flex-col justify-center p-6 md:p-8 lg:p-12 md:order-first">
                    <p className="mb-2 font-semibold">Tagline</p>
                    <h2 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
                      Medium length section heading goes here
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique. Duis
                      cursus, mi quis viverra ornare, eros dolor interdum nulla,
                      ut commodo diam libero vitae erat.
                    </p>
                    <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                      <Button title="Button" variant="secondary">
                        Button
                      </Button>
                      <Button
                        title="Button"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        Button
                      </Button>
                    </div>
                  </div>
                  <div className="order-last flex flex-col items-center justify-center md:order-last">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 3"
                    />
                  </div>
                </Fragment>
              </Card>
            </ConditionalRender>
            <ConditionalRender condition={renderTablet.isTablet}>
              <useMotionCard
                className="static grid grid-cols-1 content-center overflow-hidden bg-neutral-white md:sticky md:top-[10%] md:mb-[10vh] md:h-[80vh] md:grid-cols-2"
                style={{ scale: useScroll.calculateScale(2, 3) }}
              >
                <Fragment>
                  <div className="order-first flex flex-col justify-center p-6 md:p-8 lg:p-12 md:order-first">
                    <p className="mb-2 font-semibold">Solutions</p>
                    <h2 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
                      Custom Software & Web Applications
                    </h2>
                    <p>
                      Every business is unique, and so are our solutions. We
                      create custom software that fits your workflow perfectly.
                    </p>
                    <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                      <Button title="Learn More" variant="secondary">
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div className="order-last flex flex-col items-center justify-center md:order-last">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 3"
                    />
                  </div>
                </Fragment>
              </useMotionCard>
            </ConditionalRender>
          </Fragment>
        </div>
      </div>
    </section>
  );
}
