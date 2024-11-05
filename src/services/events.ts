import { db } from "@/db";
import {eventsTable, InsertEvent} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllEvents() {
    return db.select().from(eventsTable);
}

export async function getEventById(id: string) {
    return db.select().from(eventsTable).where(eq(eventsTable.id, id)); // Use `.equals`
}

export async function createEvent(event: InsertEvent) {
    return db.insert(eventsTable).values(event);
}
