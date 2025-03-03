'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
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
import { chartColors, commonChartOptions } from '@/lib/config/chartConfig';

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
    completedRates: number[];
    pendingRates: number[];
  }>({ labels: [], completedRates: [], pendingRates: [] });

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
    const completedRates: number[] = [];
    const pendingRates: number[] = [];

    projectMilestones.forEach(({ project, milestones }) => {
      if (milestones.length > 0) {
        const completedMilestones = milestones.filter(
          milestone => milestone.status === ServiceStatus.ACTIVE
        ).length;
        const completionRate = (completedMilestones / milestones.length) * 100;
        const pendingRate = 100 - completionRate;

        labels.push(project.name);
        completedRates.push(Number(completionRate.toFixed(2)));
        pendingRates.push(Number(pendingRate.toFixed(2)));
      }
    });

    return { labels, completedRates, pendingRates };
  };

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  const data = {
    labels: milestoneData.labels,
    datasets: [
      {
        label: 'Completed',
        data: milestoneData.completedRates,
        backgroundColor: chartColors.success,
        borderRadius: 4,
      },
      {
        label: 'Pending',
        data: milestoneData.pendingRates,
        backgroundColor: chartColors.warning,
        borderRadius: 4,
      }
    ]
  };

  return (
    <div className="h-[400px] w-full">
      <Bar 
        data={data} 
        options={{
          ...commonChartOptions,
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
        }} 
      />
    </div>
  );
}