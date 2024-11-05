import {text, pgTable, timestamp, uuid, varchar} from 'drizzle-orm/pg-core';

export const eventsTable = pgTable('events_table', {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 75 }).notNull(),
    description: varchar().notNull(),
    eventStartTime: timestamp().notNull(),
    eventEndTime: timestamp().notNull(),
    bannerUrl: text().notNull()
});

export const eventActivitiesTable = pgTable('event_activities_table', {
    id: uuid().defaultRandom().primaryKey(),
    eventId: uuid().references(() => eventsTable.id),
    name: varchar({ length: 75 }).notNull(),
    description: varchar().notNull(),
    schedule: timestamp().array().notNull(),
    roomCode: varchar({length: 25}).notNull(),
    iconUrl: text()
});


export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;

export type InsertEventActivity = typeof eventActivitiesTable.$inferInsert;
export type SelectEventActivity = typeof eventActivitiesTable.$inferSelect;
