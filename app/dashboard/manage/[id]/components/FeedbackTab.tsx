import React from 'react';
import { Project } from '@/lib/types';

interface FeedbackTabProps {
  project: Project;
}

const FeedbackTab: React.FC<FeedbackTabProps> = ({ project }) => {
  return (
    <div>
      {/* Render feedback related to the project */}
      <div>Feedback content for project: {project.name}</div>
    </div>
  );
};

export default FeedbackTab;