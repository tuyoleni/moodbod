export interface UseDataFetchProps<T, P = void> {
    fetchData: (email: string, params?: P) => Promise<T>;
    initialData?: T;
    params?: P;
}
