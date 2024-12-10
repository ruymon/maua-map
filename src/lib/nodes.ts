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
