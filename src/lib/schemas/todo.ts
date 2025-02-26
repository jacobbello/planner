import { z } from "zod";

export const createTodoSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    deadline: z.date()
})

export const updateTodoSchema = z.object({
    id: z.number().int().min(0),
    name: z.string().min(1),
    description: z.string().min(1),
    deadline: z.date(),
});

export const deleteTodoSchema = z.number().int().min(0);