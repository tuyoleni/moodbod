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

export const metadata: Metadata = {
  title: "Moodbod",
  description: "We make websites, apps, and tools that help you start, grow, and scale your business. Just what you need to succeed online.",
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
    "Moodbod"
  ],
  openGraph: {
    title: "Moodbod | Make Your Digital Dream Real",
    description: "At Moodbod, we turn your big ideas into awesome digital creations. From websites to apps, we help your business shine online and share your vision with the world.",
    siteName: "Moodbod",
    type: "website",
  },
};

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
    </html >
  );
}