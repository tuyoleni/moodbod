'use client';

import { useAuth } from "@/lib/hooks/useAuth";

export default function AdminDashboard() {
    const { session, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {session?.user?.name}</p>
            <p>Role: {session?.user?.role}</p>
        </div>
    );
}