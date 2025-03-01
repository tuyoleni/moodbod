'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchUsers } from '@/lib/services/userService';
import { getProjectMessages } from '@/lib/services/communicationService';
import { fetchAllProjects } from '@/lib/services/projectService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function UserEngagementChart({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [engagementData, setEngagementData] = useState<{
    labels: string[];
    messageCount: number[];
    activeUsers: number[];
  }>({ labels: [], messageCount: [], activeUsers: [] });

  useEffect(() => {
    fetchEngagementData();
  }, []);

  const fetchEngagementData = async () => {
    try {
      setLoading(true);
      const [, projects] = await Promise.all([
        fetchUsers(),
        fetchAllProjects()
      ]);

      const messages = await Promise.all(
        projects.map(project => getProjectMessages(project.id))
      );
      const allMessages = messages.flat();

      // Get hours of the day (0-23)
      const hours = Array.from({ length: 12 }, (_, i) => i * 2);
      const hourLabels = hours.map(hour => 
        `${hour.toString().padStart(2, '0')}:00-${(hour + 2).toString().padStart(2, '0')}:00`
      );

      const messagesByHour = hours.map(hour => {
        return allMessages.filter(msg => {
          const msgHour = msg.createdAt?.getHours() || 0;
          return msgHour >= hour && msgHour < (hour + 2);
        }).length;
      });

      const activeUsersByHour = hours.map(hour => {
        const uniqueUsers = new Set(
          allMessages
            .filter(msg => {
              const msgHour = msg.createdAt?.getHours() || 0;
              return msgHour >= hour && msgHour < (hour + 2);
            })
            .map(msg => msg.userId)
        );
        return uniqueUsers.size;
      });

      setEngagementData({
        labels: hourLabels,
        messageCount: messagesByHour,
        activeUsers: activeUsersByHour
      });
    } catch (error) {
      console.error('Error fetching engagement data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[200px]" />;

  const data = {
    labels: engagementData.labels,
    datasets: [
      {
        label: 'Messages',
        data: engagementData.messageCount,
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
      {
        label: 'Active Users',
        data: engagementData.activeUsers,
        backgroundColor: '#22c55e',
        borderRadius: 4,
      }
    ]
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
      x: { 
        grid: { display: false },
        ticks: { maxRotation: 45 }
      },
      y: { 
        beginAtZero: true,
        grid: { color: '#e5e7eb' }
      }
    }
  };

  return (
    <div className="h-[200px]">
      <Bar data={data} options={options} />
    </div>
  );
}