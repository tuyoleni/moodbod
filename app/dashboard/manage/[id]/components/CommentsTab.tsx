import React, { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import { Comment } from '@/lib/types/communication';  // Update the import
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { useAuth } from '@/lib/hooks/useAuth';
import { Timestamp } from 'firebase/firestore';

interface CommentsTabProps {
  project: Project;
}

const CommentsTab: React.FC<CommentsTabProps> = ({ project }) => {
  const [comments, setComments] = useState<Comment[]>(() => {
    // Convert project comments to match the Comment interface
    return (project.comments || []).map((comment: any) => ({
      id: comment.id,
      projectId: comment.projectId,
      userId: comment.userId,
      content: comment.content,
      createdAt: comment.createdAt instanceof Timestamp 
        ? comment.createdAt 
        : Timestamp.fromDate(new Date(comment.createdAt))
    }));
  });

  const [newComment, setNewComment] = useState('');
  const { session } = useAuth();

  const handleAddComment = async () => {
    if (!newComment.trim() || !session?.user?.id) return;

    const comment: Comment = {
      id: Date.now().toString(),
      projectId: project.id,
      userId: session.user.id,
      content: newComment.trim(),
      createdAt: Timestamp.now()  // Use Timestamp instead of Date
    };

    try {
      // Add comment to the project
      setComments([...comments, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAddComment}>Add Comment</Button>
      </div>

      {comments.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Comment</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.content}</TableCell>
                <TableCell>{comment.userId}</TableCell>
                <TableCell>
                  {format(
                    comment.createdAt instanceof Date 
                      ? comment.createdAt 
                      : comment.createdAt.toDate(),
                    'PPp'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          No comments yet
        </div>
      )}
    </div>
  );
};

export default CommentsTab;