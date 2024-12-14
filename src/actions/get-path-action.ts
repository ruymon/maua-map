"use server";

import { aStar } from "@/lib/astar";
import { getAllEdges } from "@/lib/edges";
import { findNearestNode } from "@/lib/nodes";

export async function getPathAction(
  startCoordinates: [number, number],
  endCoordinates: [number, number],
) {
  if (
    isNaN(startCoordinates[0]) ||
    isNaN(startCoordinates[1]) ||
    isNaN(endCoordinates[0]) ||
    isNaN(endCoordinates[1])
  ) {
    throw new Error("Invalid coordinates provided");
  }

  try {
    const edges = await getAllEdges();

    const startNode = await findNearestNode(startCoordinates);
    const endNode = await findNearestNode(endCoordinates);

    const path = aStar(startNode, endNode, edges);

    if (!path) {
      throw new Error("No path found");
    }

    return path;
  } catch (error) {
    console.error("Error in path finding:", error);
    throw new Error("Internal server error");
  }
}
