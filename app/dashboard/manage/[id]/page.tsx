'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProjectById } from '@/lib/services/projectService';
import { getProjectServices } from '@/lib/services/serviceManagementService';
import { getProjectMilestones } from '@/lib/services/milestoneService';
import { Project, Service, Milestone } from '@/lib/types';
import ProjectTabs from './components/ProjectTabs';

export default function ManageProject() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjectData = async () => {
      if (id) {
        try {
          const projectData = await getProjectById(id);
          const projectMilestones = await getProjectMilestones(id);
          const projectServices = await getProjectServices(id);
          setProject(projectData);
          setMilestones(projectMilestones);
          setServices(projectServices);
        } catch (error) {
          console.error('Error loading project data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProjectData();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Project not found</div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground mt-2">{project.description}</p>
        </div>
      </div>

      <ProjectTabs 
        project={project} 
        milestones={milestones} 
        services={services} 
      />
    </div>
  );
}
