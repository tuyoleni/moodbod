'use client';

import { Project } from '@/lib/types/database';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ProjectsSectionProps {
    projects: Project[];
    onNewProject: () => void;
}

export default function ProjectsSection({ projects, onNewProject }: ProjectsSectionProps) {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Your Projects</h2>
                <button
                    onClick={() => onNewProject()}
                    className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition-colors"
                >
                    New Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </motion.div>
    );
} 