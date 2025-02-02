import "server-only";

import config from "@payload-config";
import { Location } from "@payload-types";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

export async function getLocationById(
  locationId: string,
): Promise<Location | null> {
  const getCachedLocation = unstable_cache(
    async (id: string) => {
      const payload = await getPayload({ config });
      const location = await payload.findByID({
        collection: "locations",
        id,
        disableErrors: true,
      });
      return location;
    },
    [`location-${locationId}`],
    {
      revalidate: 3600, // Cache for 1 hour
      tags: [`location-${locationId}`],
    },
  );

  return getCachedLocation(locationId);
}
