'use server'
import { auth } from "@/auth";
import { createEvent, deleteEvent, updateEvent } from "@/lib/db/events";
import { createEventSchema, updateEventSchema } from "@/lib/schemas/events";
import { zfd } from "zod-form-data";

const createSchema = zfd.formData(createEventSchema);
export type CreateEventActionState = {
    name?: string,
    description?: string,
    date?: string,
    fieldErrors: {
        name?: string[],
        description?: string[],
        date?: string[]
    },
    success?: boolean,
    message?: string
}
export async function handleCreateEvent(prev: CreateEventActionState, data: FormData): Promise<CreateEventActionState> {
    const session = await auth();
    if (!session?.user?.id) return { ...prev, success: false, message: "Not logged in" };
    const userId = session.user.id;
    const res = createSchema.safeParse(data);

    if (!res.success) {
        return {
            ...prev,
            fieldErrors: res.error.flatten().fieldErrors as any,
            success: false
        }
    }

    try {
        await createEvent(userId, res.data.name, res.data.description, new Date(res.data.date));
    } catch (e: any) {
        return { ...prev, message: e.message, success: false }
    }
    return { ...prev, success: true };
}

const updateSchema = zfd.formData(updateEventSchema);
export async function handleUpdateEvent(data: FormData) {
    const res = updateSchema.safeParse(data);
    if (!res.success) {
        return {
            errors: res.error.flatten().formErrors
        }
    }

    updateEvent(res.data.id, res.data.name, res.data.description, new Date(res.data.date))
}

export async function handleDelete(id: number) {
    deleteEvent(id);
}