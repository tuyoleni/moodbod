'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Milestone, Project } from '@/lib/types/database';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

export default function ProjectDetailsPage() {
    const params = useParams();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        // Fetch project details
        const fetchProject = async () => {
            // Implement project fetching
        };
        fetchProject();
    }, [params.id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold">{project.name}</h1>
                <p className="text-gray-600 mt-1">{project.description}</p>
            </div>

            {/* Project Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Project Status</h2>
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
                            project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {project.status.replace('_', ' ')}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Timeline</h2>
                    {/* Add timeline component */}
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Budget</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Cost</span>
                            <span className="font-medium">N${project.totalCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Paid Amount</span>
                            <span className="font-medium">N${project.paidAmount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Services</h2>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">
                        <Plus className="w-4 h-4" />
                        Add Service
                    </button>
                </div>
                <div className="space-y-4">
                    {project.additionalServices.map(service => (
                        <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h3 className="font-medium">{service.name}</h3>
                                <p className="text-sm text-gray-600">{service.description}</p>
                            </div>
                            <span className="font-medium">N${service.basePrice.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Milestones */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-6">Milestones</h2>
                <div className="space-y-4">
                    {project.milestones.map((milestone: Milestone) => (
                        <div key={milestone.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h3 className="font-medium">{milestone.title}</h3>
                                <p className="text-sm text-gray-600">{milestone.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Due: {new Date(milestone.dueDate).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                {milestone.paymentRequired && (
                                    <p className="font-medium">N${milestone.paymentRequired.toLocaleString()}</p>
                                )}
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {milestone.status.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 