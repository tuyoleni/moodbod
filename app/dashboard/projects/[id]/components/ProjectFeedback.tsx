'use client';

import { Project } from '@/lib/types/database';
import { useState } from 'react';
import { MessageSquare, ThumbsUp, AlertCircle } from 'lucide-react';

interface FeedbackItem {
    id: string;
    type: 'revision' | 'approval' | 'comment';
    content: string;
    createdAt: Date;
    status: 'pending' | 'addressed';
}

export default function ProjectFeedback({ project }: { project: Project }) {
    const [feedback] = useState<FeedbackItem[]>([]); // Replace with actual feedback fetch
    const [newFeedback, setNewFeedback] = useState('');
    const [feedbackType, setFeedbackType] = useState<'revision' | 'approval' | 'comment'>('comment');

    const remainingRevisions = project.package.features?.find(f =>
        f.includes('revision'))?.match(/\d+/)?.[0] || 0;

    return (
        <div className="space-y-8">
            {/* Revision Status */}
            <div className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium">Revision Status</h3>
                <p className="text-sm text-gray-600 mt-2">
                    {remainingRevisions} revisions remaining out of {
                        project.package.features?.find(f =>
                            f.includes('revision'))?.match(/\d+/)?.[0] || 0
                    }
                </p>
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
                {feedback.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 bg-white rounded-lg border border-gray-200"
                    >
                        <div className="flex items-start gap-3">
                            {item.type === 'revision' ? (
                                <AlertCircle className="w-5 h-5 text-gray-400" />
                            ) : item.type === 'approval' ? (
                                <ThumbsUp className="w-5 h-5 text-gray-400" />
                            ) : (
                                <MessageSquare className="w-5 h-5 text-gray-400" />
                            )}
                            <div>
                                <p className="text-sm font-medium">
                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Request
                                </p>
                                <p className="text-gray-600 mt-1">{item.content}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {item.createdAt.toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className={`text-xs px-2 py-1 rounded-full 
                            ${item.status === 'addressed' ? 'bg-black text-white' : 'bg-black/5 text-black'}`}>
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Feedback Input */}
            <div className="space-y-4">
                <div className="flex gap-2">
                    {(['comment', 'revision', 'approval'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setFeedbackType(type)}
                            className={`px-4 py-2 rounded-lg text-sm ${feedbackType === type
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
                <textarea
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    placeholder={`Add your ${feedbackType}...`}
                    className="w-full p-4 bg-white rounded-lg border border-gray-200 
                    focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                    resize-none min-h-[100px]"
                />
                <button
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm
                    hover:bg-black/90 transition-colors disabled:opacity-50"
                    disabled={!newFeedback.trim()}
                >
                    Submit {feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)}
                </button>
            </div>
        </div>
    );
} 