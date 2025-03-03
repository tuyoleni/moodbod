import React from 'react';
import { Project } from '@/lib/types';

interface MessagesTabProps {
  project: Project;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ project }) => {
  return (
    <div>
      {/* Render messages related to the project */}
      <div>Messages content for project: {project.name}</div>
    </div>
  );
};

export default MessagesTab;