import React from 'react';
import { Milestone } from '@/lib/types';
import MilestoneProgress from './MilestoneProgress';

interface MilestonesTabProps {
  milestones: Milestone[];
}

const MilestonesTab: React.FC<MilestonesTabProps> = ({ milestones }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Project Milestones</h3>
      {milestones.length > 0 ? (
        <MilestoneProgress milestones={milestones} />
      ) : (
        <div className="text-center py-4 text-muted-foreground rounded-lg border p-6 bg-background">
          No milestones found for this project
        </div>
      )}
    </div>
  );
};

export default MilestonesTab;