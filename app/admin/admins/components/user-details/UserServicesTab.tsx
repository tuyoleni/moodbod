import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Project } from "@/lib/types/project";
import { Service } from "@/lib/types/service";

interface UserServicesTabProps {
    projects: Project[];
    services: Record<string, Service[]>;
}

export function UserServicesTab({ projects, services }: UserServicesTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
                {projects?.map(project => (
                    <div key={project.id} className="mb-6">
                        <h4 className="font-medium mb-2">{project.name}</h4>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Requested</TableHead>
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
                                            {format(service.requestedAt.toDate(), 'PP')}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {!services[project.id]?.length && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                                            No services found for this project
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}