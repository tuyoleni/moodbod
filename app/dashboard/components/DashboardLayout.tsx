'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Auto-collapse on mobile
    useEffect(() => {
        const handleResize = () => {
            setIsExpanded(window.innerWidth >= 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="inset-y-0 z-30 h-screen fixed top-0">
                <Sidebar />
            </div>

            <div className={cn(
                "flex-1",
                isExpanded ? "pl-[16rem]" : "pl-[4rem]"
            )}>
                <main className="min-h-screen">
                    <div className="mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div >
    );
}
