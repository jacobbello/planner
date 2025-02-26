import { z } from "zod";

export const createEventSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    date: z.string().datetime()
});

export const updateEventSchema = z.object({
    id: z.number().int().min(0),
    name: z.string().min(1),
    description: z.string().min(1),
    date: z.string().datetime()
})

export const deleteEventSchema = z.number().int().min(0);