import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectType } from '@/lib/types/enums';
import { Project } from '@/lib/types';

interface BasicInformationProps {
  formData: Partial<Project>;
  onFormChange: (updates: Partial<Project>) => void;
}

export function BasicInformation({ formData, onFormChange }: BasicInformationProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Basic Information</h3>
      <Input
        placeholder="Project Name"
        value={formData.name}
        onChange={(e) => onFormChange({ name: e.target.value })}
        required
      />
      <Textarea
        placeholder="Project Description"
        value={formData.description}
        onChange={(e) => onFormChange({ description: e.target.value })}
        required
      />
      <Select
        value={formData.type}
        onValueChange={(value) => onFormChange({ type: value as ProjectType })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Project Type" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(ProjectType).map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}