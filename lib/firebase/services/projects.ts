import { db } from '@/lib/firebase/config';
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
import { PricingPackage, Project, ProjectPackage, ProjectService, ProjectType, Service } from '@/lib/types/database';

const projectsRef = collection(db, 'projects');

export const getUserProjects = async (userId: string): Promise<Project[]> => {
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

export const addProject = async (projectData: Omit<Project, 'id'>): Promise<string> => {
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

export const addServiceToProject = async (
    projectId: string,
    service: ProjectService
): Promise<void> => {
    try {
        const projectRef = doc(db, 'projects', projectId);
        const project = (await getDocs(query(projectsRef, where('id', '==', projectId)))).docs[0].data() as Project;

        await updateDoc(projectRef, {
            additionalServices: [...project.additionalServices, service],
            totalCost: project.totalCost + service.basePrice,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error adding service to project:', error);
        throw error;
    }
};

export const removeServiceFromProject = async (
    projectId: string,
    serviceId: string
): Promise<void> => {
    try {
        const projectRef = doc(db, 'projects', projectId);
        const project = (await getDocs(query(projectsRef, where('id', '==', projectId)))).docs[0].data() as Project;

        const service = project.additionalServices.find(s => s.id === serviceId);
        if (!service) return;

        await updateDoc(projectRef, {
            additionalServices: project.additionalServices.filter(s => s.id !== serviceId),
            totalCost: project.totalCost - service.basePrice,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error removing service from project:', error);
        throw error;
    }
};

export const createNewProject = async (projectData: {
    userId: string;
    type: 'website' | 'ecommerce' | 'branding' | 'custom';
    name: string;
    description: string;
    package: ProjectPackage;
    additionalServices: ProjectService[];
    requirements: string;
}) => {
    try {
        const totalCost = calculateTotalCost(projectData.package, projectData.additionalServices);
        const now = Timestamp.now();

        const newProject: Omit<Project, 'id'> = {
            ...projectData,
            services: [],
            status: 'pending',
            contactEnabled: false,
            totalCost,
            paidAmount: 0,
            createdAt: now,
            updatedAt: now
        };

        // Convert project data to match CreateProjectData interface
        const createProjectData: CreateProjectData = {
            userId: projectData.userId,
            type: projectData.type,
            name: projectData.name,
            description: projectData.description,
            timeline: '', // Required by CreateProjectData
            budget: '', // Required by CreateProjectData
            selectedPackage: projectData.package,
            additionalServices: projectData.additionalServices.map(service => ({
                ...service,
                features: [] // Add missing features property
            })),
            requirements: projectData.requirements
        };

        const projectId = await createProject(createProjectData);
        return projectId;
    } catch (error) {
        console.error('Error creating new project:', error);
        throw error;
    }
};

const calculateTotalCost = (selectedPackage: ProjectPackage, additionalServices: ProjectService[]) => {
    let total = selectedPackage.basePrice;
    additionalServices.forEach(service => {
        total += service.basePrice;
    });
    return total;
};

interface CreateProjectData {
    userId: string;
    type: ProjectType;
    name: string;
    description: string;
    timeline: string;
    budget: string;
    selectedPackage: PricingPackage;
    additionalServices: Service[];
    requirements: string;
}

export async function createProject(data: CreateProjectData): Promise<string> {
    try {
        const totalCost = data.selectedPackage.basePrice +
            data.additionalServices.reduce((sum, service) => sum + service.basePrice, 0);

        const projectData: Omit<Project, 'id'> = {
            userId: data.userId,
            type: data.type,
            name: data.name,
            description: data.description,
            status: 'pending',
            package: data.selectedPackage,
            additionalServices: data.additionalServices,
            requirements: data.requirements,
            services: [],
            totalCost,
            paidAmount: 0,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            contactEnabled: false
        };

        const docRef = await addDoc(collection(db, 'projects'), projectData);
        return docRef.id;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

export async function fetchUserProjects(userId: string): Promise<Project[]> {
    try {
        const projectsRef = collection(db, 'projects');
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
} 