import React from 'react';
import { Service } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { requestServiceAddition, removeProjectService } from '@/lib/services/serviceManagementService';
import { toast } from 'sonner';

interface ServicesTabProps {
  services: Service[];
}

const ServicesTab: React.FC<ServicesTabProps> = ({ services }) => {
  const handleRemoveService = async (serviceId: string) => {
    try {
      await removeProjectService(serviceId);
      toast.success('Service removal requested');
    } catch (error) {
      toast.error('Failed to request service removal');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Project Services</h3>
        <Button variant="outline" onClick={() => {}}>
          Request New Service
        </Button>
      </div>

      {services.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Badge variant={
                    service.status === 'active' ? 'default' :
                    service.status === 'pending' ? 'secondary' :
                    'destructive'
                  }>
                    {service.status}
                  </Badge>
                </TableCell>
                <TableCell>${service.price?.toLocaleString() || 'N/A'}</TableCell>
                <TableCell>{service.category || 'Uncategorized'}</TableCell>
                <TableCell className="text-right">
                  {service.status !== 'removed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveService(service.id)}
                    >
                      Remove
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          No services found for this project
        </div>
      )}
    </div>
  );
};

export default ServicesTab;