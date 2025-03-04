import { collection, query, where, getDocs, addDoc, doc, serverTimestamp, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { validateFeatures } from '@/lib/utils/validation';
import { Project, ProjectStatus } from '../types';

const projectsRef = collection(db, 'projects');

export const fetchAllProjects = async (): Promise<Project[]> => {
    try {
        const querySnapshot = await getDocs(projectsRef);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Project[];
    } catch (error) {
        console.error('Error fetching all projects:', error);
        return [];
    }
};

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

export const getProjectById = async (projectId: string): Promise<Project | null> => {
    try {
        const projectRef = doc(projectsRef, projectId);
        const projectSnap = await getDoc(projectRef);

        if (!projectSnap.exists()) {
            return null;
        }

        return { id: projectSnap.id, ...projectSnap.data() } as Project;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
};

export const createProject = async (projectData: Omit<Project, 'id'>): Promise<string> => {
    try {
        if (!validateFeatures(projectData.package.features, projectData.type)) {
            throw new Error('Invalid project features');
        }

        const docRef = await addDoc(projectsRef, {
            ...projectData,
            status: ProjectStatus.REQUESTED,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const updateProject = async (projectId: string, projectData: Partial<Project>): Promise<void> => {
    try {
        const projectRef = doc(projectsRef, projectId);
        await updateDoc(projectRef, {
            ...projectData,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

export const updateProjectStatus = async (
    projectId: string, 
    status: ProjectStatus,
    projectData?: Partial<Project>
): Promise<void> => {
    try {
        const projectRef = doc(projectsRef, projectId);
        await updateDoc(projectRef, {
            status,
            updatedAt: serverTimestamp(),
            ...projectData
        });
    } catch (error) {
        console.error('Error updating project status:', error);
        throw error;
    }
};

export const deleteProject = async (projectId: string): Promise<void> => {
    try {
        const projectRef = doc(projectsRef, projectId);
        await deleteDoc(projectRef);
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};