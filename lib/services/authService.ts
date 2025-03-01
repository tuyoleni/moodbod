import { FirestoreAdapter } from "@auth/firebase-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthSession, AuthUser } from "../types/auth";
import { getFirebaseAdmin, getFirestoreAdmin } from "../config/firebaseAdmin";

// Update the imports
const admin = await getFirebaseAdmin();
const dbAdmin = await getFirestoreAdmin();

const ADMIN_EMAILS = [
    'simeon.devs@gmail.com'
];

declare module 'next-auth' {
    interface Session extends AuthSession {}
    interface User extends AuthUser {}
    interface JWT {
        role?: 'admin' | 'user';
    }
}

export const createAuthOptions = (): NextAuthOptions => ({
    
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, profile }) {
            try {
                const userId = profile?.sub || user.id;
                const userRef = dbAdmin.collection("users").doc(userId);
                const doc = await userRef.get();
                
                const role = ADMIN_EMAILS.includes(user.email!) ? 'admin' : 'user';
                
                if (!doc.exists) {
                    const userData = {
                        email: user.email,
                        name: user.name,
                        role: role,
                    };
                    await userRef.set(userData);
                }
                else {
                    await userRef.update({
                        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                        role: role,
                    });
                }
                
                user.role = role;
                user.id = userId;
                return true;
            } catch (error) {
                console.error("Error managing user in Firestore:", error);
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = ADMIN_EMAILS.includes(user.email!) ? 'admin' : 'user';
            }
            if (!token.role) {
                token.role = 'user';
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role || 'user',
                    id: token.sub
                }
            } as AuthSession;
        }
    },
    pages: {
        signIn: '/register',
        error: '/auth/error',
    },
    debug: process.env.NODE_ENV === 'development',
});