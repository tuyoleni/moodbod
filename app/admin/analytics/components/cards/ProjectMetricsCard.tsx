'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FolderKanban } from 'lucide-react';
import { fetchAllProjects } from '@/lib/services/projectService';

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
    <Card className="h-24">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Projects</CardTitle>
        <FolderKanban className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <div className="text-xl font-bold">{projectData.total}</div>
        )}
      </CardContent>
    </Card>
  );
}