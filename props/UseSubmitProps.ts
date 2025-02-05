export interface UseSubmitProps<TData = any, TResponse = any> {
    onSubmit: (data: TData) => Promise<TResponse>;
    onSuccess?: (response: TResponse) => void;
    onError?: (error: Error) => void;
    successMessage?: string;
    errorMessage?: string;
    requireAuth?: boolean;
}

export interface UseSubmitReturn<TData = any, TResponse = any> {
    handleSubmit: (formData: TData) => Promise<TResponse | null>;
    isSubmitting: boolean;
    error: string | null;
    reset: () => void;
}
