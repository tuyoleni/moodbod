import { FirestoreAdapter } from "@auth/firebase-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthSession, AuthUser } from "../types/auth";
import { dbAdmin, admin } from "../config/firebaseAdmin";

const ADMIN_EMAILS = [
    'simeonlleni@gmail.com',
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
        async signIn({ user, account, profile }) {
            try {
                // Google OAuth profile has sub as the unique ID
                const userId = profile?.sub || user.id;
                
                // Use the Admin SDK to check if the user document exists and create if not
                const userRef = dbAdmin.collection("users").doc(userId);
                const doc = await userRef.get();
                
                const role = ADMIN_EMAILS.includes(user.email!) ? 'admin' : 'user';
                
                if (!doc.exists) {
                    await userRef.set({
                        email: user.email,
                        name: user.name,
                        role: role,
                        image: user.image,
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                    });
                } else {
                    // Update the user document
                    await userRef.update({
                        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                        role: role,
                    });
                }
                
                // Set role on user object
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