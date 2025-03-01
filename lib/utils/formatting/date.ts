export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-NA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function formatDateTime(date: Date): string {
    return date.toLocaleDateString('en-NA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}