'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './components/Sidebar';
import NewProjectWizard from './components/NewProjectWizard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const showWizard = pathname === '/dashboard/new';

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className={`flex-1 p-8 ${showWizard ? 'mr-[800px]' : ''}`}>
                {children}
                {showWizard && <NewProjectWizard isOpen={false} onClose={function (): void {
                    throw new Error('Function not implemented.');
                }} />}
            </main>
        </div>
    );
} 