'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FeedbackType, FeedbackStatus, ProjectType, ServiceStatus } from '@/lib/types';
import { websitePackages, additionalServices, infrastructureServices } from '@/lib/data/services';
import { getProjectServices, removeProjectService, approveServiceRequest, rejectServiceRequest, getServiceRequests } from '@/lib/services/serviceManagementService';
import { updateProject } from '@/lib/services/projectService';
import { toast } from 'sonner';

interface ServiceManagementProps {
    projectId: string;
    projectType: ProjectType;
}

export function ServiceManagement({ projectId, projectType }: ServiceManagementProps) {
    const [feedback, setFeedback] = useState({
        type: FeedbackType.COMMENT,
        content: '',
        status: FeedbackStatus.PENDING
    });

    const [selectedService, setSelectedService] = useState('');
    const [currentServices, setCurrentServices] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetchCurrentServices();
        fetchPendingRequests();
    }, [projectId]);

    const fetchCurrentServices = async () => {
        try {
            const services = await getProjectServices(projectId);
            setCurrentServices(services);
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error('Failed to load current services');
        }
    };

    const availableServices = [
        ...websitePackages.filter(pkg => pkg.category === projectType),
        ...additionalServices.filter(service => service.category === projectType.toLowerCase()),
        ...infrastructureServices
    ];

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Implement feedback submission logic here
            toast.success('Feedback submitted successfully');
            setFeedback({
                type: FeedbackType.COMMENT,
                content: '',
                status: FeedbackStatus.PENDING
            });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error('Failed to submit feedback');
        }
    };

    const fetchPendingRequests = async () => {
        try {
            const requests = await getServiceRequests(projectId);
            setPendingRequests(requests);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
            toast.error('Failed to load service requests');
        }
    };

    const handleApproveRequest = async (requestId) => {
        try {
            const updatedService = await approveServiceRequest(requestId);
            // Update project total cost
            const updatedProject = {
                ...project,
                totalCost: project.totalCost + updatedService.price
            };
            await updateProject(projectId, updatedProject);
            setProject(updatedProject);
            
            toast.success('Service request approved');
            fetchPendingRequests();
            fetchCurrentServices();
        } catch (error) {
            console.error('Error approving service request:', error);
            toast.error('Failed to approve service request');
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            await rejectServiceRequest(requestId);
            toast.success('Service request rejected');
            fetchPendingRequests();
        } catch (error) {
            console.error('Error rejecting service request:', error);
            toast.error('Failed to reject service request');
        }
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Pending Service Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    {pendingRequests.length === 0 ? (
                        <p className="text-center text-muted-foreground">No pending service requests</p>
                    ) : (
                        <div className="space-y-4">
                            {pendingRequests.map((request) => (
                                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">{request.service.name}</p>
                                        <p className="text-sm text-muted-foreground">${request.service.price}</p>
                                        <p className="text-sm text-muted-foreground">{request.service.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={() => handleApproveRequest(request.id)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRejectRequest(request.id)}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Services Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium mb-4">Current Services</h3>
                        {currentServices.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No services added yet</p>
                        ) : (
                            <div className="space-y-2">
                                {currentServices.map((service) => (
                                    <div key={service.id} className="flex items-center justify-between p-2 border rounded-lg">
                                        <div>
                                            <p className="font-medium">{service.name}</p>
                                            <p className="text-sm text-muted-foreground">${service.price}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={service.status === ServiceStatus.ACTIVE ? 'default' : 'secondary'}>
                                                {service.status}
                                            </Badge>
                                            {service.status === ServiceStatus.ACTIVE && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to remove this service?')) {
                                                            removeProjectService(service.id)
                                                                .then(() => {
                                                                    toast.success('Service removed successfully');
                                                                    fetchCurrentServices();
                                                                })
                                                                .catch(() => toast.error('Failed to remove service'));
                                                        }
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t">
                        <h3 className="text-sm font-medium mb-4">Add New Service</h3>
                        <div className="space-y-4">
                            <Select
                                value={selectedService}
                                onValueChange={setSelectedService}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a service to add" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableServices.map((service) => (
                                        <SelectItem key={service.id} value={service.id}>
                                            {service.name} - ${service.price}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <p className="text-sm text-muted-foreground">Service requests can only be initiated by users. Admins can approve or reject pending requests.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}