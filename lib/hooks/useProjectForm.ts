import { useState } from 'react';
import { Project, Service, ProjectPackage } from '../types';
import { initialProjectFormState } from '../constants/projectForm';
import { websitePackages } from '../data/services';

export function useProjectForm() {
  const [formData, setFormData] = useState<Partial<Project>>(initialProjectFormState);
  const [loading, setLoading] = useState(false);

  const calculateTotalPrice = () => {
    const packagePrice = websitePackages.find(pkg => pkg.id === formData.package?.id)?.price || 0;
    const servicesPrice = [...(formData.additionalServices || []), ...(formData.services || [])]
      .reduce((total, service) => total + (service.price || 0), 0);
    return packagePrice + servicesPrice;
  };

  const handleFormChange = (updates: Partial<Project>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handlePackageSelect = (pkg: ProjectPackage) => {
    setFormData(prev => ({
      ...prev,
      package: {
        id: pkg.id,
        name: pkg.name,
        description: pkg.description,
        features: pkg.features,
        price: pkg.price
      }
    }));
  };

  const handleServiceToggle = (service: Service, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: checked
        ? [...(prev.additionalServices || []), service]
        : (prev.additionalServices || []).filter(s => s.id !== service.id)
    }));
  };

  const resetForm = () => {
    setFormData(initialProjectFormState);
  };

  return {
    formData,
    loading,
    setLoading,
    calculateTotalPrice,
    handleFormChange,
    handlePackageSelect,
    handleServiceToggle,
    resetForm
  };
}