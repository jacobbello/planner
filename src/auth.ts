import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "./lib/db/user";
import bcrypt from 'bcryptjs'
import UserNotFoundError from "./lib/util/error/user_not_found";
import { z, ZodError } from "zod";
import { db } from "./lib/db/drizzle";

class CustomError extends CredentialsSignin {
    constructor(code: string) {
        super();
        this.code = code;
        this.message = code;
    }
}

const loginSchema = z.object({

    email: z.string().email(),
    password: z.string().nonempty()
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } = await loginSchema.parseAsync(credentials);
                    const user = await getUser(email);
                    const res = await bcrypt.compare(password, user.password);
                    if (res) return { email, id: user.id }
                } catch (e) {
                    if (!(e instanceof UserNotFoundError) && !(e instanceof ZodError)) {
                        throw e;
                    }
                }
                throw new CustomError("Invalid login");
            }
        }),

    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const inDashboard = nextUrl.pathname.startsWith('/dashboard');
            /*if (nextUrl.pathname.startsWith("/api") || nextUrl.pathname.startsWith("/login")) {
                return true;//!nextUrl.pathname.startsWith("/api/aut");
            }*/
            return !!auth?.user || !inDashboard;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session({ session, user }) {
            console.log(session);
            console.log(user);
            try {
                session.user.id = user?.id;
            } catch (e) {
                console.log(session);
                console.log(e);
            }
            return session;
        }
    }
})