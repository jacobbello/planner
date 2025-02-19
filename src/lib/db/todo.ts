'use server'

import { InferSelectModel, eq, and, desc, count } from "drizzle-orm";
import { todo } from "./schema";
import { db } from "./drizzle";

export type Todo = InferSelectModel<typeof todo>;

export async function getTodos(userId: number, excludeDone = false, offset = 0, limit = 10) {
    return db
        .select()
        .from(todo)
        .orderBy(todo.done, todo.deadline)
        .offset(offset)
        .limit(limit)
        .where(and(
            eq(todo.userId, userId),
            excludeDone ? eq(todo.done, false) : undefined
        ));
}

export async function getTodoCount(userId: number, excludeDone=false) {
    return db.select({ count: count() })
        .from(todo)
        .where(and(
            eq(todo.userId, userId),
            excludeDone ? eq(todo.done, false) : undefined
        )).then(([{ count }]) => count);
}

export async function createTodo(userId: number, name: string, description: string, deadline: Date) {
    return db
        .insert(todo)
        .values({ userId, name, description, deadline });
}

export async function updateTodo(id: number, name: string, description: string, deadline: Date) {
    return db
        .update(todo)
        .set({ name, description, deadline })
        .where(eq(todo.id, id));
}

export async function deleteTodo(id: number) {
    return db
        .delete(todo)
        .where(eq(todo.id, id));
}