'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign } from 'lucide-react';
import { getPaymentsByProject } from '@/lib/services/paymentService';
import { fetchAllProjects } from '@/lib/services/projectService';
import { metricCardStyles } from './MetricCardStyles';

export function RevenueMetricsCard({ loading: initialLoading }: { loading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const projects = await fetchAllProjects();
      const payments = await Promise.all(
        projects.map(project => getPaymentsByProject(project.id))
      );
      const total = payments.flat().reduce((sum, payment) => sum + payment.amount, 0);
      setTotalRevenue(total);
    } catch (error) {
      console.error('Error fetching revenue:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={metricCardStyles.card}>
      <CardHeader className={metricCardStyles.header}>
        <CardTitle className={metricCardStyles.title}>Total Revenue</CardTitle>
        <DollarSign className={metricCardStyles.icon} />
      </CardHeader>
      <CardContent className={metricCardStyles.content}>
        {loading ? (
          <Skeleton className={metricCardStyles.skeleton} />
        ) : (
          <div className={metricCardStyles.value}>
            ${totalRevenue.toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}