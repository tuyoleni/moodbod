'use client';

import { useState, useEffect } from 'react';
import { fetchAllProjects } from '@/lib/services/projectService';
import { Project } from '@/lib/types/project';
import ProjectsTable from './components/ProjectsTable';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]); 
    const [loading, setLoading] = useState(true);

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
            <ProjectsTable projects={projects} />
        </div>
    );
}