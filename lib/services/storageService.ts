import { AllowedFileType, Attachment } from '@/lib/types';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const storage = getStorage();
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES: AllowedFileType[] = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

export const uploadAttachment = async (
    file: File,
    projectId: string
): Promise<Attachment> => {
    if (!ALLOWED_TYPES.includes(file.type as AllowedFileType)) {
        throw new Error('File type not supported');
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size too large');
    }

    const fileId = uuidv4();
    const fileExt = file.name.split('.').pop();
    const fileName = `${fileId}.${fileExt}`;
    const filePath = `projects/${projectId}/attachments/${fileName}`;
    
    try {
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        const attachment: Attachment = {
            id: fileId,
            name: file.name,
            url,
            type: file.type as AllowedFileType,
            size: file.size,
            path: filePath,
            uploadedAt: Date.now()
        };

        return attachment;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Failed to upload file');
    }
};

export const deleteAttachment = async (attachment: Attachment): Promise<void> => {
    try {
        const storageRef = ref(storage, attachment.path);
        await deleteObject(storageRef);
    } catch (error) {
        console.error('Error deleting file:', error);
        throw new Error('Failed to delete file');
    }
};