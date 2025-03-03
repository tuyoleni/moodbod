'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchUsers } from '@/lib/services/userService';
import { getProjectMessages } from '@/lib/services/communicationService';
import { fetchAllProjects } from '@/lib/services/projectService';
import { Message } from '@/lib/types';
import { convertToDate, getLocalTime } from '@/lib/utils/dateUtils';
import { chartColors, stackedBarOptions } from '@/lib/config/chartConfig';

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
      const [users, projects] = await Promise.all([
        fetchUsers(),
        fetchAllProjects()
      ]);
      
      console.log('Projects fetched:', projects);  // Add this log

      const messages = await Promise.all(
        projects.map(project => getProjectMessages(project.id))
      );
      console.log('All messages:', messages.flat());  // Add this log

      const allMessages: Message[] = messages.flat();

      const hours = Array.from({ length: 12 }, (_, i) => i * 2);
      const hourLabels = hours.map(hour => 
        `${hour.toString().padStart(2, '0')}:00-${(hour + 2).toString().padStart(2, '0')}:00`
      );

      const messagesByHour = hours.map(hour => {
        return allMessages.filter(msg => {
          const msgDate = getLocalTime(convertToDate(msg.createdAt));
          if (!msgDate) return false;
          
          const msgHour = msgDate.getHours();
          return msgHour >= hour && msgHour < (hour + 2);
        }).length;
      });

      const activeUsersByHour = hours.map(hour => {
        const uniqueUsers = new Set(
          allMessages
            .filter(msg => {
              const msgDate = getLocalTime(convertToDate(msg.createdAt));
              if (!msgDate) return false;
              
              const msgHour = msgDate.getHours();
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
      console.log('Final engagement data:', {
        labels: hourLabels,
        messageCount: messagesByHour,
        activeUsers: activeUsersByHour
      });  // Add this log
    } catch (error) {
      console.error('Error fetching engagement data:', error);
    } finally {
      setLoading(false);
    }
};

  if (loading) return <Skeleton className="h-[400px] w-full" />;

  const data = {
    labels: engagementData.labels,
    datasets: [
      {
        label: 'Messages',
        data: engagementData.messageCount,
        backgroundColor: chartColors.accent,
        borderRadius: 4,
      },
      {
        label: 'Active Users',
        data: engagementData.activeUsers,
        backgroundColor: chartColors.success,
        borderRadius: 4,
      }
    ]
  };

  return (
    <div className="h-[400px] w-full bg-white rounded-lg p-4">
      <Bar data={data} options={stackedBarOptions} />
    </div>
  );
}