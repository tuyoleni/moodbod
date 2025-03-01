'use client';

import { useState, useEffect } from 'react';
import { 
    getPendingServiceRequests,
    approveServiceRequest,
    rejectServiceRequest
} from '@/lib/services/serviceManagementService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Service, ServiceStatus } from '@/lib/types';

export default function ServicesManagement() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        setLoading(true);
        try {
            const data = await getPendingServiceRequests();
            setServices(data);
        } catch (error) {
            console.error('Error loading services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (serviceId: string) => {
        try {
            await approveServiceRequest(serviceId);
            await loadServices();
        } catch (error) {
            console.error('Error approving service:', error);
        }
    };

    const handleReject = async (serviceId: string) => {
        try {
            await rejectServiceRequest(serviceId);
            await loadServices();
        } catch (error) {
            console.error('Error rejecting service:', error);
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Service Name</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Requested</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services.map((service) => (
                        <TableRow key={service.id}>
                            <TableCell>{service.name}</TableCell>
                            <TableCell>{service.projectId}</TableCell>
                            <TableCell>
                                <Badge variant={
                                    service.status === ServiceStatus.ACTIVE ? 'default' :
                                    service.status === ServiceStatus.PENDING ? 'secondary' :
                                    'destructive'
                                }>
                                    {service.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {format(service.requestedAt.toDate(), 'MMM d, yyyy')}
                            </TableCell>
                            <TableCell>
                                <div className="space-x-2">
                                    <Button
                                        size="sm"
                                        onClick={() => handleApprove(service.id)}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleReject(service.id)}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {services.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                                No pending service requests
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}