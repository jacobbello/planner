import { createEvent, deleteEvent, updateEvent } from "@/lib/db/events";
import { createEventSchema, updateEventSchema } from "@/lib/schemas/events";
import { zfd } from "zod-form-data";

const createSchema = zfd.formData(createEventSchema);
export async function handleCreateEvent(userId: number, data: FormData) {
    const res = createSchema.safeParse(data);

    if (!res.success) {
        return {
            errors: res.error.flatten().formErrors
        }
    }

    createEvent(userId, res.data.name, res.data.description, new Date(res.data.date));
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