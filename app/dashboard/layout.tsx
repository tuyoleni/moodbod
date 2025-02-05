'use client';

import { DashboardProvider } from './components/DashboardProvider';
import DashboardLayout from './components/DashboardLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <DashboardProvider>
                <DashboardLayout>{children}</DashboardLayout>
            </DashboardProvider>
        </QueryClientProvider>
    );
} 