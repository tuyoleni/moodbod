'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users } from 'lucide-react';
import { fetchUsers } from '@/lib/services/userService';

interface UserMetricsCardProps {
  loading?: boolean;
}

export function UserMetricsCard({ loading: initialLoading }: UserMetricsCardProps) {
  const [loading, setLoading] = useState(initialLoading);
  const [userData, setUserData] = useState({ total: 0, growth: 0 });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const users = await fetchUsers();
      setUserData({
        total: users.length,
        growth: 0 // You can implement growth calculation if needed
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-24">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Users</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <div className="text-xl font-bold">{userData.total}</div>
        )}
      </CardContent>
    </Card>
  );
}