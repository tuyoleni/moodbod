"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BiLogoDribbble, BiLogoLinkedinSquare } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Project Manager",
    description:
      "Alice ensures projects run smoothly and clients are always satisfied with the results.",
    image: "/images/team/team-member-1.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      dribbble: "#",
    },
  },
  {
    name: "Bob Smith",
    role: "Lead Developer",
    description:
      "Bob specializes in crafting robust software solutions tailored to client needs.",
    image: "/images/team/team-member-2.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      dribbble: "#",
    },
  },
  {
    name: "Cathy Lee",
    role: "UX Designer",
    description:
      "Cathy creates user-friendly interfaces that enhance the overall user experience.",
    image: "/images/team/team-member-3.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      dribbble: "#",
    },
  },
];

export function AboutTeam() {
  return (
    <section className="px-4 py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16 lg:mb-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Together
          </p>
          <h2 className="mb-6 font-heading text-4xl font-medium">Our Team</h2>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            Meet the passionate individuals behind our innovative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col text-center">
              <div className="mb-6 flex w-full items-center justify-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold md:text-xl">
                  {member.name}
                </h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
              <p className="mb-6 text-muted-foreground">{member.description}</p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href={member.social.linkedin}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <BiLogoLinkedinSquare className="h-6 w-6" />
                </a>
                <a
                  href={member.social.twitter}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <FaXTwitter className="h-6 w-6" />
                </a>
                <a
                  href={member.social.dribbble}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <BiLogoDribbble className="h-6 w-6" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h3 className="mb-4 font-heading text-2xl font-medium">
            We&apos;re hiring!
          </h3>
          <p className="mb-6 text-muted-foreground font-sans leading-relaxed">
            Join our dynamic team and make an impact!
          </p>
          <Button variant="outline">Open positions</Button>
        </div>
      </div>
    </section>
  );
}
