import { collection, query, where, getDocs, addDoc, doc, serverTimestamp, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Message, Feedback, FeedbackStatus } from '../types';


const messagesRef = collection(db, 'messages');
const feedbackRef = collection(db, 'feedback');

export const sendMessage = async (messageData: Omit<Message, 'id' | 'createdAt'>): Promise<string> => {
    try {
        const docRef = await addDoc(messagesRef, {
            ...messageData,
            createdAt: serverTimestamp(),
            readBy: [messageData.userId]
        });
        return docRef.id;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const getProjectMessages = async (projectId: string): Promise<Message[]> => {
    try {
        const q = query(
            messagesRef,
            where('projectId', '==', projectId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Message[];
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};

export const submitFeedback = async (feedbackData: Omit<Feedback, 'id' | 'createdAt'>): Promise<string> => {
    try {
        const docRef = await addDoc(feedbackRef, {
            ...feedbackData,
            status: FeedbackStatus.PENDING,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error submitting feedback:', error);
        throw error;
    }
};

export const getProjectFeedback = async (projectId: string): Promise<Feedback[]> => {
    try {
        const q = query(
            feedbackRef,
            where('projectId', '==', projectId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Feedback[];
    } catch (error) {
        console.error('Error fetching feedback:', error);
        return [];
    }
};