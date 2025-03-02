'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchUsers } from '@/lib/services/userService';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function UserGrowthChart({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [growthData, setGrowthData] = useState<{
    labels: string[];
    counts: number[];
  }>({ labels: [], counts: [] });

  useEffect(() => {
    fetchGrowthData();
  }, []);

  const fetchGrowthData = async () => {
    try {
      setLoading(true);
      const users = await fetchUsers();
      
      const usersByMonth = users.reduce((acc, user) => {
        if (user.createdAt) {
          const month = format(user.createdAt, 'MMM yyyy');
          acc[month] = (acc[month] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const sortedMonths = Object.keys(usersByMonth).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );

      let cumulativeCount = 0;
      const cumulativeCounts = sortedMonths.map(month => {
        cumulativeCount += usersByMonth[month];
        return cumulativeCount;
      });

      setGrowthData({
        labels: sortedMonths,
        counts: cumulativeCounts
      });
    } catch (error) {
      console.error('Error fetching user growth data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[200px]" />;

  const data = {
    labels: growthData.labels,
    datasets: [{
      label: 'Total Users',
      data: growthData.counts,
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f680',
      tension: 0.3,
      fill: true
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
    },
    scales: {
      x: { grid: { display: false } },
      y: { 
        beginAtZero: true,
        grid: { color: '#e5e7eb' }
      }
    }
  };

  return (
    <div className="h-[200px]">
      <Line data={data} options={options} />
    </div>
  );
}