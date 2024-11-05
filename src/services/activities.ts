import { db } from "@/db";
import { eventActivitiesTable, InsertEventActivity } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getActivityById(id: string) {
  return db
    .select()
    .from(eventActivitiesTable)
    .where(eq(eventActivitiesTable.id, id));
}

export async function getActivitiesByEventId(eventId: string) {
  return db
    .select()
    .from(eventActivitiesTable)
    .where(eq(eventActivitiesTable.eventId, eventId));
}

export async function createActivity(activity: InsertEventActivity) {
  return db.insert(eventActivitiesTable).values(activity);
}
