import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { Adapter, AdapterUser } from "next-auth/adapters";
import { Session } from "next-auth";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        })
    }) as Adapter,
    pages: {
        signIn: '/register',
        error: '/auth/error',
    },
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async session({
            session,
            user
        }: {
            session: Session;
            user: AdapterUser;
        }) {
            if (session.user) {
                session.user.email = user.email;
                session.user.name = user.name;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST }; 