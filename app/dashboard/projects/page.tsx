'use client';

import { useQuery } from '@tanstack/react-query';
import { Project } from '@/lib/types/database';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchUserProjects } from '@/lib/firebase/services/services';
import { logo } from '@/public/assets';
import Image from 'next/image';

export default function ProjectsPage() {
    const { data: session, status } = useSession();
    const [projects, setProjects] = useState<Project[]>([]);
    const router = useRouter();

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
            <Image src={logo} alt="Loading" width={40} height={40} />
        </div>;
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Projects</h1>
                <button
                    onClick={() => router.push('/dashboard/project')}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition-colors"
                >
                    New Project
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects?.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                        className="group p-6 bg-white rounded-lg border border-gray-200 
                        hover:border-black transition-all cursor-pointer"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold">{project.name}</h3>
                                <p className="text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-6">
                            <span className={`px-3 py-1 rounded-md text-sm font-medium 
                            ${project.status === 'completed' ? 'bg-black text-white' : 'bg-black/5 text-black'}`}>
                                {/* {project.status.replace('_', ' ')} */}
                            </span>
                            <span className="text-sm text-gray-500">
                                Created {new Date(project.createdAt.seconds * 1000).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="flex justify-between items-end mt-6 pt-6 border-t border-gray-100">
                            <div>
                                <p className="text-sm text-gray-600">Project Value</p>
                                <p className="text-xl font-semibold mt-1">${project.totalCost.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Payment Status</p>
                                <p className="text-sm font-medium mt-1">
                                    {project.paidAmount > 0 ?
                                        `${Math.round((project.paidAmount / project.totalCost) * 100)}% paid` :
                                        'Pending payment'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 