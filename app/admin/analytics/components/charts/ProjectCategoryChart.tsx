'use client';

import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProjects } from '@/lib/services/projectService';
import { Project } from '@/lib/types/project';
import { chartColors, pieChartOptions } from '@/lib/config/chartConfig';

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

  if (loading) return <Skeleton className="h-[400px] w-full" />;

  const data = {
    labels: categoryData.labels,
    datasets: [{
      data: categoryData.counts,
      backgroundColor: [
        chartColors.accent,
        chartColors.category2,
        chartColors.category3,
        chartColors.category4,
        chartColors.category5
      ],
      borderWidth: 0
    }]
  };

  return (
    <div className="h-[400px] w-full bg-white rounded-lg p-4">
      <Pie data={data} options={pieChartOptions} />
    </div>
  );
}