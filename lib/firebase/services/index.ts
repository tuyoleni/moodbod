import { db } from '../config';
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { Project, Payment, Invoice, Service } from '@/lib/types/database';

// Collection References
export const projectsRef = collection(db, 'projects');
export const paymentsRef = collection(db, 'payments');
export const invoicesRef = collection(db, 'invoices');
export const servicesRef = collection(db, 'services');

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
            status: 'pending',
            paidAmount: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const updateProject = async (projectId: string, updates: Partial<Project>): Promise<void> => {
    try {
        const projectRef = doc(db, 'projects', projectId);
        await updateDoc(projectRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating project:', error);
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

// Service Management
export const fetchServices = async (): Promise<Service[]> => {
    try {
        const querySnapshot = await getDocs(servicesRef);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Service[];
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}; 