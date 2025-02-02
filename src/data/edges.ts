import "server-only";

import config from "@payload-config";
import type { Node } from "@payload-types";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

export interface EdgeReturn {
  id: string;
  startNode: Node;
  endNode: Node;
  cost?: number | null;
  type?: ("crosswalk" | "path" | "staircase") | null;
  updatedAt: string;
  createdAt: string;
}

export async function getAllEdges(): Promise<EdgeReturn[]> {
  const getCachedEdges = unstable_cache(
    async () => {
      const payload = await getPayload({ config });

      const { docs: edges } = await payload.find({
        collection: "edges",
        depth: 1,
        pagination: false,
      });

      return edges as unknown as EdgeReturn[];
    },
    ["all-edges"],
    {
      revalidate: 3600, // Cache for 1 hour
      tags: ["edges"],
    },
  );

  return getCachedEdges();
}
