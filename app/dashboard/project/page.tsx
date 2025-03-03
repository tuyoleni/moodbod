'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ProjectsTable } from './components/ProjectsTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProjectWizard } from './components/ProjectWizard';

export default function ProjectsPage() {
  useAuth();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <Button onClick={() => setShowCreateDialog(true)}>
          Create New Project
        </Button>
      </div>
      
      <ProjectsTable />

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <ProjectWizard onComplete={() => setShowCreateDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}