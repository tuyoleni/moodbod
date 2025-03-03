'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProjectById, updateProjectStatus } from '@/lib/services/projectService';
import { Project, ProjectStatus } from '@/lib/types';

export default function ManageProject() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (id) {
        try {
          const projectData = await getProjectById(id);
          setProject(projectData);
        } catch (error) {
          console.error('Error loading project:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProject();
  }, [id]);

  const handleStatusChange = async (newStatus: ProjectStatus) => {
    if (project) {
      try {
        await updateProjectStatus(project.id, newStatus);
        setProject({ ...project, status: newStatus });
      } catch (error) {
        console.error('Error updating project status:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div>
      <h1>Manage Project: {project.name}</h1>
      <p>Description: {project.description}</p>
      <p>Status: {project.status}</p>
      <p>Total Cost: ${project.totalCost.toLocaleString()}</p>
      <button onClick={() => handleStatusChange(ProjectStatus.IN_PROGRESS)}>Start Project</button>
      <button onClick={() => handleStatusChange(ProjectStatus.COMPLETED)}>Complete Project</button>
      {/* Add more project management features here */}
    </div>
  );
}
