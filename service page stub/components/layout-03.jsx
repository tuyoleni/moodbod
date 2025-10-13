"use client";

import React from "react";

export function Layout3() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="heading-h3 mb-5 font-bold md:mb-6">
              Empower Your Team with Custom Web Applications for Seamless
              Adaptation
            </h1>
            <p className="text-medium">
              In today's fast-paced environment, web applications enable teams
              to pivot quickly and efficiently. Tailored solutions ensure that
              your business can respond to changes and challenges with agility.
            </p>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
