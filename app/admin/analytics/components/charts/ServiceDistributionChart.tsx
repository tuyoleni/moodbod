'use client';

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { getProjectServices } from '@/lib/services/serviceManagementService';
import { fetchAllProjects } from '@/lib/services/projectService';
import { chartColors, commonChartOptions } from '@/lib/config/chartConfig';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ServiceDistributionChart({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [serviceData, setServiceData] = useState<{
    labels: string[];
    counts: number[];
  }>({ labels: [], counts: [] });

  useEffect(() => {
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      const services = await Promise.all(
        projects.map(project => getProjectServices(project.id))
      );

      const serviceCounts = services.flat().reduce((acc, service) => {
        if (service.name) {
          acc[service.name] = (acc[service.name] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      setServiceData({
        labels: Object.keys(serviceCounts),
        counts: Object.values(serviceCounts)
      });
    } catch (error) {
      console.error('Error fetching service data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[200px]" />;

  const data = {
    labels: serviceData.labels,
    datasets: [{
      data: serviceData.counts,
      backgroundColor: [
        chartColors.accent,
        chartColors.success,
        chartColors.warning,
        chartColors.error,
        chartColors.secondary,
        `${chartColors.accent}80`
      ],
      borderWidth: 0
    }]
  };

  return (
    <div className="h-[400px] w-full">
      <Doughnut data={data} options={commonChartOptions} />
    </div>
  );
}