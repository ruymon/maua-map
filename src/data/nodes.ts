import "server-only";

import config from "@payload-config";
import { Node } from "@payload-types";
import { sql } from "@payloadcms/db-postgres";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

export async function getAllNodes(): Promise<Node[]> {
  const getCachedNodes = unstable_cache(
    async () => {
      const payload = await getPayload({ config });

      const { docs: nodes } = await payload.find({
        collection: "nodes",
        depth: 1,
        pagination: false,
      });

      return nodes;
    },
    ["all-nodes"],
    {
      revalidate: 3600, // Cache for 1 hour
      tags: ["nodes"],
    },
  );
  return getCachedNodes();
}

type DbNode = {
  id: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
};

export async function findNearestNode(
  coordinates: [number, number],
): Promise<Node> {
  const payload = await getPayload({ config });
  const query = sql`
    SELECT id, ST_Y(coordinates) as latitude, ST_X(coordinates) as longitude, created_at, updated_at 
    FROM nodes 
    ORDER BY coordinates <-> ST_SetSRID(ST_MakePoint(${coordinates[0]}, ${coordinates[1]}), 4326) 
    LIMIT 1
  `;

  const result = await payload.db.drizzle.execute(query);
  const dbNode = result.rows[0] as DbNode;

  return {
    id: dbNode.id,
    coordinates: [dbNode.longitude, dbNode.latitude],
    createdAt: dbNode.created_at,
    updatedAt: dbNode.updated_at,
  };
}
