import { MAP_LAYERS } from "@/config/map";
import { Node } from "@payload-types";
import { ScatterplotLayer } from "deck.gl";
import { amber } from "tailwindcss/colors";
import { hexToRGBArray } from "../../utils";

export function NodesLayer(nodes: Node[] | undefined) {
  return new ScatterplotLayer({
    id: MAP_LAYERS.GRAPH_NODES_LAYER_ID,
    data: nodes,
    pickable: true,
    stroked: true,
    filled: true,
    getRadius: 1,
    getLineWidth: 0.25,
    getPosition: (d: Node) => [d.coordinates[0], d.coordinates[1]],
    getFillColor: hexToRGBArray(amber[900]),
    getLineColor: hexToRGBArray(amber[500]),
  });
}
