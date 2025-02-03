'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Project } from '@/lib/types/database';
import { fetchUserProjects } from '@/lib/firebase/services';
import ProjectsSection from './sections/ProjectsSection';
import PricingSection from './sections/PricingSection';
import MessagesSection from './sections/MessagesSection';
import ActivitySection from './sections/ActivitySection';
import NewProjectWizard from './components/NewProjectWizard';

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('projects');
    const [projects, setProjects] = useState<Project[]>([]);
    const showWizard = usePathname() === '/dashboard/new';

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/register');
            return;
        }

        if (session?.user?.email) {
            fetchUserProjects(session.user.email).then(setProjects);
        }
    }, [status, session, router]);

    if (status === 'loading') {
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    const renderSection = () => {
        switch (activeSection) {
            case 'projects':
                return <ProjectsSection projects={projects} onNewProject={() => router.push('/dashboard/new')} />;
            case 'pricing':
                return <PricingSection />;
            case 'messages':
                return <MessagesSection />;
            case 'activity':
                return <ActivitySection />;
            default:
                return <ProjectsSection projects={projects} onNewProject={() => router.push('/dashboard/new')} />;
        }
    };

    return (
        <div className="relative">
            <div className={`transition-all duration-200 ${showWizard ? 'mr-[800px]' : ''}`}>
                {renderSection()}
            </div>
            {showWizard && <NewProjectWizard isOpen={false} onClose={function (): void {
                throw new Error('Function not implemented.');
            }} />}
        </div>
    );
} 