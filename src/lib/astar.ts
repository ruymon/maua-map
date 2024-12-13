import { Node } from "@payload-types";
import { EdgeReturn } from "./edges";

function heuristic(node: Node, goal: Node): number {
  const [x1, y1] = node.coordinates;
  const [x2, y2] = goal.coordinates;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function aStar(
  start: Node,
  goal: Node,
  edges: EdgeReturn[],
): Node[] | null {
  const openSet = new Set([start]);
  const cameFrom: Map<string, Node> = new Map();
  const gScore: Map<string, number> = new Map();
  const fScore: Map<string, number> = new Map();

  gScore.set(start.id, 0);
  fScore.set(start.id, heuristic(start, goal));

  while (openSet.size > 0) {
    const current = Array.from(openSet).reduce((a, b) =>
      (fScore.get(a.id) ?? Infinity) < (fScore.get(b.id) ?? Infinity) ? a : b,
    );

    if (current.id === goal.id) {
      const path = [];
      let currentNode: Node | undefined = current;
      while (currentNode) {
        path.unshift(currentNode);
        currentNode = cameFrom.get(currentNode.id);
      }
      return path;
    }

    openSet.delete(current);

    const neighbors = edges
      .filter(
        (e) => e.start_node.id === current.id || e.end_node.id === current.id,
      )
      .map((e) => (e.start_node.id === current.id ? e.end_node : e.start_node));

    for (const neighbor of neighbors) {
      const edge = edges.find(
        (e) =>
          (e.start_node.id === current.id && e.end_node.id === neighbor.id) ||
          (e.end_node.id === current.id && e.start_node.id === neighbor.id),
      )!;

      const tentativeGScore =
        (gScore.get(current.id) ?? Infinity) + (edge.cost ?? 1);

      if (tentativeGScore < (gScore.get(neighbor.id) ?? Infinity)) {
        cameFrom.set(neighbor.id, current);
        gScore.set(neighbor.id, tentativeGScore);
        fScore.set(neighbor.id, tentativeGScore + heuristic(neighbor, goal));
        openSet.add(neighbor);
      }
    }
  }

  return null; // No path found
}
