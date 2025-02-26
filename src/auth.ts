import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "./lib/db/user";
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials: any, req) => {
                let user = await getUser(credentials?.email);
                
                const res = await bcrypt.compare(credentials.password, user.password);

                return res ? {id: user.id.toString()} : null;
            }
        }),
        
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const inDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (!auth?.user) {
                // Not logged in
                return inDashboard;
            } else if (!inDashboard) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }
            return true;
        }
    }
})