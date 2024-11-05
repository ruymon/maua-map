import { db } from "@/db";
import { eventsTable, eventActivitiesTable, InsertEvent, InsertEventActivity } from "@/db/schema";
import {eq} from "drizzle-orm";

export async function getAllEvents() {
  return db.select().from(eventsTable);
}

export async function getEventById(id: string) {
  return db.select().from(eventsTable).where(eq(eventsTable.id, id)); // Use `.equals`
}

export async function createEvent(event: InsertEvent) {
  return db.insert(eventsTable).values(event);
}

export async function getAllActivities() {
  return db.select().from(eventActivitiesTable);
}

export async function getActivityById(id: string) {
  return db.select().from(eventActivitiesTable).where(eq(eventActivitiesTable.id, id));
}

export async function getActivitiesByEventId(eventId: string) {
  return db.select().from(eventActivitiesTable).where(eq(eventActivitiesTable.eventId, eventId));
}

export async function createActivity(activity: InsertEventActivity) {
  return db.insert(eventActivitiesTable).values(activity);
}
