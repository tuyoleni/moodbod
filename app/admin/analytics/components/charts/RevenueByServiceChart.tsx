'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProjects } from '@/lib/services/projectService';
import { getProjectServices } from '@/lib/services/serviceManagementService';
import { getPaymentsByProject } from '@/lib/services/paymentService';
import { chartColors, commonChartOptions } from '@/lib/config/chartConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function RevenueByServiceChart({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [serviceRevenue, setServiceRevenue] = useState<{
    labels: string[];
    amounts: number[];
  }>({ labels: [], amounts: [] });

  useEffect(() => {
    fetchServiceRevenue();
  }, []);

  const fetchServiceRevenue = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      
      const projectData = await Promise.all(
        projects.map(async project => ({
          services: await getProjectServices(project.id),
          payments: await getPaymentsByProject(project.id)
        }))
      );

      const revenueByService = projectData.reduce((acc, { services, payments }) => {
        const totalProjectRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
        const serviceCount = services.length || 1;
        const revenuePerService = totalProjectRevenue / serviceCount;

        services.forEach(service => {
          if (service.name) {
            acc[service.name] = (acc[service.name] || 0) + revenuePerService;
          }
        });
        return acc;
      }, {} as Record<string, number>);

      setServiceRevenue({
        labels: Object.keys(revenueByService),
        amounts: Object.values(revenueByService).map(amount => Number(amount.toFixed(2)))
      });
    } catch (error) {
      console.error('Error fetching service revenue:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[400px] w-full" />;

  const data = {
    labels: serviceRevenue.labels,
    datasets: [{
      label: 'Revenue by Service Type',
      data: serviceRevenue.amounts,
      backgroundColor: chartColors.accent,
      borderRadius: 4,
    }]
  };

  const options = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      tooltip: {
        ...commonChartOptions.plugins.tooltip,
        callbacks: {
          label: (tooltipItem: TooltipItem<'bar'>) => 
            `$${(tooltipItem.raw as number).toLocaleString()}`
        }
      }
    },
    scales: {
      ...commonChartOptions.scales,
      y: {
        ...commonChartOptions.scales.y,
        ticks: {
          ...commonChartOptions.scales.y.ticks,
          callback: (value: string | number) => 
            `$${Number(value).toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="h-[400px] w-full bg-white rounded-lg p-4">
      <Bar data={data} options={options} />
    </div>
  );
}