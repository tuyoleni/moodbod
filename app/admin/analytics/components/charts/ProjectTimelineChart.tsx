'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProjects } from '@/lib/services/projectService';
import { format } from 'date-fns';
import { convertToDate, getLocalTime } from '@/lib/utils/dateUtils';
import { chartColors, commonChartOptions } from '@/lib/config/chartConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function ProjectTimelineChart({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [timelineData, setTimelineData] = useState<{
    labels: string[];
    started: number[];
    completed: number[];
  }>({ labels: [], started: [], completed: [] });

  // Add useEffect to call fetchTimelineData
  useEffect(() => {
    fetchTimelineData();
  }, []);

  const fetchTimelineData = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      const monthlyData = new Map<string, { started: number; completed: number }>();

      // Get the date range for the last 6 months by default
      const today = new Date();
      const months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(today.getMonth() - i);
        return format(date, 'MMM yyyy');
      }).reverse();

      // Initialize all months with zero counts
      months.forEach(month => {
        monthlyData.set(month, { started: 0, completed: 0 });
      });

      // Process projects
      projects.forEach((project) => {
        const startDate = getLocalTime(convertToDate(project.startDate));
        const endDate = getLocalTime(convertToDate(project.endDate));

        if (startDate) {
          const startMonth = format(startDate, 'MMM yyyy');
          if (monthlyData.has(startMonth)) {
            const current = monthlyData.get(startMonth)!;
            monthlyData.set(startMonth, { ...current, started: current.started + 1 });
          }
        }

        if (endDate && project.status === 'completed') {
          const endMonth = format(endDate, 'MMM yyyy');
          if (monthlyData.has(endMonth)) {
            const current = monthlyData.get(endMonth)!;
            monthlyData.set(endMonth, { ...current, completed: current.completed + 1 });
          }
        }
      });

      // Prepare data for chart
      setTimelineData({
        labels: months,
        started: months.map(month => monthlyData.get(month)?.started || 0),
        completed: months.map(month => monthlyData.get(month)?.completed || 0)
      });
    } catch (error) {
      console.error('Error fetching timeline data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[200px]" />;

  const data = {
    labels: timelineData.labels,
    datasets: [
      {
        label: 'Started Projects',
        data: timelineData.started,
        backgroundColor: chartColors.accent,
        borderRadius: 4,
      },
      {
        label: 'Completed Projects',
        data: timelineData.completed,
        backgroundColor: chartColors.success,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    ...commonChartOptions,
    scales: {
      ...commonChartOptions.scales,
      x: {
        ...commonChartOptions.scales.x,
        stacked: true
      },
      y: {
        ...commonChartOptions.scales.y,
        stacked: true
      }
    }
  };

  return (
    <div className="h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
}