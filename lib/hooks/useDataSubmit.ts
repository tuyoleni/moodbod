
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSessionCheck } from './useSessionCheck';
import { UseSubmitProps, UseSubmitReturn } from '@/props/UseSubmitProps';

export function useDataSubmit({
    onSubmit,
    onSuccess,
    onError,
    successMessage = 'Operation completed successfully!',
    errorMessage = 'Operation failed. Please try again.',
    requireAuth = true
}: UseSubmitProps): UseSubmitReturn {
    const email = useSessionCheck();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reset = () => {
        setError(null);
        setIsSubmitting(false);
    };

    const handleSubmit = async (formData: FormData): Promise<any> => {
        if (requireAuth && !email) {
            const authError = 'You must be logged in to perform this action';
            toast.error(authError);
            setError(authError);
            return null;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            const data = email ? { ...formData, userEmail: email } : formData;
            const response = await onSubmit(data);

            toast.success(successMessage);
            onSuccess?.(response);
            return response;

        } catch (err) {
            const error = err as Error;
            console.error('Operation failed:', error);
            setError(errorMessage);
            toast.error(errorMessage);
            onError?.(error);
            return null;

        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        handleSubmit,
        isSubmitting,
        error,
        reset
    };
}