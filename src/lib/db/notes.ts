'use server'

import { eq, desc, InferSelectModel, count } from "drizzle-orm";
import { notes } from "./schema";
import { db } from "./drizzle";

export type StoredNote = InferSelectModel<typeof notes>;

export async function getNotes(userId: number, offset = 0, limit = 25) {
    return db
        .select()
        .from(notes)
        .orderBy(desc(notes.lastModified))
        .limit(limit)
        .offset(offset);
        //.where(eq(notes.userId, userId));
}

export async function getNotesCount(userId: number) {
    return db
        .select({count: count()})
        .from(notes)
        //.where(eq(notes.userId, userId))
        .then(([{count}]) => count);
}

export async function getNoteById(id: number) {
    return db
        .select()
        .from(notes)
        .where(eq(notes.id, id));
}

export async function createNote(userId: number, text: string) {
    console.log('Saving note:', text);
    return db
        .insert(notes)
        .values({userId: userId, text});
}

export async function updateNote(id: number, text: string) {
    return db
        .update(notes)
        .set({text, lastModified: new Date()})
        .where(eq(notes.id, id));
}

export async function deleteNote(id: number) {
    return db
        .delete(notes)
        .where(eq(notes.id, id));
}