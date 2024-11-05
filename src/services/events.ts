import { db } from "@/db";
import { eventsTable, InsertEventSchema } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getAllEvents() {
  return db.select().from(eventsTable);
}

export async function getEventById(id: string) {
  return db.select().from(eventsTable).where(eq(eventsTable.id, id));
}

export async function createEvent(event: InsertEventSchema) {
  return db.insert(eventsTable).values(event);
}
