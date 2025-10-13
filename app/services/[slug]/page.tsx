import { Cta } from "@/components/layout";
import {
  ServiceDetailHero,
  ServiceDetailFeature,
  ServiceDetailContent,
  ServiceDetailShowcase,
  ServiceDetailProcess,
  ServiceDetailTestimonial,
} from "@/components/service-detail";
import { StructuredData } from "@/components/StructuredData";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.meta.title,
    description: service.meta.description,
    keywords: service.meta.keywords,
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url: `https://moodbod.agency/services/${service.slug}`,
      images: [
        {
          url: service.feature.image,
          width: 1200,
          height: 630,
          alt: service.feature.imageAlt,
        },
      ],
    },
    twitter: {
      title: service.meta.title,
      description: service.meta.description,
      images: [service.feature.image],
    },
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: service.hero.title,
          description: service.meta.description,
          url: `https://moodbod.agency/services/${service.slug}`,
          provider: {
            "@type": "Organization",
            name: "Moodbod Digital Agency",
          },
          serviceType: service.hero.title,
          areaServed: "Worldwide",
          availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: `https://moodbod.agency/services/${service.slug}`,
          },
        }}
      />
      <div className="min-h-screen pt-16 md:pt-18">
        <ServiceDetailHero
          title={service.hero.title}
          description={service.hero.description}
          primaryButton={service.hero.primaryButton}
          secondaryButton={service.hero.secondaryButton}
        />
        <ServiceDetailFeature
          tagline={service.feature.tagline}
          title={service.feature.title}
          description={service.feature.description}
          benefits={service.feature.benefits}
          image={service.feature.image}
          imageAlt={service.feature.imageAlt}
        />
        <ServiceDetailContent
          title={service.content.title}
          description={service.content.description}
          image={service.content.image}
          imageAlt={service.content.imageAlt}
        />
        <ServiceDetailShowcase
          title={service.showcase.title}
          description={service.showcase.description}
          image={service.showcase.image}
          imageAlt={service.showcase.imageAlt}
        />
        <ServiceDetailProcess
          title={service.process.title}
          description={service.process.description}
          steps={service.process.steps}
        />
        <ServiceDetailTestimonial testimonials={service.testimonials} />
        <Cta
          title={service.cta.title}
          description={service.cta.description}
          buttonText={service.cta.buttonText}
          imageSrc={service.cta.image}
          imageAlt={service.cta.imageAlt}
        />
      </div>
    </>
  );
}
