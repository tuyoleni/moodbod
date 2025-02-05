'use client';

import { Project } from '@/lib/types/database';
import { motion } from 'framer-motion';
import {
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Phone,
    Calendar,
    Package,
    Plus,
    Bell,
    ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
    project: Project;
    variant: 'overview' | 'full';
}

const formatStatus = (status: string | undefined) => {
    if (!status) return 'Unknown';
    return status.replace('_', ' ');
};

export default function ProjectCard({ project, variant }: ProjectCardProps) {
    const router = useRouter();

    if (!project) return null;

    const safeProject = {
        ...project,
        status: project.status || 'requested',
        createdAt: project.createdAt || null,
        updatedAt: project.updatedAt || null,
        paidAmount: project.paidAmount || 0,
        totalCost: project.totalCost || 0
    };

    const getStatusIcon = (status: string | undefined) => {
        if (!status) return null;

        switch (status) {
            case 'requested':
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'in_progress':
                return <AlertCircle className="w-4 h-4 text-blue-500" />;
            case 'in_review':
                return <AlertCircle className="w-4 h-4 text-orange-500" />;
            case 'completed':
                return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            default:
                return <Clock className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusMessage = (status: string | undefined) => {
        if (!status) return '';

        switch (status) {
            case 'requested':
                return 'We have received your project request';
            case 'in_progress':
                return 'Your project is being worked on';
            case 'in_review':
                return 'Project is ready for your review';
            case 'completed':
                return 'Project completed';
            default:
                return '';
        }
    };

    if (variant === 'overview') {
        return (
            <div
                onClick={() => router.push(`/dashboard/projects/${safeProject.id}`)}
                className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-black transition-all cursor-pointer"
            >
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate">{safeProject.name}</h3>
                            {safeProject.status === 'in_review' && (
                                <span className="flex items-center gap-1 text-xs bg-black/5 px-2 py-1 rounded-full">
                                    <Bell className="w-3 h-3" />
                                    Needs Review
                                </span>
                            )}
                        </div>
                        {safeProject.updatedAt && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                Last updated {new Date(safeProject.updatedAt.seconds * 1000).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                </div>

                {/* Status */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${safeProject.status === 'completed' ? 'bg-black text-white' : 'bg-black/5 text-black'}`}>
                            {formatStatus(safeProject.status)}
                        </span>
                        {safeProject.paidAmount > 0 && safeProject.totalCost > 0 && (
                            <span className="text-gray-500">
                                {Math.round((safeProject.paidAmount / safeProject.totalCost) * 100)}% paid
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Full variant for Projects page
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
        >
            {/* Status Badge */}
            <div className="flex justify-end mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${safeProject.status === 'completed' ? 'bg-green-100 text-green-800' :
                    safeProject.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        safeProject.status === 'in_review' ? 'bg-orange-100 text-orange-800' :
                            safeProject.status === 'requested' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                    }`}>
                    {getStatusIcon(safeProject.status)}
                    {formatStatus(safeProject.status)}
                </span>
            </div>

            {/* Project Info */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{safeProject.name}</h3>
                <p className="text-sm text-gray-600">{safeProject.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {safeProject.type}
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(safeProject.createdAt.seconds * 1000).toLocaleDateString()}
                    </div>
                </div>
            </div>

            {/* Status Message */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">{getStatusMessage(safeProject.status)}</p>
            </div>

            {/* Contact Button */}
            {safeProject.status === 'requested' && (
                <div className="mb-6">
                    <Link
                        href={`mailto:simeon@moodbod.com?subject=Project: ${safeProject.name}`}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition-colors"
                    >
                        <Phone className="w-4 h-4" />
                        Contact Us to Get Started
                    </Link>
                </div>
            )}

            {/* Services */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Selected Package & Services</h4>
                <div className="space-y-3">
                    {safeProject.package && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium">{safeProject.package.name || 'Package Name'}</span>
                            </div>
                            <span className="text-sm font-medium">
                                N${(safeProject.package.basePrice || 0).toLocaleString()}
                            </span>
                        </div>
                    )}
                    {safeProject.additionalServices?.map((service) => (
                        <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Plus className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">{service.name}</span>
                            </div>
                            <span className="text-sm font-medium">N${service.basePrice.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-black text-white rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Total Cost</span>
                    <span className="text-lg font-semibold">N${safeProject.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Paid Amount</span>
                    <span className="text-sm font-medium">N${safeProject.paidAmount.toLocaleString()}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">Remaining</span>
                        <span className="text-sm font-medium">N${(safeProject.totalCost - safeProject.paidAmount).toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* View Details Link */}
            <Link
                href={`/dashboard/projects/${safeProject.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-black text-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
            >
                View Project Details
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    );
} 