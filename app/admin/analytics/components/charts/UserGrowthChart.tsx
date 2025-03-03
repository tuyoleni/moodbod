'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchUsers } from '@/lib/services/userService';
import { format } from 'date-fns';
import { convertToDate, getLocalTime } from '@/lib/utils/dateUtils';
import { chartColors, commonChartOptions } from '@/lib/config/chartConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function UserGrowthChart({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [growthData, setGrowthData] = useState<{
    labels: string[];
    counts: number[];
  }>({ labels: [], counts: [] });

  const fetchGrowthData = async () => {
    try {
      setLoading(true);
      const users = await fetchUsers();
      
      const usersByMonth = users.reduce((acc, user) => {
        const createdDate = getLocalTime(convertToDate(user.createdAt ?? null));
        if (createdDate) {
          const month = format(createdDate, 'MMM yyyy');
          acc[month] = (acc[month] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const sortedMonths = Object.keys(usersByMonth).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
      });

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

  useEffect(() => {
    fetchGrowthData();
  }, []);

  if (loading) return <Skeleton className="h-[200px]" />;

  // Update data and options
  const data = {
    labels: growthData.labels,
    datasets: [{
      label: 'Total Users',
      data: growthData.counts,
      borderColor: chartColors.accent,
      backgroundColor: `${chartColors.accent}20`,
      tension: 0.3,
      fill: true
    }]
  };
  
  return (
    <div className="h-[400px] w-full">
      <Line data={data} options={commonChartOptions} />
    </div>
  );
}