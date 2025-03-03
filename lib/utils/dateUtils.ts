import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';

export const convertToDate = (dateValue: Date | Timestamp | string | number | null): Date | null => {
  if (!dateValue) return null;

  try {
    if (dateValue instanceof Timestamp) {
      return dateValue.toDate();
    }
    
    if (dateValue instanceof Date) {
      return dateValue;
    }

    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    console.error('Error converting date:', error);
    return null;
  }
};

export const getLocalTime = (date: Date | null): Date | null => {
  if (!date) return null;
  
  try {
    const utcOffset = new Date().getTimezoneOffset() * 60000;
    return new Date(date.getTime() - utcOffset);
  } catch (error) {
    console.error('Error converting to local time:', error);
    return null;
  }
};

// Add and export the formatDate function
export const formatDate = (date: Date | null): string => {
  if (!date) return 'N/A';
  return format(date, 'MMM d, yyyy');
};