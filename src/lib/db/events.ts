'use server'

import { eq, and, desc, InferSelectModel, between, count, lt, SQL, gt } from "drizzle-orm";
import { db } from "./drizzle";
import { events } from "./schema";

export type StoredEvent = InferSelectModel<typeof events>;

export async function getEvents(userId: number) {
    return db
        .select()
        .from(events)
        .where(eq(events.userId, userId));
}

export async function getEventsInRange(
    userId: number,
    range: { start?: Date, end?: Date },
    offset = 0,
    limit = 5
) {
    let conditions: SQL[] = [eq(events.userId, userId)];

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

export async function getCountInRange(userId: number, range: { start: Date, end: Date }) {
    return db.select({ count: count() })
        .from(events)
        .where(and(
            eq(events.userId, userId),
            between(events.date, range.start, range.end)
        ))
        .then(([{ count }]) => count);
}

export async function getEventsByDate(userId: number, date: Date) {
    return db
        .select()
        .from(events)
        .where(and(
            eq(events.userId, userId),
            eq(events.date, date)
        ));
}

export async function createEvent(userId: number, name: string, description: string, date: Date) {
    return db
        .insert(events)
        .values({ userId, name, description, date });
}

export async function updateEvent(id: number, name: string, description: string, date: Date) {
    return db.update(events)
        .set({name, description, date})
        .where(eq(events.id, id));
}

export async function deleteEvent(id: number) {
    return db
        .delete(events)
        .where(eq(events.id, id));
}