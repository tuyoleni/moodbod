import type { Metadata } from "next";
import { Urbanist, Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, Cta } from "@/components/layout";
import { Cursor } from "@/components/ui/cursor";
import { StructuredData } from "@/components/StructuredData";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Moodbod Digital Agency - Empowering Digital Growth",
    template: "%s | Moodbod",
  },
  description:
    "Moodbod Digital Agency blends creativity and technology to drive meaningful change for businesses everywhere. We specialize in digital transformation, web development, and innovative solutions.",
  keywords: [
    "digital agency",
    "web development",
    "digital transformation",
    "creative agency",
    "business solutions",
    "technology consulting",
    "web design",
    "mobile apps",
    "e-commerce",
    "AI automation",
  ],
  authors: [{ name: "Moodbod" }],
  creator: "Moodbod",
  publisher: "Moodbod",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://moodbod.agency"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moodbod.agency",
    title: "Moodbod Digital Agency - Empowering Digital Growth",
    description:
      "Moodbod Digital Agency blends creativity and technology to drive meaningful change for businesses everywhere.",
    siteName: "Moodbod",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Moodbod Digital Agency - Empowering Digital Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moodbod Digital Agency - Empowering Digital Growth",
    description:
      "Moodbod Digital Agency blends creativity and technology to drive meaningful change for businesses everywhere.",
    images: ["/images/og-image.jpg"],
    creator: "@moodbod",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData
          type="Organization"
          data={{
            service: [
              "Web Development",
              "Digital Transformation",
              "Mobile App Development",
              "E-commerce Solutions",
              "AI Automation",
              "Technology Consulting",
            ],
          }}
        />
        <StructuredData
          type="WebSite"
          data={{
            inLanguage: "en-US",
          }}
        />
      </head>
      <body className={`${urbanist.variable} ${inter.variable} antialiased`}>
        <Cursor />
        <Navbar />
        {children}
        <Cta />
        <Footer />
      </body>
    </html>
  );
}
