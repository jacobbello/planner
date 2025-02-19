'use server'

import { createTodo, deleteTodo, updateTodo } from "@/lib/db/todo"

export async function handleCreateTodo(formData: FormData) {
    const userId = 1;

    await createTodo(
        userId, 
        formData.get("name") as string, 
        formData.get("description") as string,
        new Date(formData.get("deadline") as string)
    )
}

export async function handleUpdateTodo(formData: FormData) {


    await updateTodo(
        parseInt(formData.get("id") as string),
        formData.get("name") as string,
        formData.get("description") as string,
        new Date(formData.get("deadline") as string)
    )
}

export async function handleDeleteTodo(id: number) {
    await deleteTodo(id);
}