export type AllowedFileType = 'image/jpeg' | 'image/png' | 'image/gif' | 'application/pdf';

export interface Attachment {
    id: string;
    name: string;
    url: string;
    type: AllowedFileType;
    size: number;
    path: string;
    uploadedAt: number;
}

export interface FileWithPreview extends File {
    preview: string;
}