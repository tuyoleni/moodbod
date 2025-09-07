"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

const useForm = () => {
  const [email, setEmail] = useState("");
  const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ email });
    setEmail("");
  };
  return {
    email,
    handleSetEmail,
    handleSubmit,
  };
};

// Data
const footerData = {
  company: {
    name: "Moodbod Digital",
    logo: "/logos/Moodbod.svg",
  },
  quickLinks: [
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Contact Us", href: "#contact" },
    { name: "Blog Posts", href: "#blog" },
    { name: "Support Center", href: "#support" },
    { name: "FAQs", href: "#faq" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Use", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
  ],
  newsletter: {
    title:
      "Subscribe to our newsletter for the latest features and updates on our services.",
    placeholder: "Your email here",
    buttonText: "Join",
    disclaimer:
      "By subscribing, you consent to our Privacy Policy and agree to receive updates.",
  },
};

export function Footer() {
  const formState = useForm();

  return (
    <footer className="bg-gray-50 px-[5%] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:pb-16">
          {/* Newsletter Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <a href="#" className="mb-4 inline-block">
                <Image
                  src={footerData.company.logo}
                  alt={footerData.company.name}
                  width={70}
                  height={18}
                  className="h-4 w-auto"
                />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="w-full max-w-md">
              <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                {footerData.newsletter.title}
              </p>
              <form
                className="mb-3 flex flex-col gap-3 sm:flex-row"
                onSubmit={formState.handleSubmit}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder={footerData.newsletter.placeholder}
                  value={formState.email}
                  onChange={formState.handleSetEmail}
                  className="flex-1"
                />
                <Button type="submit">
                  {footerData.newsletter.buttonText}
                </Button>
              </form>
              <p className="text-xs text-gray-500">
                {footerData.newsletter.disclaimer}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Info */}
          <div>
            <h3 className="mb-4 font-semibold">Legal Info</h3>
            <ul className="space-y-2">
              {footerData.legal.map((legal) => (
                <li key={legal.name}>
                  <a
                    href={legal.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {legal.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col items-start justify-start gap-4">
            <p className="text-sm text-gray-600">
              © 2025 {footerData.company.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
