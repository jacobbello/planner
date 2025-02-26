import {z} from "zod"

export const signupUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordMatch: z.string().min(8)
}).refine(data => data.password == data.passwordMatch, {
    message: "Passwords must match"
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});