'use client';

import { Project } from '@/lib/types/database';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const formatStatus = (status: string | undefined) => {
    return status ? status.replace('_', ' ') : 'Unknown';
};

export default function ProjectTimeline({ project }: { project: Project }) {
    const milestones = [
        {
            title: 'Project Initiated',
            date: new Date(project.createdAt.seconds * 1000),
            status: 'completed',
            description: 'Project request submitted and approved'
        },
        {
            title: 'Requirements Gathering',
            date: new Date(project.createdAt.seconds * 1000),
            status: project.status === 'requested' ? 'current' : 'completed',
            description: 'Collecting and finalizing project requirements'
        },
        {
            title: 'Development In Progress',
            date: null,
            status: project.status === 'in_progress' ? 'current' :
                project.status === 'requested' ? 'pending' : 'completed',
            description: 'Active development and implementation'
        },
        {
            title: 'Review Phase',
            date: null,
            status: project.status === 'in_review' ? 'current' :
                ['requested', 'in_progress'].includes(project.status) ? 'pending' : 'completed',
            description: 'Client review and feedback'
        },
        {
            title: 'Project Completion',
            date: null,
            status: project.status === 'completed' ? 'completed' : 'pending',
            description: 'Final delivery and project closure'
        }
    ];

    return (
        <div className="space-y-8">
            <div className="relative">
                {milestones.map((milestone, index) => (
                    <div key={index} className="relative pb-12 last:pb-0">
                        {index !== milestones.length - 1 && (
                            <div className="absolute left-6 top-6 h-full w-px bg-gray-200" />
                        )}
                        <div className="flex gap-4">
                            <div className="relative z-10">
                                {milestone.status === 'completed' ? (
                                    <div className="rounded-full bg-black p-2">
                                        <CheckCircle2 className="h-4 w-4 text-white" />
                                    </div>
                                ) : milestone.status === 'current' ? (
                                    <div className="rounded-full bg-white border-2 border-black p-2">
                                        <Clock className="h-4 w-4 text-black" />
                                    </div>
                                ) : (
                                    <div className="rounded-full bg-gray-100 p-2">
                                        <AlertCircle className="h-4 w-4 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-medium">{milestone.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                                {milestone.date && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {milestone.date.toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <span className="text-sm">
                {formatStatus(project?.status)}
            </span>
        </div>
    );
} 