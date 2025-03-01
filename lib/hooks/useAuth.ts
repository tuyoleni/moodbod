'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthSession } from "../types/auth";

export function useAuth(redirectTo: string = '/dashboard') {
    const { data: session, status } = useSession() as { data: AuthSession | null, status: string };
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push(redirectTo);
        }
    }, [status, router, redirectTo]);

    return {
        session,
        status,
        isLoading: status === "loading",
        isAuthenticated: status === "authenticated",
        user: session?.user
    };
}