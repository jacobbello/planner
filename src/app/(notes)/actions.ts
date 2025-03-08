"use server"

import { auth } from "@/auth";
import { createNote, deleteNote, updateNote } from "@/lib/db/notes";
import { updateNoteSchema } from "@/lib/schemas/note";
import { protectedServerAction } from "@/lib/util/json-api";
import { zfd } from "zod-form-data"

export interface CreateNoteActionState {
    fieldErrors?: {
        text?: string[]
    }
    message?: string,
    success?: boolean,
    text?: string
}
export async function handleCreateNote(prev: CreateNoteActionState, formData: FormData): Promise<CreateNoteActionState> {
    const session = await auth();
    if (!session?.user?.id) {
        return {
            ...prev,
            success: false,
            message: "Not logged in"
        }
    }
    const text = formData.get("text") as string;
    if (!text) {
        return {
            ...prev,
            success: false,
            message: "Text is required"
        }
    }
    try {
        await createNote(session.user.id, text);
        return { success: true };
    } catch (e: any) {
        return {
            ...prev,
            success: false,
            message: e.message
        }
    }
}

export interface UpdateNoteActionState {
    fieldErrors?: any,
    message?: string,
    text: string,
    success?: boolean
}

export const handleUpdateNote = protectedServerAction<UpdateNoteActionState, FormData>(
    async (prev, formData, userId) => {
        const res = await zfd.formData(updateNoteSchema).safeParseAsync(formData);
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
    });

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

    const userId = session.user.id;
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
