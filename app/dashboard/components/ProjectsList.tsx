'use client';

import { Project } from '@/lib/types/database';
import { getUserProjects } from '@/lib/firebase/services/projects';
import { useDataFetch } from '@/lib/hooks/useDataFetch';
import { Loader2 } from 'lucide-react';

export default function ProjectsList() {
    const { data: projects, isLoading, error } = useDataFetch<Project[]>({
        fetchData: getUserProjects,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-48">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {projects?.map((project) => (
                <div
                    key={project.id}
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {project.type}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                            {project.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

function getStatusColor(status: string) {
    switch (status) {
        case 'requested':
            return 'bg-blue-100 text-blue-800';
        case 'in_progress':
            return 'bg-yellow-100 text-yellow-800';
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'on_hold':
            return 'bg-orange-100 text-orange-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}
