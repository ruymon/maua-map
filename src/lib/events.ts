import {db} from "@/db";
import {eventsTable} from "@/db/schema";

export async function getAllEvents() {
    return db.select().from(eventsTable);
}

