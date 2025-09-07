import {
  Hero,
  Services,
  Features,
  Process,
  Testimonials,
  Insights,
} from "@/components/homepage";
import { Cta } from "@/components/layout";
import { StructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover how Moodbod Digital Agency empowers businesses through innovative digital solutions. From web development to AI automation, we drive meaningful growth and transformation.",
  keywords: [
    "digital agency",
    "web development",
    "business growth",
    "digital transformation",
    "creative solutions",
    "technology innovation",
  ],
  openGraph: {
    title: "Moodbod Digital Agency - Empowering Digital Growth",
    description:
      "Discover how Moodbod Digital Agency empowers businesses through innovative digital solutions. From web development to AI automation, we drive meaningful growth and transformation.",
    url: "https://moodbod.agency",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Moodbod Digital Agency Home Page",
      },
    ],
  },
  twitter: {
    title: "Moodbod Digital Agency - Empowering Digital Growth",
    description:
      "Discover how Moodbod Digital Agency empowers businesses through innovative digital solutions.",
    images: ["/images/og-home.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: "Home",
          description:
            "Discover how Moodbod Digital Agency empowers businesses through innovative digital solutions. From web development to AI automation, we drive meaningful growth and transformation.",
          url: "https://moodbod.agency/",
          mainEntity: {
            "@type": "Service",
            name: "Digital Agency Services",
            description:
              "Comprehensive digital solutions for business growth and transformation",
          },
        }}
      />
      <div className="pt-16 md:pt-18">
        <Hero />
        <Services />
        <Features />
        <Process />
        <Testimonials />
        <Cta />
        <Insights />
      </div>
    </>
  );
}
