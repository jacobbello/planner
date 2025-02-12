'use server'

import { eq, InferSelectModel } from "drizzle-orm";
import { db } from "./drizzle";
import { users } from "./schema";

export type User = InferSelectModel<typeof users>;

export async function getUser(email: string) {
    return db
        .select()
        .from(users)
        .where(eq(users.email, email));
}

export async function createUser(email: string, password: string) {
    return db
        .insert(users)
        .values({email, password})
}