import React from 'react';
import { Project, Milestone, Service } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProjectDetailsTab from './ProjectDetailsTab';
import MessagesTab from './MessagesTab';
import MilestonesTab from './MilestonesTab';
import ServicesTab from './ServicesTab';

interface ProjectTabsProps {
  project: Project;
  milestones: Milestone[];
  services: Service[];
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ project, milestones, services }) => {
  const [activeTab, setActiveTab] = React.useState('details');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="milestones">Milestones</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="messages">Messages & Comments</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-6">
        <ProjectDetailsTab project={project} onServiceClick={() => setActiveTab('services')} />
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
    </Tabs>
  );
};

export default ProjectTabs;