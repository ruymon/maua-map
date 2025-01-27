import config from "@payload-config";
import { Node } from "@payload-types";
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
  const payload = await getPayload({ config });

  const { docs: edges } = await payload.find({
    collection: "edges",
    depth: 1,
    pagination: false,
  });

  return edges as unknown as EdgeReturn[]; // Todo: Fix this.
}
