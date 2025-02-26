'use server'
import { signIn } from "@/auth";
import { createUser, login } from "@/lib/db/user";
import { loginUserSchema, signupUserSchema } from "@/lib/schemas/user";
import { zfd } from "zod-form-data"


const loginSchema = zfd.formData(loginUserSchema)
export async function handleLogin(data: FormData) {
    const res = await loginSchema.safeParseAsync(data);

    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors
        }
    }

    try {
        let user = await login(res.data.email, res.data.password);
        return { user };
    } catch (e) {
        return {
            errors: [e]
        }
    }
}

type SignupState = {
    errors?: {
        email?: string;
        password?: string;
        passwordMatch?: string;
        server?: string;
    },
    email?: string
}
export async function handleSignup(prevState: SignupState, data: FormData) {
    const res = await signupUserSchema.safeParseAsync({
        email: data.get("email") as string,
        password: data.get("password") as string,
        passwordMatch: data.get("passwordMatch") as string
    });

    console.log("Success: " + res.success + " errors: " + JSON.stringify(res.error?.flatten().fieldErrors));
    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors
        } as SignupState;
    }
    try {
        await createUser(res.data.email, res.data.password);
        await signIn("credentials", data);
        return {}
    } catch (e: any) {
        return { errors: { server: e.message as string } }
    }
}