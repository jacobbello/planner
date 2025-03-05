'use server'

import { eq, InferSelectModel } from "drizzle-orm";
import { db } from "./drizzle";
import { users } from "./schema";
import bcrypt from "bcryptjs"
import UserNotFoundError from "../util/error/user_not_found";

export type User = InferSelectModel<typeof users>;

export async function getUser(email: string) {
    return db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .then(rows => {
            if (rows.length != 1) throw new UserNotFoundError(email);
            return rows[0];
        });
}

export async function login(email: string, password: string) {
    const user = await getUser(email);
    const res = await bcrypt.compare(password, user.password);
    return res ? {id: user.id} : null;
}

export async function createUser(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    return db
        .insert(users)
        .values({ email, password: hashed })
}