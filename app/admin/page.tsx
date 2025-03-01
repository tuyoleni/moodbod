'use client';

import { AnalyticsDashboard } from "./analytics/components/AnalyticsDashboard";


export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <AnalyticsDashboard />
    </div>
  );
}