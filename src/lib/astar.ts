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
  nodes: Node[],
  edges: EdgeReturn[],
): Node[] | null {
  const openSet = new Set([start.id]);
  const cameFrom: Record<string, string> = {};
  const gScore: Record<string, number> = { [start.id]: 0 };
  const fScore: Record<string, number> = { [start.id]: heuristic(start, goal) };

  while (openSet.size > 0) {
    const current = Array.from(openSet).reduce((a, b) =>
      fScore[a] < fScore[b] ? a : b,
    );

    if (current === goal.id) {
      const path = [];
      let currentId = current;
      while (currentId in cameFrom) {
        path.unshift(nodes.find((n) => n.id === currentId)!);
        currentId = cameFrom[currentId];
      }
      path.unshift(start);
      return path;
    }

    openSet.delete(current);

    const neighbors = edges
      .filter((e) => e.start_node.id === current || e.end_node.id === current)
      .map((e) => (e.start_node.id === current ? e.end_node : e.start_node));

    for (const neighbor of neighbors) {
      const edge = edges.find(
        (e) =>
          (e.start_node.id === current && e.end_node.id === neighbor.id) ||
          (e.end_node.id === current && e.start_node.id === neighbor.id),
      )!;

      const tentativeGScore = gScore[current] + (edge.cost ?? 1);

      if (tentativeGScore < (gScore[neighbor.id] ?? Infinity)) {
        cameFrom[neighbor.id] = current;
        gScore[neighbor.id] = tentativeGScore;
        fScore[neighbor.id] = gScore[neighbor.id] + heuristic(neighbor, goal);
        openSet.add(neighbor.id);
      }
    }
  }

  return null; // No path found
}
