import { db } from '@/lib/firebase/config';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Payment, Invoice } from '@/lib/types/database';

export const paymentsRef = collection(db, 'payments');
export const invoicesRef = collection(db, 'invoices');

export const createPayment = async (paymentData: Omit<Payment, 'id'>): Promise<string> => {
    try {
        const docRef = await addDoc(paymentsRef, {
            ...paymentData,
            date: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
};

export const createInvoice = async (invoiceData: Omit<Invoice, 'id'>): Promise<string> => {
    try {
        const docRef = await addDoc(invoicesRef, {
            ...invoiceData,
            status: 'draft',
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }
}; 