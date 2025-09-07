import {
  ServicesHero,
  ServicesShowcase,
  ServicesFaq,
} from "@/components/services";
import { Cta } from "@/components/layout";
import { StructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover Moodbod Digital Agency's comprehensive services including web development, mobile apps, AI automation, and digital transformation solutions tailored for your business.",
  keywords: [
    "digital services",
    "web development",
    "mobile app development",
    "AI automation",
    "digital transformation",
    "custom software",
    "e-commerce solutions",
    "technology consulting",
  ],
  openGraph: {
    title: "Services | Moodbod Digital Agency",
    description:
      "Discover Moodbod Digital Agency's comprehensive services including web development, mobile apps, AI automation, and digital transformation solutions.",
    url: "https://moodbod.agency/services",
    images: [
      {
        url: "/images/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Moodbod Digital Agency Services",
      },
    ],
  },
  twitter: {
    title: "Services | Moodbod Digital Agency",
    description:
      "Discover Moodbod Digital Agency's comprehensive services including web development, mobile apps, AI automation, and digital transformation solutions.",
    images: ["/images/og-services.jpg"],
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: "Services",
          description:
            "Discover Moodbod Digital Agency's comprehensive services including web development, mobile apps, AI automation, and digital transformation solutions.",
          url: "https://moodbod.agency/services",
          mainEntity: {
            "@type": "Service",
            name: "Digital Agency Services",
            description:
              "Comprehensive digital solutions for business growth and transformation",
            provider: {
              "@type": "Organization",
              name: "Moodbod Digital Agency",
            },
          },
        }}
      />
      <div className="min-h-screen pt-16 md:pt-18">
        <ServicesHero />
        <ServicesShowcase />
        <ServicesFaq />
        <Cta />
      </div>
    </>
  );
}
