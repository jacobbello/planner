'use server'

import { createTodo, deleteTodo, updateTodo } from "@/lib/db/todo"
import { createTodoSchema, updateTodoSchema } from "@/lib/schemas/todo";
import { zfd } from "zod-form-data";

const createSchema = zfd.formData(createTodoSchema);
export async function handleCreateTodo(formData: FormData) {
    const res = createSchema.safeParse(formData);
    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors
        }
    }

    const userId = 1;

    await createTodo(
        userId, 
        res.data.name, 
        res.data.description,
        res.data.deadline
    );
}

const updateSchema = zfd.formData(updateTodoSchema);
export async function handleUpdateTodo(formData: FormData) {
    const res = updateSchema.safeParse(formData);

    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors
        }
    }

    await updateTodo(
        res.data.id,
        res.data.name,
        res.data.description,
        res.data.deadline
    )
}

export async function handleDeleteTodo(id: number) {
    await deleteTodo(id);
}