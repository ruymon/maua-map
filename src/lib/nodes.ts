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
  coordinates: [number, number],
): Promise<Node> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "nodes",
    where: {
      coordinates: {
        near: `${coordinates[0]},${coordinates[1]},10,null`,
      },
    },
    // limit: 1,
  });
  console.log("Nearest Node", docs);
  const nearestNode = docs[0];

  return nearestNode;
}
