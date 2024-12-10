import { MAP_LAYERS } from "@/config/map";
import { Edge } from "@payload-types";
import { LineLayer } from "deck.gl";

export function EdgesLayer(edges: Edge[] | undefined) {
  return new LineLayer({
    id: MAP_LAYERS.GRAPH_EDGES_LAYER_ID,
    data: edges,
    pickable: true,
    getWidth: 2,
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
    // getColor: (d: Edge) => d.id === selectedEdge?.id ? [255, 0, 0] : [136, 136, 136],
    getColor: [136, 136, 136],
    // onClick: (info) => {
    //   if (info.object) {
    //     setSelectedEdge(info.object as Edge);
    //   }
    // }
  });
}
