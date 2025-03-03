import { collection, query, where, getDocs, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Milestone, ServiceStatus } from '../types';

const milestonesRef = collection(db, 'milestones');

export const getProjectMilestones = async (projectId: string): Promise<Milestone[]> => {
    try {
        const q = query(milestonesRef, where('projectId', '==', projectId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Milestone[];
    } catch (error) {
        console.error('Error fetching project milestones:', error);
        return [];
    }
};

export const createMilestone = async (milestoneData: Omit<Milestone, 'id'>): Promise<string> => {
    try {
        const docRef = await addDoc(milestonesRef, {
            ...milestoneData,
            status: ServiceStatus.PENDING,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating milestone:', error);
        throw error;
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
