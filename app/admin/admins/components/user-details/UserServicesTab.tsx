'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Project } from '@/lib/types/project';
import { Service } from '@/lib/types/service';

interface UserServicesTabProps {
    projects: Project[];
    services: Record<string, Service[]>;
}

export function UserServicesTab({ projects, services }: UserServicesTabProps) {
    return (
        <div>
            {projects?.map(project => (
                <div key={project.id} className="mb-6">
                    <h4 className="font-medium mb-2">{project.name}</h4>
                    <div className="overflow-x-auto">
                        <Table className="min-w-full">
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Requested</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>End Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {services[project.id]?.map(service => (
                                    <TableRow key={service.id}>
                                        <TableCell>{service.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                service.status === 'active' ? 'default' :
                                                service.status === 'pending' ? 'secondary' :
                                                'destructive'
                                            }>
                                                {service.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {service.requestedAt && typeof (service.requestedAt as any).toDate === 'function'
                                            ? format((service.requestedAt as any).toDate(), 'PP')
                                            : format(new Date(service.requestedAt as unknown as string), 'PP')}
                                        </TableCell>
                                        <TableCell>{service.requestedAt && typeof (service.requestedAt as any).toDate === 'function'
                                            ? format((service.requestedAt as any).toDate(), 'dd/MM/yyyy')
                                            : format(new Date(service.requestedAt as unknown as string), 'dd/MM/yyyy')}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {!services[project.id]?.length && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                                            No services found for this project
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            ))}
        </div>
    );
}