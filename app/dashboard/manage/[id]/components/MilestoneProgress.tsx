'use client';

import React, { useEffect, useState } from 'react';
import { Milestone, ServiceStatus } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, PartyPopper } from 'lucide-react';
import { getProjectMilestones } from '@/lib/services/milestoneService';
import { useParams } from 'next/navigation';

interface ProjectStage {
  id: ServiceStatus;
  label: string;
}

const projectStages: ProjectStage[] = [
  { id: ServiceStatus.REQUEST, label: 'Project Request' },
  { id: ServiceStatus.ANALYZING, label: 'Analysis' },
  { id: ServiceStatus.PAYMENT_PENDING, label: 'Payment Pending' },
  { id: ServiceStatus.PLANNING, label: 'Planning' },
  { id: ServiceStatus.DEVELOPMENT, label: 'Development' },
  { id: ServiceStatus.REVIEW, label: 'Review' },
  { id: ServiceStatus.TESTING, label: 'Testing' },
  { id: ServiceStatus.COMPLETED, label: 'Completed' },
];

interface MilestoneProgressProps {
  milestones: Milestone[];
}

const MilestoneProgress: React.FC<MilestoneProgressProps> = ({ milestones: initialMilestones }) => {
  const params = useParams();
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMilestones = async () => {
      if (!params?.id) return;
      
      try {
        setLoading(true);
        const projectMilestones = await getProjectMilestones(params.id as string);
        setMilestones(projectMilestones);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse">Loading milestones...</div>
      </div>
    );
  }

  const sortedMilestones = [...milestones].sort((a, b) => 
    b.createdAt.toMillis() - a.createdAt.toMillis()
  );

  const currentStageIndex = sortedMilestones.length > 0
    ? projectStages.findIndex(stage => {
      const milestone = sortedMilestones.find(m => m.status === stage.id);
      return milestone && milestone.status !== ServiceStatus.COMPLETED;
    })
    : -1;

  const getStageIcon = (stage: ProjectStage, milestone: Milestone | undefined) => {
    if (milestone?.status === ServiceStatus.COMPLETED) {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    } else if (milestone?.status === stage.id) {
      return <Clock className="h-4 w-4 text-primary" />;
    }
    return <Clock className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-8">
          {projectStages.map((stage, index) => {
            const milestone = sortedMilestones.find(m => m.status === stage.id);
            const isCompleted = milestone?.status === ServiceStatus.COMPLETED;
            const isCurrent = milestone?.status === stage.id;
            
            return (
              <div key={stage.id} className="relative pl-12">
                <div 
                  className={`absolute left-4 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full border ${isCompleted ? 'bg-green-50 border-green-500' : isCurrent ? 'bg-primary/10 border-primary' : 'bg-background border-border'}`}
                >
                  {getStageIcon(stage, milestone)}
                </div>
                <Card className="relative overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{stage.label}</h4>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {milestone?.status || stage.id}
                      </Badge>
                    </div>
                    {milestone && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {milestone.description}
                        </p>
                        {milestone.paymentRequired && milestone.paymentRequired > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Payment Required:</span>
                            <span className="font-medium">${milestone.paymentRequired.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MilestoneProgress;