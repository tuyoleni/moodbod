'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { getPaymentsByProject } from '@/lib/services/paymentService';
import { fetchAllProjects } from '@/lib/services/projectService';
import { format } from 'date-fns';
import { chartColors, commonChartOptions } from '@/lib/config/chartConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface RevenueChartProps {
  loading?: boolean;
}

export function RevenueChart({ loading: initialLoading }: RevenueChartProps) {
  const [loading, setLoading] = useState(initialLoading);
  const [revenueData, setRevenueData] = useState<{ labels: string[]; amounts: number[] }>({ labels: [], amounts: [] });

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      const projectPayments = await Promise.all(projects.map(project => getPaymentsByProject(project.id)));
      const monthlyRevenue = new Map<string, number>();

      projectPayments.flat().forEach(payment => {
        if (payment.createdAt) {
          const monthYear = format(payment.createdAt, 'MMM');
          monthlyRevenue.set(monthYear, (monthlyRevenue.get(monthYear) || 0) + payment.amount);
        }
      });

      const last6Months = Array.from(monthlyRevenue.entries())
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .slice(-6);

      setRevenueData({
        labels: last6Months.map(([month]) => month),
        amounts: last6Months.map(([, amount]) => amount)
      });
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[400px] w-full" />;

  const data = {
    labels: revenueData.labels,
    datasets: [{
      label: 'Revenue',
      data: revenueData.amounts,
      borderColor: chartColors.accent,
      backgroundColor: `${chartColors.accent}20`,
      tension: 0.3,
      fill: true
    }]
  };

  return (
    <div className="h-[400px] w-full bg-white rounded-lg p-4">
      <Line data={data} options={commonChartOptions} />
    </div>
  );
}