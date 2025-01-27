import { MAP_LAYERS } from "@/config/map";
import { EdgeReturn } from "@/lib/edges";
import { hexToRGBArray } from "@/lib/utils";
import { useMapLayersStore } from "@/stores/map-layers-store";
import { Edge } from "@payload-types";
import { LineLayer } from "deck.gl";
import { red } from "tailwindcss/colors";

export function EdgesLayer(edges: EdgeReturn[] | undefined) {
  const { isEdgesLayerVisible } = useMapLayersStore();

  return new LineLayer({
    id: MAP_LAYERS.GRAPH_EDGES_LAYER_ID,
    data: edges,
    pickable: true,
    getWidth: 3,
    getSourcePosition: ({ startNode }: Edge) => [
      // @ts-expect-error - TS doesn't know that startNode is a Node
      startNode.coordinates[0],
      // @ts-expect-error - TS doesn't know that startNode is a Node
      startNode.coordinates[1],
    ],
    getTargetPosition: ({ endNode }: Edge) => [
      // @ts-expect-error - TS doesn't know that endNode is a Node
      endNode.coordinates[0],
      // @ts-expect-error - TS doesn't know that endNode is a Node
      endNode.coordinates[1],
    ],
    getColor: hexToRGBArray(red[900]),
    visible: isEdgesLayerVisible,
  });
}
