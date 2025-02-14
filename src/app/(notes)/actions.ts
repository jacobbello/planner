'use server'

import { createNote, deleteNote, updateNote } from "@/lib/db/notes";
import { revalidatePath } from "next/cache";

export async function handleCreateNote(formData: FormData) {
    const body = {
        text: formData.get('text') as string
    }
    const res = await fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify(body)
    });

    revalidatePath('/api/notes/');

    //await createNote(1, formData.get("text") as string);
}

export async function handleUpdateNote(formData: FormData) {
    const body = {
        text: formData.get('text') as string
    }

    const res = await fetch('/api/notes/' + parseInt(formData.get('id') as string), {
        body: JSON.stringify(body),
        method: 'PUT'
    });


    revalidatePath('/api/notes/');
    //await updateNote(parseInt(formData.get("id") as string), formData.get("text") as string);
}

export async function handleDelete(id: number) {
    const res = await fetch('/api/notes/' + id, {
        method: 'DELETE'
    });

    revalidatePath('/api/notes/')
    //await deleteNote(id);
}