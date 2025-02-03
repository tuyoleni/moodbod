'use client';

import { motion } from 'framer-motion';
import { pricingPackages, additionalServices } from '@/lib/data/pricing';
import { Check, Plus } from 'lucide-react';

export default function PricingSection() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-16"
        >
            <div>
                <h2 className="text-2xl font-semibold mb-2">Website Packages</h2>
                <p className="text-gray-600 mb-8">Choose a package that best fits your needs</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingPackages.map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-xl border border-gray-200 hover:border-black/30 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{pkg.name}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                                </div>
                            </div>
                            <div className="mb-6">
                                <span className="text-3xl font-bold">N${pkg.basePrice.toLocaleString()}</span>
                            </div>
                            <ul className="space-y-3 mb-6">
                                {pkg.features.map((feature, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                        <Check className="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-2 px-4 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition-colors">
                                Select Package
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-2">Additional Services</h2>
                <p className="text-gray-600 mb-8">Enhance your package with these add-ons</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {additionalServices.map((service) => (
                        <motion.div
                            key={service.id}
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-xl border border-gray-200 hover:border-black/30 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">{service.name}</h3>
                                <Plus className="w-5 h-5 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                            <div className="text-xl font-bold">
                                N${service.basePrice.toLocaleString()}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
} 