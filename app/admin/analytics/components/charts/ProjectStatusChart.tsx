'use client';

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProjects } from '@/lib/services/projectService';
import { ServiceStatus } from '@/lib/types';
import { chartColors, commonChartOptions, pieChartOptions } from '@/lib/config/chartConfig';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ProjectStatusChart({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [statusData, setStatusData] = useState<{ labels: string[]; counts: number[] }>({ labels: [], counts: [] });

  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      const statusCounts = Object.values(ServiceStatus).reduce((acc, status) => {
        acc[status] = projects.filter(project => project.status === status).length;
        return acc;
      }, {} as Record<string, number>);

      setStatusData({
        labels: Object.keys(statusCounts),
        counts: Object.values(statusCounts)
      });
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[200px]" />;

  const data = {
    labels: statusData.labels,
    datasets: [{
      data: statusData.counts,
      backgroundColor: [
        chartColors.success,
        chartColors.accent,
        chartColors.warning,
        chartColors.error
      ],
      borderWidth: 0
    }]
  };

  return (
    <div className="h-[400px] w-full bg-white rounded-lg p-4">
      <Doughnut data={data} options={pieChartOptions} />
    </div>
  );
}