import { useState } from 'react';
import { Project, Service, ProjectPackage } from '../types';
import { initialProjectFormState } from '../constants/projectForm';
import { websitePackages } from '../data/services';

interface FormErrors {
  name?: string;
  description?: string;
  package?: string;
}

export function useProjectForm() {
  const [formData, setFormData] = useState<Partial<Project>>(initialProjectFormState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const calculateTotalPrice = () => {
    const packagePrice = websitePackages.find(pkg => pkg.id === formData.package?.id)?.price || 0;
    const servicesPrice = [...(formData.additionalServices || []), ...(formData.services || [])]
      .reduce((total, service) => total + (service.price || 0), 0);
    return packagePrice + servicesPrice;
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 0:
        if (!formData.name?.trim()) {
          newErrors.name = 'Project name is required';
        }
        if (!formData.description?.trim()) {
          newErrors.description = 'Project description is required';
        }
        break;
      case 1:
        if (!formData.package?.id) {
          newErrors.package = 'Please select a package';
        }
        break;
      case 2:
        // Additional services are optional
        return true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (updates: Partial<Project>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear related errors when field is updated
    const updatedField = Object.keys(updates)[0];
    if (updatedField && errors[updatedField as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [updatedField]: undefined }));
    }
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
    if (errors.package) {
      setErrors(prev => ({ ...prev, package: undefined }));
    }
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
    setErrors({});
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return Boolean(formData.name?.trim() && formData.description?.trim());
      case 1:
        return Boolean(formData.package?.id);
      case 2:
        return true;
      default:
        return false;
    }
  };

  return {
    formData,
    loading,
    errors,
    setLoading,
    calculateTotalPrice,
    handleFormChange,
    handlePackageSelect,
    handleServiceToggle,
    resetForm,
    validateStep,
    isStepValid
  };
}