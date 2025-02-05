'use client';

import { createContext, useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

type DashboardContextType = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    navigate: (path: string) => void;
    currentSection: string;
};

const DashboardContext = createContext<DashboardContextType>({
    loading: false,
    setLoading: () => { },
    navigate: () => { },
    currentSection: '',
});

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [currentSection] = useState('');
    const router = useRouter();
    const [queryClient] = useState(() => new QueryClient());


    const navigate = async (path: string) => {
        setLoading(true);
        await router.push(path);
        setLoading(false);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <DashboardContext.Provider value={{
                loading,
                setLoading,
                navigate,
                currentSection,
            }}>
                {children}
            </DashboardContext.Provider>
        </QueryClientProvider>
    );
}

export const useDashboard = () => useContext(DashboardContext); 