import { Hero, Story, Team } from "@/components/about";
import { Milestone } from "@/components/Milestone";

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
    <div className="min-h-screen">
      <Hero />
      <Story />
      <Team />
      <Milestone milestones={milestonesData} />
    </div>
  );
}
