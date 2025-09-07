"use client";

interface StructuredDataProps {
  type: "Organization" | "WebSite" | "WebPage";
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Moodbod Digital Agency",
          description:
            "Moodbod Digital Agency blends creativity and technology to drive meaningful change for businesses everywhere.",
          url: "https://moodbod.agency",
          logo: "https://moodbod.com/logos/Moodbod.svg",
          sameAs: [
            "https://twitter.com/moodbod",
            "https://linkedin.com/company/moodbod",
            "https://facebook.com/moodbod",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-XXX-XXX-XXXX",
            contactType: "customer service",
            email: "hello@moodbod.com",
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "US",
            addressLocality: "Your City",
            addressRegion: "Your State",
          },
          founder: [
            {
              "@type": "Person",
              name: "Simeon Tuyoleni",
              jobTitle: "Co-Founder & CEO",
            },
            {
              "@type": "Person",
              name: "Stephen Indongo",
              jobTitle: "Co-Founder & CTO",
            },
          ],
          ...data,
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Moodbod Digital Agency",
          url: "https://moodbod.agency",
          description: "Moodbod Digital Agency - Empowering Digital Growth",
          publisher: {
            "@type": "Organization",
            name: "Moodbod Digital Agency",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: "https://moodbod.agency/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
          ...data,
        };

      case "WebPage":
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: data.name || "Moodbod Digital Agency",
          description:
            data.description ||
            "Moodbod Digital Agency - Empowering Digital Growth",
          url: data.url || "https://moodbod.agency",
          isPartOf: {
            "@type": "WebSite",
            name: "Moodbod Digital Agency",
            url: "https://moodbod.agency",
          },
          ...data,
        };

      default:
        return data;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2),
      }}
    />
  );
}
