'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProjects } from '@/lib/services/projectService';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function ProjectTimelineChart({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [timelineData, setTimelineData] = useState<{
    labels: string[];
    started: number[];
    completed: number[];
  }>({ labels: [], started: [], completed: [] });

  useEffect(() => {
    fetchTimelineData();
  }, []);

  const fetchTimelineData = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      const monthlyData = new Map<string, { started: number; completed: number }>();

      projects.forEach(project => {
        if (project.startDate) {
          const startMonth = format(project.startDate.toDate(), 'MMM yyyy');
          const current = monthlyData.get(startMonth) || { started: 0, completed: 0 };
          monthlyData.set(startMonth, { ...current, started: current.started + 1 });
        }
        if (project.completedDate) {
          const endMonth = format(project.completedDate.toDate(), 'MMM yyyy');
          const current = monthlyData.get(endMonth) || { started: 0, completed: 0 };
          monthlyData.set(endMonth, { ...current, completed: current.completed + 1 });
        }
      });

      const sortedMonths = Array.from(monthlyData.keys()).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );

      setTimelineData({
        labels: sortedMonths,
        started: sortedMonths.map(month => monthlyData.get(month)?.started || 0),
        completed: sortedMonths.map(month => monthlyData.get(month)?.completed || 0)
      });
    } catch (error) {
      console.error('Error fetching project timeline data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[200px]" />;

  const data = {
    labels: timelineData.labels,
    datasets: [
      {
        label: 'Started',
        data: timelineData.started,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f680',
        tension: 0.3
      },
      {
        label: 'Completed',
        data: timelineData.completed,
        borderColor: '#22c55e',
        backgroundColor: '#22c55e80',
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 10, padding: 10 }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { 
        beginAtZero: true,
        grid: { color: '#e5e7eb' }
      }
    }
  };

  return (
    <div className="h-[200px]">
      <Line data={data} options={options} />
    </div>
  );
}