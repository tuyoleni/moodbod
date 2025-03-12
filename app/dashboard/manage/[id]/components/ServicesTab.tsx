import React, { useEffect, useState } from 'react';
import { Service, ServiceStatus } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { requestServiceAddition, removeProjectService } from '@/lib/services/serviceManagementService';
import { additionalServices } from '@/lib/data/services';
import { toast } from 'sonner';
import { useCurrency } from '@/lib/context/CurrencyContext';

interface ServicesTabProps {
  services: Service[];
}

const ServicesTab: React.FC<ServicesTabProps> = ({ services: initialServices }) => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const { formatAmount } = useCurrency();

  useEffect(() => {
    setServices(initialServices);
  }, [initialServices]);

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
          ? { ...service, status: ServiceStatus.REJECTED } 
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
        quantity: service.quantity || 1,
        projectId: service.projectId || ''
      };
      const serviceId = await requestServiceAddition(service.projectId || '', serviceData);
      setServices(prevServices => [
        ...prevServices,
        { ...serviceData, id: serviceId, status: ServiceStatus.REQUEST }
      ]);
      toast.success('Service request submitted');
    } catch (error) {
      toast.error('Failed to request service');
    }
  };

  // Filter services based on their status
  const currentServices = services.filter(service => 
    service.status === ServiceStatus.COMPLETED || 
    service.status === ServiceStatus.DEVELOPMENT ||
    service.status === ServiceStatus.APPROVED
  );

  const pendingServices = services.filter(service =>
    service.status === ServiceStatus.REQUEST || 
    service.status === ServiceStatus.PAYMENT_PENDING
  );

  // Filter available services to exclude those that are already added
  const availableServices = additionalServices.filter(service => 
    !services.some(existingService => 
      (existingService.name ?? '').toLowerCase() === service.name.toLowerCase() &&
      existingService.status !== ServiceStatus.REJECTED
    )
  );

  return (
    <div className="space-y-6">
      {currentServices.length === 0 && pendingServices.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No services available
        </div>
      ) : (
        <>
          {/* Current Services Section */}
          {currentServices.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Current Services</h3>
              <div className="space-y-4">
                {currentServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-sm font-medium">
                            {formatAmount((service.price || 0) * (service.quantity || 1))}
                          </p>
                          {service.allowQuantity && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Quantity:</span>
                              <input
                                type="number"
                                min="1"
                                value={service.quantity || 1}
                                onChange={(e) => handleQuantityChange(service, parseInt(e.target.value))}
                                className="w-16 p-1 border rounded"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={service.status === ServiceStatus.COMPLETED ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {(service.status || ServiceStatus.REQUEST).toLowerCase()}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveService(service.id)}
                          disabled={service.status === ServiceStatus.COMPLETED}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Services Section */}
          {pendingServices.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Pending Requests</h3>
              <div className="space-y-4">
                {pendingServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-sm font-medium">
                            {formatAmount((service.price || 0) * (service.quantity || 1))}
                          </p>
                          {service.allowQuantity && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Quantity:</span>
                              <input
                                type="number"
                                min="1"
                                value={service.quantity || 1}
                                onChange={(e) => handleQuantityChange(service, parseInt(e.target.value))}
                                className="w-16 p-1 border rounded"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="capitalize"
                        >
                          {service.status?.toLowerCase()}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveService(service.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <Separator />

      {/* Available Services Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Available Services</h3>
        {availableServices.length > 0 ? (
          <div className="space-y-4">
            {availableServices.map((service) => (
              <div
                key={service.id}
                className="p-4 border rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <p className="text-sm font-medium mt-2">{formatAmount(service.price)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRequestService(service)}
                  >
                    Request
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No additional services available</p>
        )}
      </div>
    </div>
  );
};

export default ServicesTab;