'use client';

import { motion } from 'framer-motion';

export default function MessagesSection() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
        >
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Messages</h2>
                <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition-colors">
                    New Message
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 divide-y">
                {/* Add message components here */}
                <div className="p-4 text-center text-gray-500">
                    No messages yet
                </div>
            </div>
        </motion.div>
    );
} 