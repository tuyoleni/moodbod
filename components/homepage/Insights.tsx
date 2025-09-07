"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

// Data
const insightsData = {
  heading: {
    tagline: "Blog",
    title: "Insights for Your Growth",
    description: "Discover strategies to elevate your business today.",
  },
  articles: [
    {
      id: 1,
      image: {
        src: "/images/insights/insight-digital-transformation.jpg",
        alt: "Technology innovations for business growth and operational transformation",
      },
      category: "Insights",
      readTime: "5 min read",
      title: "Harnessing Technology for Business Growth",
      description: "Learn how tech innovations can transform your operations.",
      href: "#",
    },
    {
      id: 2,
      image: {
        src: "/images/insights/insight-ux-design.jpg",
        alt: "Future trends in e-commerce and online shopping experiences",
      },
      category: "Trends",
      readTime: "5 min read",
      title: "The Future of E-commerce",
      description:
        "Explore the latest trends shaping online shopping experiences.",
      href: "#",
    },
    {
      id: 3,
      image: {
        src: "/images/insights/insight-ai-automation.jpg",
        alt: "AI automation for business efficiency and process optimization",
      },
      category: "Automation",
      readTime: "5 min read",
      title: "Leveraging AI for Efficiency",
      description: "Discover how AI can streamline your business processes.",
      href: "#",
    },
  ],
};

export function Insights() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 text-sm font-semibold text-muted-foreground font-sans md:mb-4">
              {insightsData.heading.tagline}
            </p>
            <h2 className="mb-5 text-4xl font-medium font-heading md:mb-6">
              {insightsData.heading.title}
            </h2>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {insightsData.heading.description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {insightsData.articles.map((article) => (
            <div
              key={article.id}
              className="flex size-full flex-col items-start justify-start text-start"
            >
              <a href={article.href} className="mb-6 w-full">
                <Image
                  src={article.image.src}
                  alt={article.image.alt}
                  width={400}
                  height={267}
                  className="aspect-[3/2] size-full rounded-lg object-cover"
                />
              </a>
              <div className="mb-4 flex w-full items-center justify-start">
                <Badge variant="secondary" className="mr-4">
                  {article.category}
                </Badge>
                <p className="text-sm text-muted-foreground font-sans inline">
                  {article.readTime}
                </p>
              </div>
              <a
                className="mb-2 flex justify-start text-start"
                href={article.href}
              >
                <h2 className="text-xl font-medium font-heading">
                  {article.title}
                </h2>
              </a>
              <p className="text-base text-muted-foreground font-sans leading-relaxed">
                {article.description}
              </p>
              <Button
                variant="link"
                className="mt-6 flex items-center justify-start gap-x-2 p-0 h-auto text-primary hover:text-primary/80 -ml-2"
              >
                Read more <RxChevronRight className="ml-1" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <Button className="mt-10 md:mt-14 lg:mt-16">View all</Button>
        </div>
      </div>
    </section>
  );
}
