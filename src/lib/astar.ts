import config from "@payload-config";
import { Node } from "@payload-types";
import { getPayload } from "payload";

export function heuristic(a: Node, b: Node): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((b.coordinates[1] - a.coordinates[1]) * Math.PI) / 180;
  const dLon = ((b.coordinates[0] - a.coordinates[0]) * Math.PI) / 180;
  const lat1 = (a.coordinates[1] * Math.PI) / 180;
  const lat2 = (b.coordinates[1] * Math.PI) / 180;

  const x = dLon * Math.cos((lat1 + lat2) / 2);
  const y = dLat;
  return Math.sqrt(x * x + y * y) * R * 1000; // Convert to meters
}

export async function findNearestNode(): Promise<Node[]> {
  /**
   * @minItems 2
   * @maxItems 2
   */
  // coordinates: [number, number],
  const payload = await getPayload({ config });
  // const { docs: nearestNode } = await payload.find({
  //   collection: "nodes",
  //   where: {
  //     node: {

  //     }
  //     coordinates: {
  //       near: [-46.5732985581337, -23.6490819666266, 0.1],
  //     },
  //   },
  // });

  const { docs: nearestNode } = await payload.find({
    collection: "nodes",
    where: {
      point: {
        near: {
          type: "point",
          coordinates: [-46.5732985581337, -23.6490819666266],
        },
      },
    },
  });

  return nearestNode;
}

// export async function findPath(
//   startLat: number,
//   startLon: number,
//   endLat: number,
//   endLon: number,
// ): Promise<Node[]> {
//   try {
//     const [start, end] = await Promise.all([
//       findNearestNode(startLat, startLon),
//       findNearestNode(endLat, endLon),
//     ]);

//     // Get all nodes and edges
//     const nodesResult = await pool.query<Node>(
//       "SELECT id, ST_Y(geom) as lat, ST_X(geom) as lon FROM nodes",
//     );
//     const edgesResult = await pool.query<Edge>(
//       "SELECT id, start_node_id, end_node_id, cost FROM edges",
//     );

//     const nodes = nodesResult.rows;
//     const edges = edgesResult.rows;

//     // Create a map of node connections
//     const nodeConnections: Record<number, { id: number; cost: number }[]> = {};
//     edges.forEach((edge) => {
//       if (!nodeConnections[edge.start_node_id])
//         nodeConnections[edge.start_node_id] = [];
//       if (!nodeConnections[edge.end_node_id])
//         nodeConnections[edge.end_node_id] = [];
//       nodeConnections[edge.start_node_id].push({
//         id: edge.end_node_id,
//         cost: edge.cost,
//       });
//       nodeConnections[edge.end_node_id].push({
//         id: edge.start_node_id,
//         cost: edge.cost,
//       });
//     });

//     // A* algorithm implementation
//     const openSet = new Set([start.id]);
//     const cameFrom: Record<number, number> = {};
//     const gScore: Record<number, number> = { [start.id]: 0 };
//     const fScore: Record<number, number> = {
//       [start.id]: heuristic(start, end),
//     };

//     while (openSet.size > 0) {
//       let current = Array.from(openSet).reduce((a, b) =>
//         fScore[a] < fScore[b] ? a : b,
//       );

//       if (current === end.id) {
//         // Reconstruct path
//         const path = [current];
//         while (current in cameFrom) {
//           current = cameFrom[current];
//           path.unshift(current);
//         }
//         return path.map((id) => nodes.find((n) => n.id === id)!);
//       }

//       openSet.delete(current);

//       for (const neighbor of nodeConnections[current] || []) {
//         const tentativeGScore = gScore[current] + neighbor.cost;

//         if (!(neighbor.id in gScore) || tentativeGScore < gScore[neighbor.id]) {
//           cameFrom[neighbor.id] = current;
//           gScore[neighbor.id] = tentativeGScore;
//           fScore[neighbor.id] =
//             gScore[neighbor.id] +
//             heuristic(nodes.find((n) => n.id === neighbor.id)!, end);
//           openSet.add(neighbor.id);
//         }
//       }
//     }

//     // No path found
//     return [];
//   } catch (error) {
//     console.error("Error in findPath:", error);
//     throw error;
//   }
// }

// export async function getAllNodes(): Promise<Node[]> {
//   try {
//     const result = await pool.query<Node>(
//       "SELECT id, ST_Y(geom) as lat, ST_X(geom) as lon FROM nodes",
//     );
//     return result.rows;
//   } catch (error) {
//     console.error("Error in getAllNodes:", error);
//     throw error;
//   }
// }

// export async function getAllEdges(): Promise<Edge[]> {
//   try {
//     const result = await pool.query<Edge>(`
//       SELECT e.id, e.start_node_id, e.end_node_id, e.cost,
//              ST_Y(n1.geom) as start_lat, ST_X(n1.geom) as start_lon,
//              ST_Y(n2.geom) as end_lat, ST_X(n2.geom) as end_lon
//       FROM edges e
//       JOIN nodes n1 ON e.start_node_id = n1.id
//       JOIN nodes n2 ON e.end_node_id = n2.id
//     `);
//     return result.rows;
//   } catch (error) {
//     console.error("Error in getAllEdges:", error);
//     throw error;
//   }
// }
