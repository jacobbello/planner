import { z } from "zod";


export const createNoteSchema = z.string();
export const updateNoteSchema = z.object({
    text: z.string().min(1),
    id: z.number().int().gte(0)
});
export const deleteNoteSchema = z.number().int().gte(0);