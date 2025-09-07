"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export function ServicesFaq() {
  const faqData = [
    {
      id: "item-0",
      question: "What services do you offer?",
      answer:
        "We offer a range of services including custom software development, mobile app creation, AI solutions, and e-commerce platforms. Each service is tailored to meet the unique needs of your business. Our goal is to empower you with the right tools for success.",
    },
    {
      id: "item-1",
      question: "How long does development take?",
      answer:
        "The timeline for development varies based on the complexity of the project. Typically, we provide a detailed timeline after our initial consultation. This ensures we meet your specific needs and deadlines.",
    },
    {
      id: "item-2",
      question: "Do you offer support?",
      answer:
        "Yes, we provide ongoing support for all our projects. Our team is available to assist you with any issues or updates you may need. We believe in building long-term relationships with our clients.",
    },
    {
      id: "item-3",
      question: "Can you customize solutions?",
      answer:
        "Absolutely! Customization is at the core of our services. We work closely with you to ensure the solutions fit your specific requirements and workflow.",
    },
    {
      id: "item-4",
      question: "What is your pricing?",
      answer:
        "Our pricing is based on the scope and complexity of each project. We provide transparent quotes after understanding your needs. This way, you can make informed decisions without any surprises.",
    },
  ];

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="mb-5 font-heading text-4xl font-medium md:mb-6">
            FAQs
          </h2>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            Here are answers to some of the most common questions we receive
            from our clients.
          </p>
          <div className="mt-6 md:mt-8">
            <Button variant="secondary">Discover What is Possible</Button>
          </div>
        </div>
        <Accordion type="multiple" className="w-full">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="md:py-5 md:text-lg font-sans">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="md:pb-6 text-muted-foreground font-sans leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
