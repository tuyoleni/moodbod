import { Project } from '@/lib/types/database';
import { motion } from 'framer-motion';
import {
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    MessageSquare,
    Phone,
    Calendar,
    DollarSign,
    Package,
    BarChart,
    Plus
} from 'lucide-react';
import Link from 'next/link';

export default function ProjectCard({ project }: { project: Project }) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'requested':
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'received':
                return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
            case 'in_discussion':
                return <MessageSquare className="w-4 h-4 text-purple-500" />;
            case 'in_progress':
                return <AlertCircle className="w-4 h-4 text-blue-500" />;
            case 'in_review':
                return <AlertCircle className="w-4 h-4 text-orange-500" />;
            case 'completed':
                return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case 'on_hold':
                return <Clock className="w-4 h-4 text-gray-500" />;
            default:
                return null;
        }
    };

    const getStatusMessage = (status: string) => {
        switch (status) {
            case 'requested':
                return 'We have received your project request';
            case 'received':
                return 'Your project has been reviewed. Contact us to discuss details';
            case 'in_discussion':
                return 'Project details being discussed';
            case 'in_progress':
                return 'Your project is being worked on';
            case 'in_review':
                return 'Project is ready for your review';
            case 'completed':
                return 'Project completed';
            case 'on_hold':
                return 'Project temporarily on hold';
            default:
                return '';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
        >
            {/* Status Badge */}
            <div className="flex justify-end mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'in_review' ? 'bg-orange-100 text-orange-800' :
                            project.status === 'on_hold' ? 'bg-gray-100 text-gray-800' :
                                'bg-yellow-100 text-yellow-800'
                    }`}>
                    {getStatusIcon(project.status)}
                    {project.status.replace('_', ' ')}
                </span>
            </div>

            {/* Project Info */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {project.type}
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(project.createdAt.seconds * 1000).toLocaleDateString()}
                    </div>
                </div>
            </div>

            {/* Status Message */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">{getStatusMessage(project.status)}</p>
            </div>

            {/* Contact Button */}
            {project.status === 'received' && (
                <div className="mb-6">
                    <Link
                        href={`mailto:simeon@moodbod.com?subject=Project: ${project.name}`}
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
                    {project.package && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium">{project.package.name || 'Package Name'}</span>
                            </div>
                            <span className="text-sm font-medium">
                                N${(project.package.basePrice || 0).toLocaleString()}
                            </span>
                        </div>
                    )}
                    {project.additionalServices?.map((service) => (
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
                    <span className="text-lg font-semibold">N${project.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Paid Amount</span>
                    <span className="text-sm font-medium">N${project.paidAmount.toLocaleString()}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">Remaining</span>
                        <span className="text-sm font-medium">N${(project.totalCost - project.paidAmount).toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* View Details Link */}
            <Link
                href={`/dashboard/projects/${project.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-black text-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
            >
                View Project Details
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    );
} 