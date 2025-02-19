'use server'

import { createNote, deleteNote, updateNote } from "@/lib/db/notes";

export async function handleCreateNote(formData: FormData) {
    await createNote(1, formData.get("text") as string);
}

export async function handleUpdateNote(formData: FormData) {
    await updateNote(parseInt(formData.get("id") as string), formData.get("text") as string);
}

export async function handleDelete(id: number) {
    await deleteNote(id);
}