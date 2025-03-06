import React, { useState } from 'react';
import { Service, ServiceStatus } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { requestServiceAddition, removeProjectService } from '@/lib/services/serviceManagementService';
import { additionalServices } from '@/lib/data/services';
import { toast } from 'sonner';

interface ServicesTabProps {
  services: Service[];
}

const ServicesTab: React.FC<ServicesTabProps> = ({ services: initialServices }) => {
  const [services, setServices] = useState<Service[]>(initialServices);

  const handleQuantityChange = async (service: Service, newQuantity: number) => {
    try {
      const updatedService = { ...service, quantity: newQuantity };
      setServices(services.map(s => 
        s.id === service.id ? updatedService : s
      ));
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveService = async (serviceId: string) => {
    try {
      await removeProjectService(serviceId);
      setServices(services.map(service => 
        service.id === serviceId 
          ? { ...service, status: ServiceStatus.REMOVED } 
          : service
      ));
      toast.success('Service removal requested');
    } catch (error) {
      toast.error('Failed to request service removal');
    }
  };

  const handleRequestService = async (service: Service) => {
    const hasPaymentPending = services.some(s => s.status === ServiceStatus.PAYMENT_PENDING);
    if (hasPaymentPending) {
      toast.error('Please complete pending payments before requesting new services');
      return;
    }

    try {
      const serviceData = {
        name: service.name,
        description: service.description,
        category: service.category,
        price: service.price,
        allowQuantity: service.allowQuantity,
        quantity: service.quantity || 1
      };
      await requestServiceAddition(service.projectId || '', serviceData);
      setServices(prevServices => [
        ...prevServices,
        { ...service, status: ServiceStatus.PENDING }
      ]);
      toast.success('Service request submitted');
    } catch (error) {
      toast.error('Failed to request service');
    }
  };

  const currentServices = services.filter(service => service.status !== ServiceStatus.REMOVED);
  const availableServices = additionalServices.filter(service => 
    !services.some(currentService => currentService.id === service.id)
  );

  return (
    <div className="space-y-8">
      {/* Current Packages Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current Packages</h3>
        {currentServices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.category || 'Uncategorized'}</TableCell>
                  <TableCell>
                    {service.allowQuantity ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (service.quantity && service.quantity > 1) {
                              handleQuantityChange(service, (service.quantity || 1) - 1);
                            }
                          }}
                        >
                          -
                        </Button>
                        <span>{service.quantity || 1}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            handleQuantityChange(service, (service.quantity || 1) + 1);
                          }}
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      '1'
                    )}
                  </TableCell>
                  <TableCell>${((service.price || 0) * (service.quantity || 1)).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      service.status === ServiceStatus.ACTIVE ? 'default' :
                      service.status === ServiceStatus.PENDING ? 'secondary' :
                      service.status === ServiceStatus.PAYMENT_PENDING ? 'warning' :
                      'destructive'
                    }>
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {service.status !== ServiceStatus.REMOVED && (
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
            No packages currently active in this project
          </div>
        )}
      </div>

      <Separator />

      {/* Available Packages Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Available Packages</h3>
        {availableServices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.category || 'Uncategorized'}</TableCell>
                  <TableCell>${service.price?.toLocaleString() || 'N/A'}</TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleRequestService(service)}
                    >
                      Request Service
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No additional packages available
          </div>
        )}
      </div>
    </div>
  );
};



export default ServicesTab;