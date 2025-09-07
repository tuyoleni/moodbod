"use client";

import { Button } from "@/components/ui/button";
import { RxChevronRight } from "react-icons/rx";

const milestones = [
  {
    number: "01",
    title: "Our Journey: Milestones and Achievements",
    description:
      "Since our founding, Moodbod Digital Agency has achieved remarkable milestones that showcase our dedication to innovation. Each step forward reflects our commitment to our clients' success.",
  },
  {
    number: "02",
    title: "Building Trust Through Excellence",
    description:
      "We've established long-term partnerships with clients across various industries, delivering consistent results and exceeding expectations through our commitment to quality and innovation.",
  },
  {
    number: "03",
    title: "Innovation and Growth",
    description:
      "Our continuous investment in cutting-edge technologies and methodologies has positioned us as leaders in the digital transformation space, helping businesses thrive in the modern landscape.",
  },
];

export function AboutMilestones() {
  return (
    <section className="px-4 py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1fr] lg:gap-20">
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <div className="text-6xl font-bold leading-none md:text-8xl lg:text-9xl">
                0
              </div>
            </div>
          </div>

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex flex-col">
                <div className="mb-8 flex items-center gap-4 lg:hidden">
                  <div className="text-4xl font-bold leading-none md:text-6xl">
                    {milestone.number}
                  </div>
                  <div className="h-0.5 flex-1 bg-border">
                    <div className="h-0.5 w-8 bg-primary" />
                  </div>
                </div>

                <div className="mb-4">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                    Milestone
                  </p>
                  <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                    {milestone.title}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button variant="outline">Learn More</Button>
                  <Button variant="ghost" size="sm" className="group">
                    View
                    <RxChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
