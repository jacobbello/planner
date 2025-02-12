'use server'

import { InferSelectModel, eq, and, desc, count} from "drizzle-orm";
import { todo } from "./schema";
import { db } from "./drizzle";

export type Todo = InferSelectModel<typeof todo>;

export async function getTodos(userId: number, offset = 0, limit = 10) {
    return db
        .select()
        .from(todo)
        .orderBy(todo.deadline)
        .offset(offset)
        .limit(limit);
        /*
        .where(and(
            eq(todo.userId, userId),
            eq(todo.done, false)
        ));*/
}

export async function getNumTodos(userId: number) {
    return db.select({count: count()})
        .from(todo)
        .then(([{count}]) => count);
}

export async function getFinishedTodos(userId: number, limit: number) {
    return db
        .select()
        .from(todo)
        .where(and(
            eq(todo.userId, userId),
            eq(todo.done, true)
        ))
        .orderBy(desc(todo.lastModified))
        .limit(limit);
}

export async function createTodo(userId: number, name: string, description: string, deadline: Date) {
    return db
        .insert(todo)
        .values({userId, name, description, deadline});
}

export async function updateTodo(id: number, name: string, description: string, deadline: Date) {
    return db
        .update(todo)
        .set({name, description, deadline})
        .where(eq(todo.id, id));
}

export async function deleteTodo(id: number) {
    return db
        .delete(todo)
        .where(eq(todo.id, id));
}