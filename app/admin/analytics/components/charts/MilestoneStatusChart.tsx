'use client';

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProjects } from '@/lib/services/projectService';
import { getProjectMilestones } from '@/lib/services/milestoneService';
import { ServiceStatus } from '@/lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

export function MilestoneStatusChart({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [statusData, setStatusData] = useState<{
    labels: string[];
    counts: number[];
  }>({ labels: [], counts: [] });

  useEffect(() => {
    fetchMilestoneData();
  }, []);

  const fetchMilestoneData = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      const milestones = await Promise.all(
        projects.map(project => getProjectMilestones(project.id))
      );

      const statusCounts = milestones.flat().reduce((acc, milestone) => {
        acc[milestone.status] = (acc[milestone.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const labels = Object.keys(statusCounts).map(status => {
        switch (status) {
          case ServiceStatus.ACTIVE:
            return 'Completed';
          case ServiceStatus.PENDING:
            return 'In Progress';
          case ServiceStatus.REJECTED:
            return 'Blocked';
          default:
            return status;
        }
      });

      setStatusData({
        labels,
        counts: Object.values(statusCounts)
      });
    } catch (error) {
      console.error('Error fetching milestone data:', error);
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
        '#22c55e', // Completed
        '#3b82f6', // In Progress
        '#ef4444', // Blocked
      ],
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
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: { dataset: { data: number[] }; raw: unknown; label: string; }) => {
            const total = tooltipItem.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((tooltipItem.raw as number / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="h-[200px]">
      <Doughnut data={data} options={options} />
    </div>
  );
}