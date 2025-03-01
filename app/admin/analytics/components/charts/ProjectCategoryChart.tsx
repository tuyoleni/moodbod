'use client';

import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProjects } from '@/lib/services/projectService';
import { Project } from '@/lib/types/project';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProjectCategoryChartProps {
  loading?: boolean;
}

export function ProjectCategoryChart({ loading: initialLoading }: ProjectCategoryChartProps) {
  const [loading, setLoading] = useState(initialLoading);
  const [categoryData, setCategoryData] = useState<{
    labels: string[];
    counts: number[];
  }>({ labels: [], counts: [] });

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      
      const categoryCounts = projects.reduce((acc: Record<string, number>, project: Project) => {
        const category = project.type || 'Uncategorized';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      setCategoryData({
        labels: Object.keys(categoryCounts),
        counts: Object.values(categoryCounts)
      });
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[200px]" />;

  const data = {
    labels: categoryData.labels,
    datasets: [{
      data: categoryData.counts,
      backgroundColor: [
        '#3b82f6',
        '#22c55e',
        '#eab308',
        '#ef4444',
        '#8b5cf6',
        '#ec4899'
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
          label: (tooltipItem: TooltipItem<'pie'>) => {
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((tooltipItem.raw as number / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="h-[200px]">
      <Pie data={data} options={options} />
    </div>
  );
}