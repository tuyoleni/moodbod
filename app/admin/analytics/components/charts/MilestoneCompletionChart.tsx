'use client';

import { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { getProjectMilestones } from '@/lib/services/milestoneService';
import { fetchAllProjects } from '@/lib/services/projectService';
import { ServiceStatus, Milestone, Project } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MilestoneCompletionChartProps {
  loading?: boolean;
}

export function MilestoneCompletionChart({ loading: initialLoading }: MilestoneCompletionChartProps) {
  const [loading, setLoading] = useState(initialLoading);
  const [milestoneData, setMilestoneData] = useState<{
    labels: string[];
    completionRates: number[];
  }>({ labels: [], completionRates: [] });

  const fetchMilestoneData = useCallback(async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      const milestonesByProject = await Promise.all(
        projects.map(project => getProjectMilestones(project.id))
      );

      const projectMilestones = projects.map((project, index) => ({
        project,
        milestones: milestonesByProject[index]
      }));

      const completionData = calculateCompletionRates(projectMilestones);
      setMilestoneData(completionData);
    } catch (error) {
      console.error('Error fetching milestone data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMilestoneData();
  }, [fetchMilestoneData]);

  const calculateCompletionRates = (projectMilestones: { project: Project; milestones: Milestone[] }[]) => {
    const labels: string[] = [];
    const completionRates: number[] = [];

    projectMilestones.forEach(({ project, milestones }) => {
      if (milestones.length > 0) {
        const completedMilestones = milestones.filter(
          milestone => milestone.status === ServiceStatus.ACTIVE
        ).length;
        const completionRate = (completedMilestones / milestones.length) * 100;

        labels.push(project.name);
        completionRates.push(Number(completionRate.toFixed(2)));
      }
    });

    return { labels, completionRates };
  };

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Completion Rate: ${context.raw}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Completion Rate (%)'
        }
      }
    }
  };

  const data = {
    labels: milestoneData.labels,
    datasets: [
      {
        label: 'Project Milestone Completion Rate',
        data: milestoneData.completionRates,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      }
    ]
  };

  return <Line options={options} data={data} />;
}