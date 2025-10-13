"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronRight, RelumeIcon } from "relume-icons";

export function Layout246() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <h2 className="heading-h3 font-bold">
              Transforming your vision into tailored software solutions for your
              business.
            </h2>
          </div>
          <div>
            <p className="text-medium">
              Our process begins with a thorough consultation to understand your
              unique needs. We collaborate closely with you to design and
              develop custom software that enhances your operations. Finally, we
              ensure a smooth deployment, so you can start reaping the benefits
              immediately.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
          <div>
            <div className="mb-5 md:mb-6">
              <RelumeIcon className="size-12 text-scheme-text" />
            </div>
            <h3 className="heading-h5 mb-3 font-bold md:mb-4">
              A seamless journey from concept to creation of your software
              solution.
            </h3>
            <p>We prioritize your goals at every stage of development.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button
                iconRight={<ChevronRight className="text-scheme-text" />}
                variant="link"
                size="link"
              >
                Start
              </Button>
            </div>
          </div>
          <div>
            <div className="mb-5 md:mb-6">
              <RelumeIcon className="size-12 text-scheme-text" />
            </div>
            <h3 className="heading-h5 mb-3 font-bold md:mb-4">
              Iterative feedback ensures your software meets expectations and
              requirements.
            </h3>
            <p>We value your input to refine and perfect the solution.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button
                iconRight={<ChevronRight className="text-scheme-text" />}
                variant="link"
                size="link"
              >
                Review
              </Button>
            </div>
          </div>
          <div>
            <div className="mb-5 md:mb-6">
              <RelumeIcon className="size-12 text-scheme-text" />
            </div>
            <h3 className="heading-h5 mb-3 font-bold md:mb-4">
              Launch your custom software and watch your business thrive.
            </h3>
            <p>
              Experience the impact of tailored technology in your operations.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button
                iconRight={<ChevronRight className="text-scheme-text" />}
                variant="link"
                size="link"
              >
                Go
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
