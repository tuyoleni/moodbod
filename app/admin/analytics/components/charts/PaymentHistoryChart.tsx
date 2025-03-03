'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllPayments } from '@/lib/services/paymentService';
// These imports can be removed since Payment type and convertToDate function are not used
import { format } from 'util';
import { convertToDate } from '@/lib/utils/dateUtils';
import { chartColors, commonChartOptions } from '@/lib/config/chartConfig';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PaymentHistoryChartProps {
  loading?: boolean;
}

export function PaymentHistoryChart({ loading: initialLoading }: PaymentHistoryChartProps) {
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
      const payments = await getAllPayments();
      const monthlyData = new Map<string, number>();

      payments.forEach((payment) => {
        const paymentDate = convertToDate(payment.createdAt);
        if (paymentDate) {
          const month = format(paymentDate, 'MMM yyyy');
          monthlyData.set(month, (monthlyData.get(month) || 0) + payment.amount);
        }
      });

      const sortedPayments = payments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      const labels = sortedPayments.map(payment => new Date(payment.createdAt).toLocaleDateString());
      const amounts = sortedPayments.map(payment => payment.amount);

      setPaymentData({ labels, amounts });
    } catch (error) {
      console.error('Error fetching payment data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  const data = {
    labels: paymentData.labels,
    datasets: [{
      label: 'Payment Amount',
      data: paymentData.amounts,
      borderColor: chartColors.accent,
      backgroundColor: chartColors.accentLight,
      fill: true
    }]
  };

  const options = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      tooltip: {
        ...commonChartOptions.plugins.tooltip,
        callbacks: {
          label: (tooltipItem: { raw: unknown }) => `$${(tooltipItem.raw as number).toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="h-[400px] w-full">
      <Line data={data} options={options} />
    </div>
  );
}