'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectStatus, ServiceStatus } from '@/lib/types/enums';
import { Project } from '@/lib/types/project';
import { fetchAllProjects, updateProject } from '@/lib/services/projectService';
import { toast } from 'sonner';

export function NotificationCenter() {
    const [notifications, setNotifications] = useState<Project>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
        // Set up real-time listener for new notifications
        const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const projects = await fetchAllProjects();
            const pendingProjects = projects.filter(project => {
                // Filter for new project requests
                const isNewRequest = project.status === ProjectStatus.REQUESTED;
                
                // Filter for projects with pending service additions
                const hasPendingServices = project.additionalServices?.some(
                    service => service.status === ServiceStatus.PENDING
                );

                // Filter for projects with recent updates
                const hasRecentUpdates = project.updatedAt && 
                    (new Date().getTime() - project.updatedAt.toDate().getTime()) < 24 * 60 * 60 * 1000; // Within last 24 hours

                return isNewRequest || hasPendingServices || hasRecentUpdates;
            });

            setNotifications(pendingProjects);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async () => {
        try {
            const projectUpdate = {
                status: ProjectStatus.IN_PROGRESS
            };
            await updateProject(project.id, projectUpdate);
            toast.success('Project approved successfully');
            fetchNotifications(); 
        } catch (error) {
            console.error('Error approving project:', error);
            toast.error('Failed to approve project');
        }
    };

    const handleReject = async (project) => {
        try {
            const projectUpdate = {
                status: ProjectStatus.REJECTED
            };
            await updateProject(project.id, projectUpdate);
            toast.success('Project rejected');
            fetchNotifications();
        } catch (error) {
            console.error('Error rejecting project:', error);
            toast.error('Failed to reject project');
        }
    };

    if (loading) {
        return <div className="p-4">Loading notifications...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Badge variant="secondary">{notifications.length}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {notifications.length === 0 ? (
                    <p className="text-center text-muted-foreground">No new notifications</p>
                ) : (
                    notifications.map((project) => (
                        <Card key={project.id} className="p-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">{project.name}</h3>
                                    <Badge
                                        variant={project.status === ProjectStatus.REQUESTED ? 'default' : 'secondary'}
                                    >
                                        {project.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{project.description}</p>
                                <div className="flex items-center space-x-2">
                                    <p className="text-sm">Client: {project.userId}</p>
                                    <p className="text-sm">Type: {project.type}</p>
                                </div>
                                {project.status === ProjectStatus.REQUESTED && (
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleApprove(project)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleReject(project)}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))
                )}
            </CardContent>
        </Card>
    );
}