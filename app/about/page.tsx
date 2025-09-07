import { Hero, Story, Team } from "@/components/about";
import { Milestone } from "@/components/Milestone";
import { StructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Moodbod Digital Agency's journey, our passionate team, and our commitment to driving digital transformation. Meet our founders and discover our milestones.",
  keywords: [
    "about moodbod",
    "digital agency team",
    "company story",
    "founders",
    "digital transformation experts",
    "agency milestones",
    "team members",
  ],
  openGraph: {
    title: "About Us | Moodbod Digital Agency",
    description:
      "Learn about Moodbod Digital Agency's journey, our passionate team, and our commitment to driving digital transformation.",
    url: "https://moodbod.agency/about",
    images: [
      {
        url: "/images/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Moodbod Digital Agency",
      },
    ],
  },
  twitter: {
    title: "About Us | Moodbod Digital Agency",
    description:
      "Learn about Moodbod Digital Agency's journey, our passionate team, and our commitment to driving digital transformation.",
    images: ["/images/og-about.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
};

const milestonesData = [
  {
    number: "01",
    tagline: "Milestone",
    heading: "Our Journey: Milestones and Achievements",
    description:
      "Since our founding, Moodbod Digital Agency has achieved remarkable milestones that showcase our dedication to innovation. Each step forward reflects our commitment to our clients' success.",
    buttons: [
      { title: "Learn More", variant: "secondary" as const },
      { title: "View", variant: "ghost" as const },
    ],
  },
  {
    number: "02",
    tagline: "Milestone",
    heading: "Building Trust Through Excellence",
    description:
      "We've established long-term partnerships with clients across various industries, delivering consistent results and exceeding expectations through our commitment to quality and innovation.",
    buttons: [
      { title: "Learn More", variant: "secondary" as const },
      { title: "View", variant: "ghost" as const },
    ],
  },
  {
    number: "03",
    tagline: "Milestone",
    heading: "Innovation and Growth",
    description:
      "Our continuous investment in cutting-edge technologies and methodologies has positioned us as leaders in the digital transformation space, helping businesses thrive in the modern landscape.",
    buttons: [
      { title: "Learn More", variant: "secondary" as const },
      { title: "View", variant: "ghost" as const },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: "About Us",
          description:
            "Learn about Moodbod Digital Agency's journey, our passionate team, and our commitment to driving digital transformation. Meet our founders and discover our milestones.",
          url: "https://moodbod.agency/about",
          mainEntity: {
            "@type": "AboutPage",
            name: "About Moodbod Digital Agency",
            description:
              "Our story, team, and commitment to digital transformation",
          },
        }}
      />
      <div className="min-h-screen">
        <Hero />
        <Story />
        <Team />
        <Milestone milestones={milestonesData} />
      </div>
    </>
  );
}
