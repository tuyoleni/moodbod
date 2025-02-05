'use client';

import { Project } from '@/lib/types/database';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

const formatStatus = (status: string | undefined) => {
    return status ? status.replace('_', ' ') : 'Unknown';
};

export default function ProjectHeader({ project }: { project: Project }) {
    const router = useRouter();

    return (
        <div className="space-y-4">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-black"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
            </button>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-semibold">{project.name}</h1>
                    <p className="text-gray-600 mt-2">{project.description}</p>
                </div>

                <div className="flex items-center gap-4">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg 
                            hover:border-black transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Live
                        </a>
                    )}
                    <div className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusColor(project.status)}`}>
                        {formatStatus(project?.status)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">Project Value</p>
                    <p className="text-2xl font-semibold mt-1">
                        ${project.totalCost.toLocaleString()}
                    </p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <p className="text-2xl font-semibold mt-1">
                        {Math.round((project.paidAmount / project.totalCost) * 100)}% paid
                    </p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">Revisions Remaining</p>
                    <p className="text-2xl font-semibold mt-1">
                        {project.package.features?.find(f => f.includes('revision'))?.match(/\d+/)?.[0] || 0}
                    </p>
                </div>
            </div>
        </div>
    );
}

function getStatusColor(status: string) {
    switch (status) {
        case 'requested': return 'bg-black/5 text-black';
        case 'in_progress': return 'bg-black/5 text-black';
        case 'in_review': return 'bg-black/5 text-black';
        case 'completed': return 'bg-black text-white';
        default: return 'bg-black/5 text-black';
    }
} 