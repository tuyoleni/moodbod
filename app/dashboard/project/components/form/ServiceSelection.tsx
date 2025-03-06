import { Checkbox } from '@/components/ui/checkbox';
import { Project, Service } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { additionalServices } from '@/lib/data/services';
import { Input } from '@/components/ui/input';

interface ServiceSelectionProps {
  formData: Partial<Project>;
  onServiceToggle: (service: Service, checked: boolean, quantity?: number) => void;
}

export function ServiceSelection({ formData, onServiceToggle }: ServiceSelectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Additional Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {additionalServices.map((service) => {
          const isSelected = formData.additionalServices?.some(s => s.id === service.id);
          const selectedService = formData.additionalServices?.find(s => s.id === service.id);

          return (
            <Card key={service.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => onServiceToggle(service, checked as boolean, selectedService?.quantity || 1)}
                    />
                    <label className="font-medium">{service.name}</label>
                  </div>
                  <Badge variant="outline" className="font-bold">
                    ${service.price?.toLocaleString()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{service.description}</p>
                {service.allowQuantity && isSelected && (
                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm">Quantity:</label>
                      <Input
                        type="number"
                        min="1"
                        value={selectedService?.quantity || 1}
                        onChange={(e) => {
                          const quantity = parseInt(e.target.value) || 1;
                          onServiceToggle(service, true, quantity);
                        }}
                        className="w-24"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Total: ${((service.price || 0) * (selectedService?.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                )}
                {service.allowQuantity && (
                  <Badge variant="secondary" className="mt-2">
                    Multiple quantities available
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}