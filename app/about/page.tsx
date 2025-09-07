import {
  AboutHero,
  AboutStory,
  AboutTeam,
  AboutMilestones,
} from "@/components/about";
import { Cta, Footer, Navbar } from "@/components/layout";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutTeam />
      <AboutMilestones />
      <Cta />
    </div>
  );
}
