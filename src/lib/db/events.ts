'use server'

import { eq, and, desc, InferSelectModel, between, count, lt, SQL, gt } from "drizzle-orm";
import { db } from "./drizzle";
import { events } from "./schema";

export type StoredEvent = InferSelectModel<typeof events>;

export async function getEvents(userId: string) {
    return db
        .select()
        .from(events)
        .where(eq(events.userId, userId));
}

export async function getEventsInRange(
    userId: string,
    range: { start?: Date, end?: Date },
    offset = 0,
    limit = 5
) {
    const conditions: SQL[] = [eq(events.userId, userId)];

    if (range.end !== undefined)
        conditions.push(lt(events.date, range.end));

    if (range.start !== undefined)
        conditions.push(gt(events.date, range.start));


    return db
        .select()
        .from(events)
        .orderBy(desc(events.date))
        .offset(offset)
        .limit(limit)
        .where(and(...conditions));
}

export async function getCountInRange(userId: string, range: { start: Date, end: Date }) {
    return db.select({ count: count() })
        .from(events)
        .where(and(
            eq(events.userId, userId),
            between(events.date, range.start, range.end)
        ))
        .then(([{ count }]) => count);
}

export async function createEvent(userId: string, name: string, description: string, date: Date) {
    return db
        .insert(events)
        .values({ userId, name, description, date });
}

export async function updateEvent(
    id: number, name: string, description: string, date: Date, userId?: string
) {
    return db.update(events)
        .set({ name, description, date })
        .where(and(eq(events.id, id), userId ? eq(events.userId, userId) : undefined));
}

export async function deleteEvent(id: number, userId?: string) {
    return db
        .delete(events)
        .where(and(eq(events.id, id), userId ? eq(events.userId, userId) : undefined));
}