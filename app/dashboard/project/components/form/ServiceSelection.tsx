import { Checkbox } from '@/components/ui/checkbox';
import { additionalServices } from '@/lib/data/services';
import { Project, Service } from '@/lib/types';

interface ServiceSelectionProps {
  formData: Partial<Project>;
  onServiceToggle: (service: Service, checked: boolean) => void;
}

export function ServiceSelection({ formData, onServiceToggle }: ServiceSelectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Additional Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {additionalServices.map((service) => (
          <div key={service.id} className="flex items-center space-x-2">
            <Checkbox
              checked={formData.additionalServices?.some(s => s.id === service.id)}
              onCheckedChange={(checked) => onServiceToggle(service, checked as boolean)}
            />
            <label>{service.name} - ${service.price}</label>
          </div>
        ))}
      </div>
    </div>
  );
}