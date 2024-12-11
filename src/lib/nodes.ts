import config from "@payload-config";
import { Node } from "@payload-types";
import { getPayload } from "payload";

export async function getAllNodes(): Promise<Node[]> {
  const payload = await getPayload({ config });

  const { docs: nodes } = await payload.find({
    collection: "nodes",
    depth: 1,
    pagination: false,
  });

  return nodes;
}

export async function findNearestNode(
  longitude: number,
  latitude: number,
): Promise<Node> {
  const payload = await getPayload({ config });
  const maxDistance = 1 * 1000; // 1 kilometer
  const { docs: nearestNode } = await payload.find({
    collection: "nodes",
    where: {
      coordinates: {
        near: `${longitude},${latitude},${maxDistance}`,
      },
    },
    limit: 1,
  });

  return nearestNode[0];
}
