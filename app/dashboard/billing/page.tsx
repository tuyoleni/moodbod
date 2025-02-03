'use client';

import { motion } from 'framer-motion';
import { CreditCard, Download, DollarSign, Calendar } from 'lucide-react';

export default function BillingPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold">Billing & Payments</h1>
                <p className="text-gray-600 mt-1">Manage your billing information and view payments</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Payment Method */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Payment Method</h2>
                        <button className="text-sm text-gray-600 hover:text-black">Edit</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <CreditCard className="w-8 h-8 text-gray-400" />
                        <div>
                            <p className="font-medium">Bank Transfer</p>
                            <p className="text-sm text-gray-600">Primary payment method</p>
                        </div>
                    </div>
                </div>

                {/* Billing Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Billing Info</h2>
                        <button className="text-sm text-gray-600 hover:text-black">Edit</button>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Company Name</p>
                        <p className="text-sm text-gray-600">VAT Number</p>
                        <p className="text-sm text-gray-600">Billing Address</p>
                    </div>
                </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Payment History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Description</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="text-sm text-gray-600">
                                <td className="py-3 px-4">Mar 1, 2024</td>
                                <td className="py-3 px-4">Website Development</td>
                                <td className="py-3 px-4">N$4,500</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                        Paid
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <button className="text-gray-600 hover:text-black">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 