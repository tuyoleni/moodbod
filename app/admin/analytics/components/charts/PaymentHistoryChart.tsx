'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { getPaymentsByProject } from '@/lib/services/paymentService';
import { fetchAllProjects } from '@/lib/services/projectService';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function PaymentHistoryChart({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [paymentData, setPaymentData] = useState<{
    labels: string[];
    amounts: number[];
  }>({ labels: [], amounts: [] });

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      const payments = await Promise.all(
        projects.map(project => getPaymentsByProject(project.id))
      );

      const paymentsByMonth = payments.flat().reduce((acc, payment) => {
        if (payment.date) {
          const month = format(payment.date.toDate(), 'MMM yyyy');
          acc[month] = (acc[month] || 0) + payment.amount;
        }
        return acc;
      }, {} as Record<string, number>);

      const sortedMonths = Object.keys(paymentsByMonth)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .slice(-6); // Show last 6 months

      setPaymentData({
        labels: sortedMonths,
        amounts: sortedMonths.map(month => paymentsByMonth[month])
      });
    } catch (error) {
      console.error('Error fetching payment data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[200px]" />;

  const data = {
    labels: paymentData.labels,
    datasets: [{
      label: 'Monthly Payments',
      data: paymentData.amounts,
      backgroundColor: '#22c55e',
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
      x: { grid: { display: false } },
      y: { 
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