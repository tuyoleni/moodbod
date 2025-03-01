'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchUsersByRole } from '@/lib/services/userService';
import { getProjectMessages } from '@/lib/services/communicationService';
import { fetchAllProjects } from '@/lib/services/projectService';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function UserActivityChart({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [activityData, setActivityData] = useState<{
    labels: string[];
    clientActivity: number[];
    adminActivity: number[];
  }>({ labels: [], clientActivity: [], adminActivity: [] });

  useEffect(() => {
    fetchActivityData();
  }, []);

  const fetchActivityData = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      const messages = await Promise.all(projects.map(project => getProjectMessages(project.id)));
      const [clients, admins] = await Promise.all([
        fetchUsersByRole('client'),
        fetchUsersByRole('admin')
      ]);

      const clientIds = new Set(clients.map(client => client.id));
      const adminIds = new Set(admins.map(admin => admin.id));
      const allMessages = messages.flat();

      const last5Days = Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date;
      }).reverse();

      const labels = last5Days.map(date => format(date, 'EEE'));
      const clientActivity = last5Days.map(date =>
        allMessages.filter(msg => 
          msg.createdAt?.toDate().toDateString() === date.toDateString() &&
          clientIds.has(msg.userId)
        ).length
      );
      const adminActivity = last5Days.map(date =>
        allMessages.filter(msg => 
          msg.createdAt?.toDate().toDateString() === date.toDateString() &&
          adminIds.has(msg.userId)
        ).length
      );

      setActivityData({ labels, clientActivity, adminActivity });
    } catch (error) {
      console.error('Error fetching activity data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[200px]" />;

  const data = {
    labels: activityData.labels,
    datasets: [
      {
        label: 'Clients',
        data: activityData.clientActivity,
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
      {
        label: 'Admins',
        data: activityData.adminActivity,
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
      x: { grid: { display: false } },
      y: { 
        grid: { color: '#e5e7eb' },
        beginAtZero: true
      }
    }
  };

  return (
    <div className="h-[200px]">
      <Bar data={data} options={options} />
    </div>
  );
}