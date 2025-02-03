import { db } from './config';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Project, Payment, Invoice } from '@/lib/types/database';

// Collections
const projectsRef = collection(db, 'projects');
const paymentsRef = collection(db, 'payments');
const invoicesRef = collection(db, 'invoices');

// Project Services
export const fetchUserProjects = async (userId: string): Promise<Project[]> => {
    try {
        const q = query(projectsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Project[];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export const createProject = async (projectData: Omit<Project, 'id'>): Promise<string> => {
    try {
        const docRef = await addDoc(projectsRef, {
            ...projectData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

// Payment Services
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

// Invoice Services
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