"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";

export function Faq3() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Here are answers to some of the most common questions we receive
            from our clients.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Discover What is Possible" variant="secondary">
              Discover What is Possible
            </Button>
          </div>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              What services do you offer?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We offer a range of services including custom software
              development, mobile app creation, AI solutions, and e-commerce
              platforms. Each service is tailored to meet the unique needs of
              your business. Our goal is to empower you with the right tools for
              success.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              How long does development take?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              The timeline for development varies based on the complexity of the
              project. Typically, we provide a detailed timeline after our
              initial consultation. This ensures we meet your specific needs and
              deadlines.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              Do you offer support?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, we provide ongoing support for all our projects. Our team is
              available to assist you with any issues or updates you may need.
              We believe in building long-term relationships with our clients.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              Can you customize solutions?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Absolutely! Customization is at the core of our services. We work
              closely with you to ensure the solutions fit your specific
              requirements and workflow.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              What is your pricing?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our pricing is based on the scope and complexity of each project.
              We provide transparent quotes after understanding your needs. This
              way, you can make informed decisions without any surprises.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
