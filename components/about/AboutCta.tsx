"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AboutCta() {
  return (
    <section className="px-4 py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Transform Your Business Today
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Ready to take your business to the next level? Let's work together
              to create innovative digital solutions that drive real results.
            </p>
            <Button size="lg">Discover What is Possible</Button>
          </div>
          <div>
            <Image
              src="/images/cta/cta-main.jpg"
              alt="Transform your business with Moodbod"
              width={600}
              height={400}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
