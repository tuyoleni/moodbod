'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Project } from '@/lib/types/database';
import ProjectWizard from './project/page';
import ProjectCard from './components/ProjectCard';
import { fetchUserProjects } from '@/lib/firebase/services/services';
export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const showWizard = usePathname() === '/dashboard/project';

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

    const activeProjects = projects.filter(p => p.status !== 'completed');
    const needsReview = projects.filter(p => p.status === 'in_review');
    const totalValue = projects.reduce((sum, p) => sum + p.totalCost, 0).toLocaleString();

    // Stats data
    const stats = [
        {
            title: 'Active Projects',
            value: activeProjects.length,
        },
        {
            title: 'Needs Review',
            value: needsReview.length,
        },
        {
            title: 'Total Value',
            value: `$${totalValue}`,
        },
    ];

    return (
        <div className="relative">
            <div className={`transition-all duration-200 ${showWizard ? 'mr-[800px]' : ''}`}>
                <div className="p-8 space-y-8">
                    <h1 className="text-3xl font-semibold">Overview</h1>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="p-6 bg-white rounded-lg border border-gray-200">
                                <h3 className="text-sm text-gray-600">{stat.title}</h3>
                                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Recent Projects */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeProjects.slice(0, 4).map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    variant="overview"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {showWizard && <ProjectWizard />}
        </div>
    );
}
