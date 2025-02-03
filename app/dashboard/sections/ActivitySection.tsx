'use client';

import { motion } from 'framer-motion';

export default function ActivitySection() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
        >
            <h2 className="text-2xl font-semibold mb-8">Recent Activity</h2>
            <div className="space-y-4">
                {/* Add activity items here */}
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-500">No recent activity</div>
                </div>
            </div>
        </motion.div>
    );
} 