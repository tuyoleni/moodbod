'use client';

import { Project, Service } from '@/lib/types/database';
import { useState } from 'react';
import { Plus, Package, ArrowRight } from 'lucide-react';
import { additionalServices } from '@/lib/data/services';
import { motion } from 'framer-motion';

export default function ProjectServices({ project }: { project: Project }) {
    const [showAddService, setShowAddService] = useState(false);

    const availableServices = additionalServices.filter(
        service => !project.additionalServices.some(ps => ps.id === service.id)
    );

    return (
        <div className="space-y-8">
            {/* Current Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.additionalServices.map((service) => (
                    <div
                        key={service.id}
                        className="p-6 bg-white rounded-lg border border-gray-200"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h3 className="font-medium">{service.name}</h3>
                                <p className="text-sm text-gray-600">{service.description}</p>
                            </div>
                            <span className="text-sm font-medium">
                                ${service.basePrice.toLocaleString()}
                            </span>
                        </div>
                        <div className="mt-4">
                            <span className={`text-xs px-2 py-1 rounded-full 
                            ${service.status === 'completed' ? 'bg-black text-white' : 'bg-black/5 text-black'}`}>
                                {service.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Service Button */}
            {!showAddService && availableServices.length > 0 && (
                <button
                    onClick={() => setShowAddService(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 
                    rounded-lg hover:border-black transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Service
                </button>
            )}

            {/* Available Services */}
            {showAddService && (
                <div className="space-y-4">
                    <h3 className="font-medium">Available Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableServices.map((service) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group p-6 bg-white rounded-lg border border-gray-200 
                                hover:border-black transition-all cursor-pointer"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h4 className="font-medium">{service.name}</h4>
                                        <p className="text-sm text-gray-600">{service.description}</p>
                                    </div>
                                    <Package className="w-5 h-5 text-gray-400 group-hover:text-black" />
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-sm font-medium">
                                        ${service.basePrice.toLocaleString()}
                                    </span>
                                    <button className="flex items-center gap-1 text-sm text-gray-600 
                                    group-hover:text-black transition-colors">
                                        Add to project
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 