'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity } from 'lucide-react';
import { fetchAllProjects } from '@/lib/services/projectService';
import { ServiceStatus } from '@/lib/types';
import { metricCardStyles } from './MetricCardStyles';

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
        project => project.status === ServiceStatus.ANALYZING
      ).length;
      setActiveCount(active);
    } catch (error) {
      console.error('Error fetching active projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={metricCardStyles.card}>
      <CardHeader className={metricCardStyles.header}>
        <CardTitle className={metricCardStyles.title}>Active Projects</CardTitle>
        <Activity className={metricCardStyles.icon} />
      </CardHeader>
      <CardContent className={metricCardStyles.content}>
        {loading ? (
          <Skeleton className={metricCardStyles.skeleton} />
        ) : (
          <div className={metricCardStyles.value}>{activeCount}</div>
        )}
      </CardContent>
    </Card>
  );
}