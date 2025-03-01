import { collection, query, where, getDocs, addDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { validateAmount, validatePaymentMethod } from '@/lib/utils/validation';
import { Payment, Invoice, InvoiceStatus } from '../types';

const paymentsRef = collection(db, 'payments');
const invoicesRef = collection(db, 'invoices');

export const createPayment = async (paymentData: Omit<Payment, 'id'>): Promise<string> => {
    try {
        if (!validateAmount(paymentData.amount) || !validatePaymentMethod(paymentData.method)) {
            throw new Error('Invalid payment data');
        }

        const docRef = await addDoc(paymentsRef, {
            ...paymentData,
            status: 'pending',
            date: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
};

export const getPaymentsByProject = async (projectId: string): Promise<Payment[]> => {
    try {
        const q = query(paymentsRef, where('projectId', '==', projectId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Payment[];
    } catch (error) {
        console.error('Error fetching payments:', error);
        return [];
    }
};

export const createInvoice = async (invoiceData: Omit<Invoice, 'id'>): Promise<string> => {
    try {
        const docRef = await addDoc(invoicesRef, {
            ...invoiceData,
            status: InvoiceStatus.DRAFT,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }
};

export const updateInvoiceStatus = async (invoiceId: string, status: InvoiceStatus): Promise<void> => {
    try {
        const invoiceRef = doc(invoicesRef, invoiceId);
        await updateDoc(invoiceRef, {
            status,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating invoice status:', error);
        throw error;
    }
};