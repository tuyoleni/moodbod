'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity } from 'lucide-react';
import { fetchAllProjects } from '@/lib/services/projectService';
import { ProjectStatus } from '@/lib/types';

export function ActiveProjectsCard({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    fetchActiveProjects();
  }, []);

  const fetchActiveProjects = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      const active = projects.filter(
        project => project.status === ProjectStatus.IN_PROGRESS
      ).length;
      setActiveCount(active);
    } catch (error) {
      console.error('Error fetching active projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-24">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <div className="text-xl font-bold">{activeCount}</div>
        )}
      </CardContent>
    </Card>
  );
}