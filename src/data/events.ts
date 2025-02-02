import "server-only";

import config from "@payload-config";
import { Event } from "@payload-types";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

export async function getAllEvents(): Promise<Event[]> {
  const getCachedEvents = unstable_cache(
    async () => {
      const payload = await getPayload({ config });

      const { docs: events } = await payload.find({
        collection: "events",
        depth: 1,
      });

      return events;
    },
    ["events"],
    {
      revalidate: 3600, // Cache for 1 hour
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
    [`location-${eventId}`],
    {
      revalidate: 3600, // Cache for 1 hour
      tags: [`location-${eventId}`],
    },
  );

  return getCachedEvent(eventId);
}
