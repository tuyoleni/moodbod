'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProjects } from '@/lib/services/projectService';
import { getProjectServices } from '@/lib/services/serviceManagementService';
import { getPaymentsByProject } from '@/lib/services/paymentService';

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
          acc[service.type] = (acc[service.type] || 0) + revenuePerService;
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

  if (loading) return <Skeleton className="h-[200px]" />;

  const data = {
    labels: serviceRevenue.labels,
    datasets: [{
      label: 'Revenue by Service Type',
      data: serviceRevenue.amounts,
      backgroundColor: '#3b82f6',
      borderRadius: 4,
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
          label: (context: any) => `$${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: { maxRotation: 45 }
      },
      y: { 
        beginAtZero: true,
        grid: { color: '#e5e7eb' },
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="h-[200px]">
      <Bar data={data} options={options} />
    </div>
  );
}