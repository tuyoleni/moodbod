import React, { useState, useEffect } from 'react';
import { Project, Comment } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { useAuth } from '@/lib/hooks/useAuth';

interface CommentsTabProps {
  project: Project;
}

const CommentsTab: React.FC<CommentsTabProps> = ({ project }) => {
  const [comments, setComments] = useState<Comment[]>(project.comments || []);
  const [newComment, setNewComment] = useState('');
  const { session } = useAuth();

  const handleAddComment = async () => {
    if (!newComment.trim() || !session?.user?.id) return;

    const comment = {
      id: Date.now().toString(),
      projectId: project.id,
      userId: session.user.id,
      content: newComment.trim(),
      createdAt: new Date()
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