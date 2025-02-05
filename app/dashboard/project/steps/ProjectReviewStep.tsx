'use client';

import { formatCurrency } from '@/lib/utils';
import { ProjectReviewStepProps } from '@/props/ProjectReviewStepProps';

export default function ProjectReviewStep({ formData }: ProjectReviewStepProps) {

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-4">Review Your Project</h2>
                <p className="text-gray-600 mb-6">Please review your project details before submitting.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4 col-span-2 p-6 bg-gray-50 rounded-lg">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Project Type</h3>
                        <p className="mt-1 text-lg capitalize">{formData.type}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Project Name</h3>
                        <p className="mt-1 text-lg">{formData.name}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                        <p className="mt-1">{formData.description}</p>
                    </div>
                </div>
                {formData.selectedPackage && (
                    <div className="col-span-2">
                        <h3 className="text-sm font-medium text-gray-500">Selected Package</h3>
                        <div className="mt-2">
                            <p className="font-medium">{formData.selectedPackage.name}</p>
                            <p className="text-sm text-gray-600">{formData.selectedPackage.description}</p>
                            <p className="text-sm font-medium mt-1">
                                {formatCurrency(formData.selectedPackage.basePrice)}
                            </p>
                        </div>
                    </div>
                )}

                {formData.additionalServices?.length > 0 && (
                    <div className="col-span-2">
                        <h3 className="text-sm font-medium text-gray-500">Additional Services</h3>
                        <ul className="mt-2 space-y-2">
                            {formData.additionalServices.map((service) => (
                                <li key={service.id} className="flex justify-between">
                                    <span>{service.name}</span>
                                    <span className="font-medium">N${service.basePrice.toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="col-span-2 pt-4 border-t">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-500">Total Estimated Cost</h3>
                        <p className={`text-lg font-semibold`}>
                            {formatCurrency(formData.selectedPackage.basePrice)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                    By submitting this project request, you agree to our terms and conditions.
                    We&apos;ll review your project and get back to you within 24 hours.
                    <span> <a href="/privacy" className="text-blue-800">Privacy Policy</a></span>
                </p>

            </div>
        </div>
    );
}