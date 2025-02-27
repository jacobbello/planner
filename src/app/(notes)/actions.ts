'use server'

import { auth } from "@/auth";
import { createNote, deleteNote, updateNote } from "@/lib/db/notes";
import { createNoteSchema, updateNoteSchema } from "@/lib/schemas/note";
import { zfd } from "zod-form-data"

export async function handleCreateNote(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return {
            errors: {
                auth: "Not logged in"
            }
        }
    }

    const userId = parseInt(session.user.id);
    const res = zfd.formData(createNoteSchema).safeParse(formData);

    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors
        }
    }
    await createNote(userId, res.data);
    return {}
}

export async function handleUpdateNote(formData: FormData) {
    // Add auth check here AI!
    const res = zfd.formData(updateNoteSchema).safeParse(formData);
    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors
        }
    }
    await updateNote(res.data.id, res.data.text);
}

export async function handleDelete(id: number) {
    const session = await auth();
    if (!session?.user?.id) {
        return {
            errors: {
                auth: "Not logged in"
            }
        }
    }

    const userId = parseInt(session.user.id);
    await deleteNote(id, userId);
}
