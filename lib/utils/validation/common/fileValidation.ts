import { AllowedFileType } from '@/lib/types';

export const validateFileType = (type: string, allowedTypes: AllowedFileType[]): boolean => {
    return allowedTypes.includes(type as AllowedFileType);
};

export const validateFileSize = (size: number, maxSize: number): boolean => {
    return size > 0 && size <= maxSize;
};