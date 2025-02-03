import { Service } from '@/lib/types/database';
import { motion } from 'framer-motion';

interface ServiceCardProps {
    service: Service;
    isSelected?: boolean;
    onClick?: () => void;
}

export default function ServiceCard({ service, isSelected, onClick }: ServiceCardProps) {
    return (
        <motion.div
            onClick={onClick}
            className={`p-6 rounded-lg border ${isSelected ? 'border-black bg-black/5' : 'border-gray-200'} cursor-pointer hover:border-black/30 transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium">N${service.basePrice.toLocaleString()}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{service.category}</span>
            </div>
        </motion.div>
    );
} 