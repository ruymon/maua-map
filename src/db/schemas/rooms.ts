import { pgTable, point, text, uuid } from "drizzle-orm/pg-core";

export const roomsTable = pgTable("rooms", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  code: text().notNull(),
  building: text().notNull(),
  floor: text().notNull(),
  coordinates: point().notNull(),
});
