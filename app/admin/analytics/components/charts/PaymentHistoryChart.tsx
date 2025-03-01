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
import { Payment } from '@/lib/types/payment';

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
    datasets: [
      {
        label: 'Payment Amount',
        data: paymentData.amounts,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: { raw: unknown }) => `Amount: $${tooltipItem.raw as number}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)'
        }
      }
    }
  };

  return <Line options={options} data={data} />;
}