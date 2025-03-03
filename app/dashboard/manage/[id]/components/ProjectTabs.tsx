import React from 'react';
import { Project, Milestone, Service } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProjectDetailsTab from './ProjectDetailsTab';
import MessagesTab from './MessagesTab';
import CommentsTab from './CommentsTab';
import MilestonesTab from './MilestonesTab';
import ServicesTab from './ServicesTab';

interface ProjectTabsProps {
  project: Project;
  milestones: Milestone[];
  services: Service[];
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ project, milestones, services }) => {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="milestones">Milestones</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-6">
        <ProjectDetailsTab project={project} />
      </TabsContent>

      <TabsContent value="milestones">
        <MilestonesTab milestones={milestones} />
      </TabsContent>

      <TabsContent value="services">
        <ServicesTab services={services} />
      </TabsContent>

      <TabsContent value="messages">
        <MessagesTab project={project} />
      </TabsContent>

      <TabsContent value="comments">
        <CommentsTab project={project} />
      </TabsContent>
    </Tabs>
  );
};

export default ProjectTabs;