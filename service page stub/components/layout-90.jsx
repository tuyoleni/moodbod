"use client";

import React from "react";

export function Layout90() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-8 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <h3 className="heading-h3 font-bold">
            Unlock Your Potential with Tailored Software Solutions for Your
            Business Needs
          </h3>
          <p className="text-medium">
            Choosing custom software and web applications enhances your business
            efficiency by streamlining operations and reducing manual tasks.
            These solutions are designed to adapt to your unique workflows,
            ensuring that your team can respond swiftly to changing demands.
            Ultimately, improved workflows lead to increased productivity and
            higher satisfaction for both employees and customers.
          </p>
        </div>
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
          className="w-full rounded-image object-cover"
          alt="Relume placeholder image"
        />
      </div>
    </section>
  );
}
