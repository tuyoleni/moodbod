"use client";

import Image from "next/image";

export function AboutStory() {
  return (
    <section className="px-4 py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-12 lg:gap-20">
          <div>
            <h2 className="mb-6 font-heading text-4xl font-medium">
              Empowering Businesses Through Innovative Digital Solutions and
              Collaborative Partnerships
            </h2>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              At Moodbod Digital Agency, our mission is to drive growth through
              creativity and technology. We believe in building lasting
              relationships with our clients, ensuring that every solution is
              tailored to their unique needs.
            </p>
          </div>
          <div>
            <Image
              src="/images/hero/hero-center-main.jpg"
              alt="About Moodbod Digital Agency"
              width={600}
              height={400}
              className="w-full h-96 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
