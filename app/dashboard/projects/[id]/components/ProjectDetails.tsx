'use client';

import { Project } from '@/lib/types/database';
import { Calendar, Link, Package } from 'lucide-react';

export default function ProjectDetails({ project }: { project: Project }) {
    return (
        <div className="space-y-8">
            {/* Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Project Package</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Package className="w-5 h-5 text-gray-400 mt-1" />
                                <div>
                                    <p className="font-medium">{project.package.name}</p>
                                    <p className="text-sm text-gray-600">{project.package.description}</p>
                                </div>
                            </div>
                            <div className="pl-8">
                                <p className="text-sm font-medium text-gray-600 mb-2">Features included:</p>
                                <ul className="space-y-2">
                                    {project.package.features?.map((feature, index) => (
                                        <li key={index} className="text-sm text-gray-600">• {feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-600">Started</p>
                                    <p className="font-medium">
                                        {new Date(project.createdAt.seconds * 1000).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Project Requirements</h3>
                        <p className="text-gray-600 whitespace-pre-wrap">{project.requirements}</p>
                    </div>

                    {project.liveUrl && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-4">Project Links</h3>
                            <div className="flex items-center gap-3">
                                <Link className="w-5 h-5 text-gray-400" />
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    View Live Project
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Additional Services */}
            {project.additionalServices.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-4">Additional Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.additionalServices.map((service) => (
                            <div
                                key={service.id}
                                className="p-4 border border-gray-200 rounded-lg"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium">{service.name}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                    </div>
                                    <span className="text-sm font-medium">
                                        ${service.basePrice.toLocaleString()}
                                    </span>
                                </div>
                                <div className="mt-3">
                                    <span className={`text-xs px-2 py-1 rounded-full 
                                    ${service.status === 'completed' ? 'bg-black text-white' : 'bg-black/5 text-black'}`}>
                                        {service.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 