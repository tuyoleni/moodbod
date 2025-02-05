'use client';

import { Project } from '@/lib/types/database';
import { Plus, Search, Clock, ArrowUpRight, Activity, DollarSign, CheckCircle2, Hourglass } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectsSectionProps {
    projects: Project[];
    onNewProject: () => void;
}

export default function ProjectsSection({ projects, onNewProject }: ProjectsSectionProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' ? true :
            filter === 'active' ? ['in_progress', 'in_review', 'requested'].includes(project.status) :
                project.status === 'completed';
        return matchesSearch && matchesFilter;
    });

    const stats = {
        active: projects.filter(p => ['in_progress', 'in_review', 'requested'].includes(p.status)).length,
        completed: projects.filter(p => p.status === 'completed').length,
        totalValue: projects.reduce((sum, p) => sum + p.totalCost, 0),
        inProgress: projects.filter(p => p.status === 'in_progress').length
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Projects</h1>
                <button
                    onClick={onNewProject}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg 
                    hover:bg-black/90 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    New Project
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Active Projects', value: stats.active, icon: Activity },
                    { label: 'Total Value', value: `$${stats.totalValue.toLocaleString()}`, icon: DollarSign },
                    { label: 'Completed', value: stats.completed, icon: CheckCircle2 },
                    { label: 'In Progress', value: stats.inProgress, icon: Hourglass },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white rounded-lg border border-gray-200 hover:border-black transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <stat.icon className="w-6 h-6" />
                            <div>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-gray-200 
                        focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
                    className="px-4 py-3 bg-white rounded-lg border border-gray-200 
                    focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                    min-w-[140px]"
                >
                    <option value="all">All Projects</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group p-6 bg-white rounded-lg border border-gray-200 
                        hover:border-black transition-all cursor-pointer"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold">{project.name}</h3>
                                <p className="text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black" />
                        </div>

                        <div className="flex items-center gap-3 mt-6">
                            <span className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusColor(project.status)}`}>
                                {/* {project.status.replace('_', ' ')} */}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {formatDate(project.createdAt)}
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
                    </motion.div>
                ))}
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

function formatDate(date: any) {
    return new Date(date.seconds * 1000).toLocaleDateString();
} 