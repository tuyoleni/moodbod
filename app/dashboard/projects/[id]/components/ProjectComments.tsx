'use client';

import { Project } from '@/lib/types/database';
import { useState } from 'react';
import { Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    userId: string;
    userName: string;
}

export default function ProjectComments({ project }: { project: Project }) {
    const [newComment, setNewComment] = useState('');
    const queryClient = useQueryClient();

    const { data: comments = [] } = useQuery<Comment[]>({
        queryKey: ['comments', project.id],
        queryFn: async () => {
            const res = await fetch(`/api/projects/${project.id}/comments`);
            if (!res.ok) throw new Error('Failed to fetch comments');
            return res.json();
        }
    });

    const addCommentMutation = useMutation({
        mutationFn: async (content: string) => {
            const res = await fetch(`/api/projects/${project.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content })
            });
            if (!res.ok) throw new Error('Failed to add comment');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', project.id] });
            setNewComment('');
        }
    });

    return (
        <div className="space-y-8">
            {/* Comments List */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="p-4 bg-white rounded-lg border border-gray-200"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium">{comment.userName}</p>
                                <p className="text-sm text-gray-500">
                                    {comment.createdAt.toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <p className="mt-2 text-gray-600">{comment.content}</p>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-center text-gray-500">No comments yet</p>
                )}
            </div>

            {/* New Comment Input */}
            <div className="relative">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-4 pr-12 bg-white rounded-lg border border-gray-200 
                    focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                    resize-none min-h-[100px]"
                />
                <button
                    onClick={() => addCommentMutation.mutate(newComment)}
                    className="absolute right-4 bottom-4 p-2 text-gray-400 
                    hover:text-black transition-colors disabled:opacity-50"
                    disabled={!newComment.trim() || addCommentMutation.isPending}
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
} 