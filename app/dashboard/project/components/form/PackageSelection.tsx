import { websitePackages } from '@/lib/data/services';
import { Project, ProjectPackage } from '@/lib/types';

interface PackageSelectionProps {
  formData: Partial<Project>;
  onPackageSelect: (pkg: ProjectPackage) => void;
}

export function PackageSelection({ formData, onPackageSelect }: PackageSelectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Package</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {websitePackages.map((pkg) => (
          <div key={pkg.id} className="border p-4 rounded-lg">
            <input
              type="radio"
              name="package"
              value={pkg.id}
              checked={formData.package?.id === pkg.id}
              onChange={() => onPackageSelect(pkg)}
              className="mr-2"
            />
            <label>{pkg.name} - ${pkg.price}</label>
            <p className="text-sm text-gray-600">{pkg.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}