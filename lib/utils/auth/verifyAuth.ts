import { db } from '@/lib/config/firebase';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

export const verifyAuthStorage = async (userId: string) => {
    try {
        // Check user document
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (!userDoc.exists()) {
            console.error('User document not found');
            return false;
        }

        // Check accounts collection using a query for better performance
        const accountsQuery = query(
            collection(db, 'accounts'),
            where('userId', '==', userId)
        );
        
        const accountsSnapshot = await getDocs(accountsQuery);
        
        if (accountsSnapshot.empty) {
            console.log('No accounts found for user ID:', userId);
            // Return true anyway since the user exists
            return true;
        }

        return true;
    } catch (error) {
        console.error('Error verifying auth storage:', error);
        return false;
    }
};