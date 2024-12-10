// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { DECK_GL_TOOLTIP_STYLE_OVERRIDE, MAP_LAYERS } from "@/config/map";
import { Edge, Node } from "@payload-types";
import { PickingInfo } from "deck.gl";

export const NodeLayerToolTip = (node: Node) => {
  return {
    html: `
      <div class="flex flex-col border bg-primary animate-in text-primary-foreground gap-1 rounded-md py-2 px-3">
      <span class="text-xs font-bold uppercase">nó</span>
        <span class="text-sm font-semibold">${node.id}</span>
        <span class="text-2xs text-muted-foreground">${node.coordinates}</span>
      </div>
    `,
    style: DECK_GL_TOOLTIP_STYLE_OVERRIDE,
  };
};

export const EdgeLayerToolTip = (edge: Edge) => {
  return {
    html: `
      <div class="flex flex-col border bg-primary animate-in text-primary-foreground gap-4 rounded-md py-2 px-3">
      <span class="text-xs font-bold uppercase">vértice</span>
        <span class="text-sm font-semibold">${edge.id}</span>

        <div class="flex flex-col gap-1">
          <span>Nó de início:</span>
          <span>${edge.start_node.id}</span>
          <span class="text-2xs text-muted-foreground">${edge.start_node.coordinates}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span>Nó de fim:</span>
          <span>${edge.end_node.id}</span>
          <span class="text-2xs text-muted-foreground">${edge.end_node.coordinates}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span>Custo da aresta</span>
          <span class="text-2xs text-muted-foreground">${edge.cost}</span>
        </div>
      </div>
    `,
    style: DECK_GL_TOOLTIP_STYLE_OVERRIDE,
  };
};

export const getTooltipContentBasedOnLayer = ({
  layer,
  object,
}: PickingInfo) => {
  if (!layer || !object) return null;

  if (layer.id === MAP_LAYERS.GRAPH_NODES_LAYER_ID) {
    return NodeLayerToolTip(object);
  }

  if (layer.id === MAP_LAYERS.GRAPH_EDGES_LAYER_ID) {
    return EdgeLayerToolTip(object);
  }

  return null;
};
