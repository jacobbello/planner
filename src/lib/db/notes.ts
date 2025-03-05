'use server'

import { eq, desc, InferSelectModel, count, and } from "drizzle-orm";
import { notes } from "./schema";
import { db } from "./drizzle";

export type StoredNote = InferSelectModel<typeof notes>;

export async function getNotes(userId: string, offset = 0, limit = 25) {
    return db
        .select({
            text: notes.text,
            lastModified: notes.lastModified,
            id: notes.id
        })
        .from(notes)
        .orderBy(desc(notes.lastModified))
        .limit(limit)
        .offset(offset)
        .where(eq(notes.userId, userId));
}

export async function getNotesCount(userId: string) {
    return db
        .select({ count: count() })
        .from(notes)
        .where(eq(notes.userId, userId))
        .then(([{ count }]) => count);
}

export async function getNoteById(id: number) {
    return db
        .select()
        .from(notes)
        .where(eq(notes.id, id));
}

export async function createNote(userId: string, text: string) {
    console.log('Saving note:', text);
    return db
        .insert(notes)
        .values({ userId, text });
}

export async function updateNote(id: number, text: string, userId?: string) {
    return db
        .update(notes)
        .set({ text, lastModified: new Date() })
        .where(and(eq(notes.id, id), userId ? eq(notes.userId, userId) : undefined));
}

export async function deleteNote(id: number, userId?: string) {
    return db
        .delete(notes)
        .where(and(eq(notes.id, id), userId ? eq(notes.userId, userId) : undefined));
}