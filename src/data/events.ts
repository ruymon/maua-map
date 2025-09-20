import "server-only";

import config from "@payload-config";
import { Event } from "@payload-types";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

export async function getAllEvents(): Promise<Event[]> {
  const getCachedEvents = unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      const now = new Date().toISOString();

      const { docs: events } = await payload.find({
        collection: "events",
        depth: 1,
        where: {
          startTime: { greater_than_equal: now },
          or: [
            {
              startTime: { greater_than_equal: now },
            },
            {
              and: [
                { startTime: { less_than_equal: now } },
                { endTime: { greater_than_equal: now } },
              ],
            },
          ],
        },
        sort: "-startTime",
      });

      return events;
    },
    ["events"],
    {
      revalidate: 3600,
      tags: ["events"],
    },
  );

  return getCachedEvents();
}

export async function getEventById(eventId: string): Promise<Event | null> {
  const getCachedEvent = unstable_cache(
    async (id: string) => {
      const payload = await getPayload({ config });

      const event = await payload.findByID({
        collection: "events",
        id,
        disableErrors: true,
      });

      return event;
    },
    [`event-${eventId}`],
    {
      revalidate: 3600, // Cache for 1 hour
      tags: [`event-${eventId}`, "events"],
    },
  );

  return getCachedEvent(eventId);
}
