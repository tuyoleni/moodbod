'use client';

import { useState, useEffect } from 'react';
import { useSessionCheck } from './useSessionCheck';

type FetchParams<T extends object> = T & { email: string };

export function useDataFetch<T, P extends object = {}>({
    fetchData,
    initialData,
    params,
}: {
    fetchData: (args: FetchParams<P>) => Promise<T>;
    initialData: T;
    params: P;
}) {
    const email = useSessionCheck();
    const [data, setData] = useState<T>(initialData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!email) return;

        const loadData = async () => {
            try {
                setIsLoading(true);
                const combinedParams = { ...params, email } as FetchParams<P>;
                const result = await fetchData(combinedParams);
                setData(result);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [email, params, fetchData]);

    return { data, isLoading, error };
}