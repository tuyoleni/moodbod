import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'lh3.googleusercontent.com',  // For Google profile pictures
      'firebasestorage.googleapis.com'  // For Firebase Storage (if you use it)
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
