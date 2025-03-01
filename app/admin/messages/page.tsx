'use client';

import { useState, useEffect } from 'react';
import { Message } from '@/lib/types/communication';
import { getAllMessages } from '@/lib/services/communicationService';
// import { useAuth } from '@/lib/hooks/useAuth';

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    // const { session } = useAuth();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messagesData = await getAllMessages();
                setMessages(messagesData);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) {
        return <div className="p-4">Loading messages...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Message Management</h1>
            <div className="grid gap-4">
                {messages.map((message) => (
                    <div key={message.id} className="p-4 border rounded-lg shadow-sm">
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold">{message.content}</h3>
                                <span className="text-sm text-gray-500">
                                    {new Date(message.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">{message.content}</p>
                            <div className="flex gap-4 text-sm text-gray-600">
                                <p>From: {message.userId}</p>
                                <p>To: {message.readBy}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}