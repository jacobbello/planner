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

export interface UpdateNoteActionState {
    fieldErrors?: any,
    message?: string,
    text: string,
    success?: boolean
}
export async function handleUpdateNote(prev: UpdateNoteActionState, formData: FormData):
    Promise<UpdateNoteActionState> {
    const session = await auth();
    if (!session?.user?.id) {
        return {
            ...prev,
            success: false,
            message: "Not logged in"
        }
    }

    const userId = parseInt(session.user.id);

    const res = zfd.formData(updateNoteSchema).safeParse(formData);
    if (!res.success) {
        return {
            ...prev,
            fieldErrors: res.error.flatten().fieldErrors,
            success: false
        }
    }
    try {
        await updateNote(res.data.id, res.data.text, userId);
    } catch (e: any) {
        return {
            ...prev,
            text: res.data.text,
            success: false,
            message: e.message
        }
    }
    return { ...prev, text: res.data.text, success: true };
}

export interface DeleteNoteActionState {
    success?: boolean,
    errors?: {
        auth?: string,
        delete?: string
    }
}
export async function handleDelete(id: number, prev: DeleteNoteActionState) {
    const session = await auth();
    if (!session?.user?.id) {
        return {
            success: false,
            errors: {
                auth: "Not logged in"
            }
        }
    }

    const userId = parseInt(session.user.id);
    try {
        await deleteNote(id, userId);
    } catch (e: any) {
        return {
            success: false,
            errors: {
                delete: e.message
            }
        }
    }
    return {
        success: true
    };
}
