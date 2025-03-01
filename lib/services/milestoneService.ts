import { collection, query, where, getDocs, addDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Milestone, ServiceStatus } from '@/lib/types/database';
import { validateAmount } from '@/lib/utils/validation';

const milestonesRef = collection(db, 'milestones');

export const createMilestone = async (milestone: Omit<Milestone, 'id'>): Promise<string> => {
    try {
        if (milestone.paymentRequired && !validateAmount(milestone.paymentRequired)) {
            throw new Error('Invalid payment amount');
        }

        const docRef = await addDoc(milestonesRef, {
            ...milestone,
            status: ServiceStatus.PENDING,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating milestone:', error);
        throw error;
    }
};

export const getProjectMilestones = async (projectId: string): Promise<Milestone[]> => {
    try {
        const q = query(milestonesRef, where('projectId', '==', projectId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Milestone[];
    } catch (error) {
        console.error('Error fetching milestones:', error);
        return [];
    }
};

export const updateMilestoneStatus = async (milestoneId: string, status: ServiceStatus): Promise<void> => {
    try {
        const milestoneRef = doc(milestonesRef, milestoneId);
        await updateDoc(milestoneRef, {
            status,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating milestone status:', error);
        throw error;
    }
};