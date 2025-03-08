'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Milestone, ServiceStatus } from '@/lib/types';
import { getProjectMilestones } from '@/lib/services/milestoneService';
import { toast } from 'sonner';

type MilestoneManagementProps = {
    projectId: string;
}

export function MilestoneManagement({ projectId }: MilestoneManagementProps) {
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [loading, setLoading] = useState(true);

    // const handleStatusChange = async (milestoneId: string, status: ServiceStatus) => {
    //     try {
    //         await updateMilestoneStatus(milestoneId, status);
    //         toast.success('Milestone status updated successfully');
    //         fetchMilestones();
    //     } catch (error) {
    //         console.error('Error updating milestone status:', error);
    //         toast.error(error instanceof Error ? error.message : 'Failed to update milestone status');
    //     }
    // };

    useEffect(() => {
        fetchMilestones();
    }, [projectId]);

    const fetchMilestones = async () => {
        try {
            const data = await getProjectMilestones(projectId);
            setMilestones(data);
        } catch (error) {
            console.error('Error fetching milestones:', error);
            toast.error('Failed to load milestones');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading milestones...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Project Milestones</h2>
            </div>

            <div className="space-y-4 relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-0 before:h-full before:w-0.5 before:bg-gray-200">
                {milestones.length === 0 ? (
                    <p className="text-center text-muted-foreground">No milestones created yet</p>
                ) : (
                    milestones.map((milestone, index) => (
                        <Card key={milestone.id} className="p-4 relative">
                            {milestone.id === ServiceStatus.DEVELOPMENT && (
                                <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                    Current
                                </div>
                            )}
                            {milestone.id === ServiceStatus.COMPLETED && (
                                <div className="absolute top-2 right-2 text-xl" role="img" aria-label="completed">
                                    🎉
                                </div>
                            )}
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold">{milestone.description}</h3>
                                    <div className="px-2 py-1 rounded text-sm font-medium">
                                        {milestone.status}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{milestone.description}</p>
                                {milestone.paymentRequired && (
                                    <div className="text-sm">
                                        <span>Payment: ${milestone.paymentRequired}</span>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}