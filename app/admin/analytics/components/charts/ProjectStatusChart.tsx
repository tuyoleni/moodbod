'use client';

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProjects } from '@/lib/services/projectService';
import { ProjectStatus } from '@/lib/types';

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
      const statusCounts = Object.values(ProjectStatus).reduce((acc, status) => {
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
      backgroundColor: ['#3b82f6', '#22c55e', '#eab308', '#ef4444'],
      borderWidth: 0
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 10, padding: 10 }
      }
    }
  };

  return (
    <div className="h-[200px]">
      <Doughnut data={data} options={options} />
    </div>
  );
}