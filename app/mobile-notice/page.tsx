'use client';

import { ArrowLeft } from "lucide-react";
import { signOut } from 'next-auth/react';

export default function MobileNoticePage() {
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Desktop Experience Required</h1>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Our dashboard is optimized for desktop viewing to ensure you have the best possible experience managing your projects.
          </p>
          <p>
            For the highest quality of service and full access to all features, please access the dashboard from a desktop computer.
          </p>
          <p className="font-medium text-primary">
            We value your commitment to quality, just as we are committed to providing you with the best possible service.
          </p>
        </div>
        <a 
          href="/"
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Homepage
        </a>
      </div>
    </div>
  );
}