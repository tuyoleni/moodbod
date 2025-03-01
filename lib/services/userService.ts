import { collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User } from '../types/user';

const usersRef = collection(db, 'users');

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
    try {
        const querySnapshot = await getDocs(usersRef);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as User[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

// Fetch users by role
export const fetchUsersByRole = async (role: 'client' | 'admin'): Promise<User[]> => {
    try {
        const q = query(usersRef, where('role', '==', role));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as User[];
    } catch (error) {
        console.error('Error fetching users by role:', error);
        return [];
    }
};

// Get user by ID
export const getUserById = async (userId: string): Promise<User | null> => {
    try {
        const userRef = doc(usersRef, userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            return null;
        }

        return { id: userSnap.id, ...userSnap.data() } as User;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};


// Search users by name or email
export const searchUsers = async (searchTerm: string): Promise<User[]> => {
    try {
        // Due to Firestore limitations, we'll fetch all users and filter client-side
        // For production, consider implementing a proper search solution
        const querySnapshot = await getDocs(usersRef);
        const users = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as User[];

        return users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } catch (error) {
        console.error('Error searching users:', error);
        return [];
    }
};

export const updateUser = async (userId: string, userData: Partial<User>): Promise<void> => {
    try {
        const userRef = doc(usersRef, userId);
        await updateDoc(userRef, {
            ...userData,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (userId: string): Promise<void> => {
    try {
        const userRef = doc(usersRef, userId);
        await deleteDoc(userRef);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};