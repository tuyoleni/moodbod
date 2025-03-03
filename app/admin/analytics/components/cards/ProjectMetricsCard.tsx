'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FolderKanban } from 'lucide-react';
import { fetchAllProjects } from '@/lib/services/projectService';
import { metricCardStyles } from './MetricCardStyles';

interface ProjectMetricsCardProps {
  loading?: boolean;
}

export function ProjectMetricsCard({ loading: initialLoading }: ProjectMetricsCardProps) {
  const [loading, setLoading] = useState(initialLoading);
  const [projectData, setProjectData] = useState({ total: 0, growth: 0 });

  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      setProjectData({
        total: projects.length,
        growth: 0 // You can implement growth calculation if needed
      });
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={metricCardStyles.card}>
      <CardHeader className={metricCardStyles.header}>
        <CardTitle className={metricCardStyles.title}>Total Projects</CardTitle>
        <FolderKanban className={metricCardStyles.icon} />
      </CardHeader>
      <CardContent className={metricCardStyles.content}>
        {loading ? (
          <Skeleton className={metricCardStyles.skeleton} />
        ) : (
          <div className={metricCardStyles.value}>{projectData.total}</div>
        )}
      </CardContent>
    </Card>
  );
}