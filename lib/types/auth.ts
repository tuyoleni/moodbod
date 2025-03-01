import { DefaultSession } from "next-auth";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: 'admin' | 'user';
}

export interface AuthSession extends DefaultSession {
    user: AuthUser;
}
