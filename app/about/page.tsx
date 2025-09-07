import {
  AboutHero,
  AboutStory,
  AboutTeam,
  AboutMilestones,
} from "@/components/about";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutStory />
      <AboutTeam />
      <AboutMilestones />
    </div>
  );
}
