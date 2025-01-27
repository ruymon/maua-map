"use server";

import config from "@payload-config";
import { Location } from "@payload-types";
import { getPayload } from "payload";
import removeAccents from "remove-accents";

export async function getFirstFiveLocationsBasedOnQuery(
  query: string,
): Promise<Location[]> {
  const payload = await getPayload({ config });
  const normalizedQuery = removeAccents(query).toLowerCase();

  const { docs: locations } = await payload.find({
    collection: "locations",
    depth: 1,
    pagination: false,
    where: {
      or: [
        { normalizedName: { like: normalizedQuery } },
        { code: { like: query } }, // Keep roomCode as it is since it might not need accent normalization
      ],
    },
    limit: 5,
  });

  return locations;
}
