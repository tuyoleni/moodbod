'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Service } from '@/lib/types/database';
import { Plus, Search, Filter } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesRef = collection(db, 'services');
                const querySnapshot = await getDocs(servicesRef);
                const servicesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Service[];
                setServices(servicesData);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || service.category === filter;
        return matchesSearch && matchesFilter;
    });

    const categories = ['all', 'website', 'ecommerce', 'branding', 'marketing', 'maintenance'];

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-semibold">Services</h1>
                    <p className="text-gray-600 mt-1">Manage your service offerings</p>
                </div>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition-colors"
                    onClick={() => {
                        // TODO: Implement service creation modal/form
                        console.log('Add service clicked');
                    }}
                >
                    <Plus className="w-4 h-4" />
                    Add Service
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Services Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Base Price</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Features</th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredServices.map((service) => (
                                <tr key={service.id} className="text-sm text-gray-600">
                                    <td className="py-3 px-4">{service.name}</td>
                                    <td className="py-3 px-4 capitalize">{service.category}</td>
                                    <td className="py-3 px-4">N${service.basePrice.toLocaleString()}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-1 flex-wrap">
                                            {service.features.slice(0, 2).map((feature, index) => (
                                                <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                                    {feature}
                                                </span>
                                            ))}
                                            {service.features.length > 2 && (
                                                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                                    +{service.features.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <button
                                            className="text-gray-600 hover:text-black"
                                            onClick={() => {
                                                // TODO: Implement service editing
                                                console.log('Edit service:', service.id);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 