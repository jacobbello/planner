import { boolean, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({length: 320}).notNull(),
    password: varchar({length: 64}).notNull()
});

export const notes = pgTable("notes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
    lastModified: timestamp().defaultNow().notNull(),
    text: text().notNull()
});

export const events = pgTable("events", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
    lastModified: timestamp().defaultNow().notNull(),
    date: timestamp({mode: 'date'}).defaultNow().notNull(),
    name: varchar({length: 100}).notNull(),
    description: text()
});

export const todo = pgTable("todo", {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
   lastModified: timestamp().defaultNow().notNull(),
   deadline: timestamp({mode: 'date'}).defaultNow().notNull(),
   name: varchar({length: 100}).notNull(),
   done: boolean().notNull().default(false),
   description: text()
});

