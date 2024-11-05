import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as z from "zod";
import { eventsTable } from "./events";
import { roomsTable } from "./rooms";

export const eventActivitiesTable = pgTable("event_activities", {
  id: uuid().defaultRandom().primaryKey(),
  eventId: uuid().references(() => eventsTable.id),
  name: text().notNull(),
  description: text().notNull(),
  startTime: timestamp().notNull(),
  endTime: timestamp().notNull(),
  roomId: uuid().references(() => roomsTable.id),
});

export const insertEventActivitiesSchema =
  createInsertSchema(eventActivitiesTable);
export type InsertEventActivity = z.infer<typeof insertEventActivitiesSchema>;

export const selectEventActivitiesSchema =
  createSelectSchema(eventActivitiesTable);
export type SelectEventActivity = z.infer<typeof selectEventActivitiesSchema>;
