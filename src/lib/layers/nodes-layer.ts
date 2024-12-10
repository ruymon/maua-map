import { Node } from "@payload-types";
import { ScatterplotLayer } from "deck.gl";
import { amber } from "tailwindcss/colors";
import { hexToRGBArray } from "../utils";

export function NodesLayer(nodes: Node[] | undefined) {
  return new ScatterplotLayer({
    id: "nodes_layer",
    data: nodes,
    pickable: true,
    stroked: true,
    filled: true,
    getRadius: 2,
    getPosition: (d: Node) => [d.coordinates[0], d.coordinates[1]],
    getFillColor: hexToRGBArray(amber[900]),
    getLineColor: hexToRGBArray(amber[500]),
  });
}
