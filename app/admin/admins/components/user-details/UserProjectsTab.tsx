import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Project, ServiceStatus } from "@/lib/types";

interface UserProjectsTabProps {
    projects: Project[];
}

export function UserProjectsTab({ projects }: UserProjectsTabProps) {
    return (
        <div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects?.map(project => (
                            <TableRow key={project.id}>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.type}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        project.status === ServiceStatus.REVIEW ? 'default' :
                                        project.status === ServiceStatus.REQUEST ? 'secondary' :
                                        project.status === ServiceStatus.COMPLETED ? 'outline' :
                                        'destructive'
                                    }>
                                        {project.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {format(project.createdAt.toDate(), 'PP')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}