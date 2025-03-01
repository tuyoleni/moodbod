'use client';

import { useState, useEffect } from 'react';
import { Payment } from '@/lib/types/payment';
import { getAllPayments } from '@/lib/services/paymentService';
import { useAuth } from '@/lib/hooks/useAuth';

export default function PaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const { session } = useAuth();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const paymentsData = await getAllPayments();
                setPayments(paymentsData);
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) {
        return <div className="p-4">Loading payments...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Payment Management</h1>
            <div className="grid gap-4">
                {payments.map((payment) => (
                    <div key={payment.id} className="p-4 border rounded-lg shadow-sm">
                        <div className="space-y-2">
                            <h3 className="font-semibold">Payment #{payment.id}</h3>
                            <div className="flex gap-4 text-sm text-gray-600">
                                <p>Amount: ${payment.amount}</p>
                                <p>Status: {payment.status}</p>
                            </div>
                            <p className="text-sm text-gray-600">Project: {payment.projectId}</p>
                            <p className="text-sm text-gray-600">Date: {new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}