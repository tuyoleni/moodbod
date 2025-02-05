export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium">{label}</label>
            {children}
        </div>
    );
}