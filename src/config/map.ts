import { ResolvedTheme } from "@/types/themes";
import { MapViewState } from "deck.gl";

export const MAPBOX_ACCESS_TOKEN = process.env
  .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export const MAP_STYLES: { [key in ResolvedTheme]: string } = {
  light: "mapbox://styles/mapbox/streets-v12",
  dark: "mapbox://styles/mapbox/dark-v11",
};

export const MAP_INITIAL_VIEW_STATE: MapViewState = {
  longitude: -46.5735131,
  latitude: -23.6477519,
  zoom: 16,
  bearing: 0,
  pitch: 0,
  minZoom: 16,
  maxZoom: 20,
};

/**
 * @see https://github.com/visgl/deck.gl/blob/5d9c5907c37b588fb5eb262b9622e1aa033ee8b3/modules/core/src/lib/tooltip.ts#L26
 */
export const DECK_GL_TOOLTIP_STYLE_OVERRIDE = {
  background: "transparent",
  margin: "0",
  padding: "0",
  border: "none",
  boxSizing: "border-box",
  pointerEvents: "none",
};

export const MAP_LAYERS = {
  GRAPH_NODES_LAYER_ID: "graph-nodes-layer",
  GRAPH_EDGES_LAYER_ID: "graph-edges-layer",
  USER_LOCATION_LAYER_ID: "user-location-layer",
  ROUTE_PATH_LAYER_ID: "route-path-layer",
  CAMPUS_OUTLINE_LAYER_ID: "campus-outline-layer",
  CAMPUS_SHAPE_LAYER_ID: "campus-shape-layer",
};
