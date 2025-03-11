'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchUserProjects } from '@/lib/services/projectService';
import { Project } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils/dateUtils';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

export function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadProjects = async () => {
      if (session?.user?.id) {
        try {
          const userProjects = await fetchUserProjects(session.user.id);
          setProjects(userProjects);
        } catch (error) {
          console.error('Error loading projects:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProjects();
  }, [session?.user?.id]);

  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Total Cost</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(2)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-[100px] ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!projects?.length) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No projects found. Create your first project to get started.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Total Cost</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            let formattedDate = 'Invalid Date';
            const date = project.createdAt.toDate();
            if (!isNaN(date.getTime())) {
              formattedDate = formatDate(date);
            }
            return (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell className="capitalize">{project.type}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {project.status.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell className="text-right">
                  ${project.totalCost.toLocaleString()}
                </TableCell>
                <TableCell>
                  <button
                    className="btn-action"
                    onClick={() => router.push(`/dashboard/manage/${project.id}`)}
                  >
                    Manage
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
