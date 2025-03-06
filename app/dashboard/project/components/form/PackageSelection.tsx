'use client';

import { websitePackages } from '@/lib/data/services';
import { Project, ProjectPackage } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PackageSelectionProps {
  formData: Partial<Project>;
  onPackageSelect: (pkg: ProjectPackage) => void;
}

export function PackageSelection({ formData, onPackageSelect }: PackageSelectionProps) {
  return (
    <div className="space-y-8 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {websitePackages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${formData.package?.id === pkg.id ? 'border-primary/50 bg-primary/[0.02] ring-1 ring-primary/50' : 'hover:border-primary/30 hover:bg-primary/[0.01]'}`}
            onClick={() => onPackageSelect(pkg)}
          >
            <CardHeader className="pb-6">
              <div className="space-y-4">
                <Badge 
                  variant="secondary" 
                  className={`text-lg px-4 py-1.5 font-medium ${formData.package?.id === pkg.id ? 'bg-primary/10 text-primary' : ''}`}
                >
                  ${pkg.price}
                </Badge>
                <div>
                  <h4 className="text-2xl font-semibold tracking-tight">{pkg.name}</h4>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{pkg.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="font-medium text-sm text-primary/80">Features included</p>
                <ul className="space-y-3">
                  {Object.entries(pkg.features).map(([key, value]) => (
                    <li key={key} className="flex items-start gap-3 group">
                      <Check 
                        className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-200 ${typeof value === 'boolean' ? (value ? 'text-primary' : 'text-muted-foreground/30') : 'text-primary'}`} 
                      />
                      <span className="text-sm flex justify-between w-full group-hover:text-primary/80 transition-colors duration-200">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        {typeof value === 'number' && (
                          <span className="font-medium ml-2">{value}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}