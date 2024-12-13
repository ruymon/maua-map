import { MAP_LAYERS } from "@/config/map";
import { EdgeReturn } from "@/lib/edges";
import { hexToRGBArray } from "@/lib/utils";
import { Edge } from "@payload-types";
import { LineLayer } from "deck.gl";
import { red } from "tailwindcss/colors";

export function EdgesLayer(edges: EdgeReturn[] | undefined) {
  return new LineLayer({
    id: MAP_LAYERS.GRAPH_EDGES_LAYER_ID,
    data: edges,
    pickable: true,
    getWidth: 3,
    getSourcePosition: ({ start_node }: Edge) => [
      // @ts-expect-error - TS doesn't know that start_node is a Node
      start_node.coordinates[0],
      // @ts-expect-error - TS doesn't know that start_node is a Node
      start_node.coordinates[1],
    ],
    getTargetPosition: ({ end_node }: Edge) => [
      // @ts-expect-error - TS doesn't know that end_node is a Node
      end_node.coordinates[0],
      // @ts-expect-error - TS doesn't know that end_node is a Node
      end_node.coordinates[1],
    ],
    getColor: hexToRGBArray(red[900]),
  });
}
