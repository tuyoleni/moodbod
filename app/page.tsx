import {
  Hero,
  Services,
  Features,
  Process,
  Testimonials,
  Insights,
} from "@/components/homepage";
import { Cta } from "@/components/layout";

export default function Home() {
  return (
    <div className="pt-16 md:pt-18">
      <Hero />
      <Services />
      <Features />
      <Process />
      <Testimonials />
      <Cta />
      <Insights />
    </div>
  );
}
