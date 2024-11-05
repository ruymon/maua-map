import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as z from "zod";

export const eventsTable = pgTable("events", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  startTime: timestamp().notNull(),
  endTime: timestamp().notNull(),
  bannerUrl: text().notNull(),
});

export const insertEventSchema = createInsertSchema(eventsTable);
export type InsertEventSchema = z.infer<typeof insertEventSchema>;

export const selectEventSchema = createSelectSchema(eventsTable);
export type SelectEventSchema = z.infer<typeof selectEventSchema>;
