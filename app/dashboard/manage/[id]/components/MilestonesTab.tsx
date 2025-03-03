import React from 'react';
import { Milestone } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface MilestonesTabProps {
  milestones: Milestone[];
}

const MilestonesTab: React.FC<MilestonesTabProps> = ({ milestones }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Project Milestones</h3>
      {milestones.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Payment Required</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {milestones.map((milestone) => (
              <TableRow key={milestone.id}>
                <TableCell>{milestone.name}</TableCell>
                <TableCell>
                  <Badge variant={
                    milestone.status === 'active' ? 'default' :
                    milestone.status === 'pending' ? 'secondary' :
                    milestone.status === 'completed' ? 'outline' :
                    'destructive'
                  }>
                    {milestone.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {milestone.dueDate && typeof milestone.dueDate.toDate === 'function'
                    ? milestone.dueDate.toDate().toLocaleDateString()
                    : 'No due date'}
                </TableCell>
                <TableCell>
                  {milestone.paymentRequired 
                    ? `$${milestone.paymentRequired.toLocaleString()}` 
                    : 'No payment required'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          No milestones found for this project
        </div>
      )}
    </div>
  );
};

export default MilestonesTab;