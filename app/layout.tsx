import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
});

export async function generateMetadata(): Promise<Metadata> {
  const baseTitle = "Moodbod | Web & App Development";
  const baseDescription = "Expert web development, marketing, and digital solutions for businesses. Custom websites, apps, and growth strategies that drive success. UK-based, serving clients worldwide.";

  return {
    title: baseTitle,
    description: baseDescription,
    manifest: '/manifest.json',
    icons: {
      icon: '/icons/favicon.ico',
      apple: '/icons/apple-touch-icon.png',
      shortcut: [
        { url: '/icons/favicon-16x16.png', sizes: '16x16' },
        { url: '/icons/favicon-32x32.png', sizes: '32x32' },
        { url: '/icons/android-chrome-192x192.png', sizes: '192x192' },
        { url: '/icons/android-chrome-512x512.png', sizes: '512x512' }
      ]
    },
    keywords: [
      // Website Searches
      "how to get a website",
      "website prices",
      "cheap website",
      "best website builder",
      "website for small business",
      "how much does a website cost",
      "website designer near me",
      "online store website",
      "make a shop website",
      "company website design",
      "fix my website",
      "update my website",
      "website help",
      "make my website look better",
      "website not working",
      "website shows up on Google",

      // App Searches
      "how to make an app",
      "app developer",
      "how much to build an app",
      "create an app for my business",
      "iPhone app maker",
      "Android app creator",
      "app for my shop",
      "business app cost",
      "simple business app",
      "app ideas",
      "turn website into app",

      // Marketing & Growth
      "digital marketing",
      "marketing strategy",
      "SEO optimization",
      "social media marketing",
      "business growth",
      "online presence",
      "market research",
      "product launch",
      "go-to-market strategy",

      // Business Help
      "get more customers online",
      "sell stuff online",
      "make money online",
      "business help near me",
      "online business ideas",
      "start selling online",
      "get found on Google",
      "social media help",
      "Facebook for business help",
      "Instagram for business",
      "online advertising help",

      // Location-based
      "digital agency near me",
      "marketing agency",
      "business consultant",
      "local business solutions",
      "Moodbod"
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://moodbod.com',
    },
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      siteName: "Moodbod",
      type: "website",
      locale: 'en_US',
      url: 'https://www.moodbod.com',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Moodbod - Web & App Development',
        },
      ],
    }
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}