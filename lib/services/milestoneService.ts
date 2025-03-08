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
        // Check for existing milestones with the same status
        const q = query(
            milestonesRef,
            where('projectId', '==', milestoneData.projectId),
            where('status', '==', milestoneData.status)
        );
        const existingMilestones = await getDocs(q);
        
        if (!existingMilestones.empty) {
            throw new Error('A milestone with this status already exists for this project');
        }

        const docRef = await addDoc(milestonesRef, {
            ...milestoneData,
            status: milestoneData.status,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating milestone:', error);
        throw error;
    }
};

const validateMilestoneTransition = (currentStatus: ServiceStatus, newStatus: ServiceStatus): boolean => {
    const validTransitions: Record<ServiceStatus, ServiceStatus[]> = {
        [ServiceStatus.REQUEST]: [ServiceStatus.ANALYZING, ServiceStatus.REJECTED],
        [ServiceStatus.ANALYZING]: [ServiceStatus.PAYMENT_PENDING, ServiceStatus.REJECTED],
        [ServiceStatus.PAYMENT_PENDING]: [ServiceStatus.PLANNING, ServiceStatus.REJECTED],
        [ServiceStatus.PLANNING]: [ServiceStatus.DEVELOPMENT, ServiceStatus.REJECTED],
        [ServiceStatus.DEVELOPMENT]: [ServiceStatus.REVIEW, ServiceStatus.REJECTED],
        [ServiceStatus.REVIEW]: [ServiceStatus.TESTING, ServiceStatus.DEVELOPMENT, ServiceStatus.REJECTED],
        [ServiceStatus.TESTING]: [ServiceStatus.COMPLETED, ServiceStatus.DEVELOPMENT, ServiceStatus.REJECTED],
        [ServiceStatus.COMPLETED]: [], // No transitions from completed
        [ServiceStatus.REJECTED]: [ServiceStatus.REQUEST] // Allow restart from rejected
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
};

export const requiresFeedback = (status: ServiceStatus): boolean => {
    return [ServiceStatus.REVIEW, ServiceStatus.TESTING].includes(status);
};

export const validateMilestoneRequirements = (milestone: Milestone, newStatus: ServiceStatus): void => {
    if (requiresFeedback(newStatus) && (!milestone.feedback || milestone.feedback.length === 0)) {
        throw new Error('Feedback is required before moving to this stage');
    }

    if (newStatus === ServiceStatus.DEVELOPMENT) {
        throw new Error('Maximum revision limit reached. Additional revisions need to be purchased.');
    }
};


export const updateMilestoneStatus = async (milestoneId: string, newStatus: ServiceStatus): Promise<void> => {
    try {
        const milestoneRef = doc(milestonesRef, milestoneId);
        const milestoneSnap = await getDocs(query(milestonesRef, where('id', '==', milestoneId)));
        const milestone = milestoneSnap.docs[0].data() as Milestone;

        // Validate status transition
        if (!validateMilestoneTransition(milestone.status, newStatus)) {
            throw new Error(`Invalid status transition from ${milestone.status} to ${newStatus}`);
        }

        // Check if feedback is required for certain transitions
        if ([ServiceStatus.REVIEW, ServiceStatus.TESTING].includes(newStatus)) {
            if (!milestone.feedback || milestone.feedback.length === 0) {
                throw new Error('Feedback is required before moving to this stage');
            }
        }

 
        // // Check revision limits for review stages
        // if (newStatus === ServiceStatus.REVIEW) {
        //     throw new Error('Additional revisions need to be purchased.');
        // }

        // Update milestone status
        await updateDoc(milestoneRef, {
            status: newStatus,
            updatedAt: serverTimestamp()
        });
        // Update project status based on milestone status
        if (milestone.projectId) {
            const projectRef = doc(db, 'projects', milestone.projectId);

            // Update project status to match milestone status
            await updateDoc(projectRef, {
                status: newStatus,
                updatedAt: serverTimestamp()
            });
        }
    } catch (error) {
        console.error('Error updating milestone status:', error);
        throw error;
    }
};
