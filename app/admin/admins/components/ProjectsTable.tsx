import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project, ServiceStatus } from '@/lib/types';
import { format } from 'date-fns';

interface ProjectsTableProps {
    projects: Project[];
    onStatusUpdate: (projectId: string, status: ServiceStatus) => void;
}

export function ProjectsTable({ projects, onStatusUpdate }: ProjectsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {projects.map((project) => (
                    <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.user?.name}</TableCell>
                        <TableCell>{project.type}</TableCell>
                        <TableCell>
                            <Badge variant={
                                project.status === ServiceStatus.DEVELOPMENT ? 'default' :
                                project.status === ServiceStatus.REQUEST ? 'secondary' :
                                project.status === ServiceStatus.COMPLETED ? 'outline' :
                                'destructive'
                            }>
                                {project.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {format(project.createdAt.toDate(), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                            <div className="space-x-2">
                                {project.status === ServiceStatus.REQUEST && (
                                    <>
                                        <Button
                                            size="sm"
                                            onClick={() => onStatusUpdate(project.id, ServiceStatus.DEVELOPMENT)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => onStatusUpdate(project.id, ServiceStatus.REJECTED)}
                                        >
                                            Reject
                                        </Button>
                                    </>
                                )}
                                {project.status === ServiceStatus.DEVELOPMENT && (
                                    <Button
                                        size="sm"
                                        onClick={() => onStatusUpdate(project.id, ServiceStatus.COMPLETED)}
                                    >
                                        Mark Complete
                                    </Button>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                {projects.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                            No projects found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}