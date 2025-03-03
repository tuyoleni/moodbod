import { collection, query, where, getDocs, addDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Service, ServiceStatus } from '@/lib/types';

const projectServicesRef = collection(db, 'projectServices');

export const requestServiceAddition = async (projectId: string, serviceData: Omit<Service, 'id' | 'status'>): Promise<string> => {
    try {
        const docRef = await addDoc(projectServicesRef, {
            ...serviceData,
            projectId,
            status: ServiceStatus.PENDING,
            requestedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error requesting service:', error);
        throw error;
    }
};

export const getServiceRequests = async (projectId?: string): Promise<Service[]> => {
    try {
        let q = query(
            projectServicesRef,
            where('status', '==', ServiceStatus.PENDING)
        );

        if (projectId) {
            q = query(q, where('projectId', '==', projectId));
        }

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Service[];
    } catch (error) {
        console.error('Error fetching pending services:', error);
        return [];
    }
};

export const approveServiceRequest = async (serviceId: string): Promise<void> => {
    try {
        const serviceRef = doc(projectServicesRef, serviceId);
        await updateDoc(serviceRef, {
            status: ServiceStatus.ACTIVE,
            approvedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error approving service:', error);
        throw error;
    }
};

export const rejectServiceRequest = async (serviceId: string, reason?: string): Promise<void> => {
    try {
        const serviceRef = doc(projectServicesRef, serviceId);
        await updateDoc(serviceRef, {
            status: ServiceStatus.REJECTED,
            rejectionReason: reason,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error rejecting service:', error);
        throw error;
    }
};

export const removeProjectService = async (serviceId: string): Promise<void> => {
    try {
        const serviceRef = doc(projectServicesRef, serviceId);
        await updateDoc(serviceRef, {
            status: ServiceStatus.REMOVED,
            removedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error removing service:', error);
        throw error;
    }
};

export const getProjectServices = async (projectId: string): Promise<Service[]> => {
    try {
        const q = query(
            projectServicesRef,
            where('projectId', '==', projectId),
            where('status', 'in', [ServiceStatus.ACTIVE, ServiceStatus.PENDING])
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Service[];
    } catch (error) {
        console.error('Error fetching project services:', error);
        return [];
    }
};