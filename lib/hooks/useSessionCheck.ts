import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function useSessionCheck() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'loading') {
            return;
        }

        if (status === 'unauthenticated') {
            router.push('/register');
            return;
        }

        if (status === 'authenticated' && session?.user?.email) {
            setEmail(session.user.email);
        }
    }, [status, session, router]);

    return email;
}
