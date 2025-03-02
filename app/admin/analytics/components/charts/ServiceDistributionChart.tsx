'use client';

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { getProjectServices } from '@/lib/services/serviceManagementService';
import { fetchAllProjects } from '@/lib/services/projectService';

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
        acc[service.name] = (acc[service.name] || 0) + 1;
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
        '#3b82f6',
        '#22c55e',
        '#eab308',
        '#ef4444',
        '#8b5cf6'
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
      }
    }
  };

  return (
    <div className="h-[200px]">
      <Doughnut data={data} options={options} />
    </div>
  );
}