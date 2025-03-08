'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchUsersByRole } from '@/lib/services/userService';
import { fetchAllProjects } from '@/lib/services/projectService';
import { format } from 'date-fns';
import { chartColors, commonChartOptions } from '@/lib/config/chartConfig';
import { ServiceStatus } from '@/lib/types';

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
      const [clients, admins] = await Promise.all([
        fetchUsersByRole('client'),
        fetchUsersByRole('admin')
      ]);

      const clientIds = new Set(clients.map(client => client.id));
      const adminIds = new Set(admins.map(admin => admin.id));

      const last3Days = Array.from({ length: 3 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        return date;
      }).reverse();

      const labels = last3Days.map(date => format(date, 'EEE'));
      
      // Track client activities: project requests, feedback, service requests
      const clientActivity = last3Days.map(date => {
        const dayStart = new Date(date);
        const dayEnd = new Date(date.getTime() + 24 * 60 * 60 * 1000 - 1);
        
        return projects.filter(project => {
          const createdDate = project.createdAt?.toDate();
          const isClientProject = clientIds.has(project.userId);
          const hasNewServices = project.additionalServices?.length > 0;
          const hasFeedback = project.feedback?.length > 0;
          
          return isClientProject && createdDate && 
                 createdDate >= dayStart && createdDate <= dayEnd &&
                 (hasNewServices || hasFeedback);
        }).length;
      });

      // Track admin responses and approvals
      const adminActivity = last3Days.map(date => {
        const dayStart = new Date(date);
        const dayEnd = new Date(date.getTime() + 24 * 60 * 60 * 1000 - 1);
        
        return projects.filter(project => {
          const updatedDate = project.updatedAt?.toDate();
          const statusChanged = project.status !== ServiceStatus.REQUEST;
          const hasAdminResponse = project.milestones?.some(m => {
            return m.id === ServiceStatus.DEVELOPMENT;
          });
          
          return updatedDate && 
                 updatedDate >= dayStart && 
                 updatedDate <= dayEnd &&
                 (statusChanged || hasAdminResponse);
        }).length;
      });

      setActivityData({ labels, clientActivity, adminActivity });
    } catch (error) {
      console.error('Error fetching activity data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-[200px]" />;

  const chartData = {
    labels: activityData.labels,
    datasets: [
      {
        label: 'Clients',
        data: activityData.clientActivity,
        backgroundColor: chartColors.accent,
        borderRadius: 4,
      },
      {
        label: 'Admins',
        data: activityData.adminActivity,
        backgroundColor: chartColors.secondary,
        borderRadius: 4,
      }
    ]
  };

  return (
    <div className="h-[400px] w-full">
      <Bar data={chartData} options={commonChartOptions} />
    </div>
  );
}