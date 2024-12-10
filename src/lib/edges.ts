import config from "@payload-config";
import { Edge } from "@payload-types";
import { getPayload } from "payload";

export async function getAllEdges(): Promise<Edge[]> {
  const payload = await getPayload({ config });

  const { docs: edges } = await payload.find({
    collection: "edges",
    depth: 1,
    pagination: false,
  });

  return edges;
}
