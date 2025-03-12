import React, { useState } from 'react';
import { Project } from '@/lib/types';
import { Message, Comment } from '@/lib/types/communication';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { useAuth } from '@/lib/hooks/useAuth';
import { Timestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import { addCommentToProject } from '@/lib/services/communicationService';
import { sendMessage, getProjectMessages } from '@/lib/services/communicationService';

interface MessagesTabProps {
  project: Project;
}

type CommunicationItem = (Message | Comment) & { type: 'message' | 'comment' };

const MessagesTab: React.FC<MessagesTabProps> = ({ project }) => {
  const [communications, setCommunications] = useState<CommunicationItem[]>(() => {
    const comments = (project.comments || []).map((comment: any) => ({
      ...comment,
      type: 'comment' as const,
      createdAt: comment.createdAt instanceof Timestamp 
        ? comment.createdAt 
        : Timestamp.fromDate(new Date(comment.createdAt))
    }));
    return comments;
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newContent, setNewContent] = useState('');
  const { session } = useAuth();

  React.useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await getProjectMessages(project.id);
        const formattedMessages = messages.map(message => ({
          ...message,
          type: 'message' as const
        }));
        setCommunications(prev => [...prev, ...formattedMessages]);
      } catch (error) {
        console.error('Error loading messages:', error);
        toast.error('Failed to load messages');
      }
    };
    loadMessages();
  }, [project.id]);

  const handleAddCommunication = async () => {
    if (!newContent.trim() || !session?.user?.id) return;
    setIsSubmitting(true);

    try {
      const timestamp = Timestamp.now();
      const newItem = {
        id: Date.now().toString(),
        projectId: project.id,
        userId: session.user.id,
        content: newContent.trim(),
        createdAt: timestamp,
        type: 'comment' as const
      };

      await addCommentToProject(project.id, newItem);
      setCommunications(prev => [...prev, newItem]);
      setNewContent('');
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error adding communication:', error);
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedCommunications = [...communications].sort((a, b) => {
    const dateA = a.createdAt instanceof Date ? a.createdAt : a.createdAt.toDate();
    const dateB = b.createdAt instanceof Date ? b.createdAt : b.createdAt.toDate();
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Add a comment or message..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="flex-1"
          disabled={isSubmitting}
        />
        <Button 
          onClick={handleAddCommunication} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </div>

      {sortedCommunications.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCommunications.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.content}</TableCell>
                <TableCell>
                  <span className={`capitalize ${item.type === 'message' ? 'text-blue-600' : 'text-gray-600'}`}>
                    {item.type}
                  </span>
                </TableCell>
                <TableCell>{item.userId}</TableCell>
                <TableCell>
                  {format(
                    item.createdAt instanceof Date 
                      ? item.createdAt 
                      : item.createdAt.toDate(),
                    'PPp'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          No messages or comments yet
        </div>
      )}
    </div>
  );
};

export default MessagesTab;