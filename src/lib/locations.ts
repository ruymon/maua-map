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
      normalizedName: {
        like: normalizedQuery,
      },
    },
    limit: 5,
  });

  return locations;
}
