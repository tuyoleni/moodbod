'use client';

import { useState, useEffect } from 'react';
import { fetchAllProjects } from '@/lib/services/projectService';
import { Project } from '@/lib/types/project';
// import { useAuth } from '@/lib/hooks/useAuth';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    // const { session } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsData = await fetchAllProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <div className="p-4">Loading projects...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Project Management</h1>
            <div className="grid gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="p-4 border rounded-lg shadow-sm">
                        <div className="space-y-2">
                            <h3 className="font-semibold">{project.name}</h3>
                            <p className="text-sm text-gray-600">{project.description}</p>
                            <div className="flex gap-4 text-sm text-gray-600">
                                <p>Status: {project.status}</p>
                                <p>Type: {project.type}</p>
                            </div>
                            <p className="text-sm text-gray-600">Client: {project.userId}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}